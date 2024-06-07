import type { Bot } from '../structures/index.js';
import {
    ActionRowBuilder,
    ButtonBuilder,
    type ButtonInteraction,
    ButtonStyle,
    ChannelType,
    type CommandInteraction,
    EmbedBuilder,
    type GuildChannelCreateOptions,
    PermissionFlagsBits,
    type Snowflake,
    TextChannel,
} from 'discord.js';
import { promises as fs } from 'node:fs';
import YAML from 'yaml';

import { LogsManager } from './LogsManager.js';

interface Config {
    supportRoles: Snowflake[];
    ticketCategoryId: Snowflake;
    maxActiveTicketsPerUser: number;
    menuPlaceholder: string;
    enableClaimButton: boolean;
    closeTicketStaffOnly: boolean;
    enableTicketReason: boolean;
    notifyTicketCreator: boolean;
    logChannelId: Snowflake;
    enableTranscripts: boolean;
    transcriptLogsChannelId: Snowflake;
    ticketCategories: {
        [key: string]: {
            menuLabel: string;
            menuDescription: string;
            menuEmoji: string;
            embedDescription: string;
        };
    };
    embeds: {
        [key: string]: {
            color: number;
            title: string;
            description: string;
            timestamp: boolean;
            URL: string;
            image: string;
            thumbnail: string;
            footer: {
                text: string;
                iconURL: string;
            };
            author: {
                name: string;
                iconURL: string;
                url: string;
            };
        };
    };
}

export class TicketManager {
    public static async createTicket(
        interaction: CommandInteraction | ButtonInteraction,
        categoryLabel: string,
        client: Bot,
    ): Promise<TextChannel | null> {
        try {
            const config = await TicketManager.readConfigFile();
            const { supportRoles, ticketCategoryId, ticketCategories, enableClaimButton } = config;
            const userName = interaction.user.username;

            const normalizedCategoryLabel = categoryLabel.toLowerCase();
            const categoryConfig = ticketCategories[normalizedCategoryLabel];
            if (!categoryConfig) throw new Error(`Category "${categoryLabel}" not found in config.`);

            const channel = await TicketManager.createChannel(interaction, userName, categoryLabel, supportRoles, ticketCategoryId);
            const embed = TicketManager.createTicketEmbed(client, interaction, userName, categoryLabel, categoryConfig.embedDescription);
            const closeButton = TicketManager.createCloseButton();
            const claimButton = TicketManager.createClaimButton(enableClaimButton);

            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(closeButton, ...(claimButton ? [claimButton] : []));
            const messageContent = supportRoles.map((roleId) => `<@&${roleId}>`).join(', ');

            const message = await channel.send({ content: messageContent, embeds: [embed], components: [row] });
            await message.pin();
            await message.channel.bulkDelete(1);

            await LogsManager.logTicketCreation(interaction, categoryLabel, client, channel);
            await client.db.saveTicketInfo(channel.id, userName);

            return channel;
        } catch (error) {
            client.logger.error(`Failed to create ticket: ${error.message}`);
            return null;
        }
    }

    private static async createChannel(
        interaction: CommandInteraction | ButtonInteraction,
        userName: string,
        categoryLabel: string,
        supportRoles: Snowflake[],
        ticketCategoryId: Snowflake,
    ): Promise<TextChannel> {
        const channelOptions: GuildChannelCreateOptions = {
            name: `${categoryLabel}-${userName}`,
            type: ChannelType.GuildText,
            topic: `Ticket Creator: ${userName} | Ticket Type: ${categoryLabel}`,
            parent: ticketCategoryId,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory,
                        PermissionFlagsBits.AttachFiles,
                        PermissionFlagsBits.EmbedLinks,
                    ],
                },
                ...supportRoles.map((roleId) => ({
                    id: roleId,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory,
                        PermissionFlagsBits.AttachFiles,
                        PermissionFlagsBits.EmbedLinks,
                    ],
                })),
            ],
        };

        const channel = await interaction.guild.channels.create(channelOptions);

        if (!(channel instanceof TextChannel)) {
            throw new Error('Failed to create a text channel: Unexpected channel type');
        }

        return channel;
    }

    private static createCloseButton(): ButtonBuilder {
        return new ButtonBuilder().setCustomId('close-ticket').setLabel('Close').setStyle(ButtonStyle.Danger).setEmoji('🔒');
    }

    private static createClaimButton(enableClaimButton: boolean): ButtonBuilder | null {
        if (!enableClaimButton) return null;
        return new ButtonBuilder().setCustomId('claim-ticket').setLabel('Claim').setStyle(ButtonStyle.Primary).setEmoji('🎫');
    }

    private static createTicketEmbed(
        _client: Bot,
        interaction: CommandInteraction | ButtonInteraction,
        userName: string,
        categoryLabel: string,
        embedDescription: string,
    ): EmbedBuilder {
        const userAvatarURL = interaction.user.displayAvatarURL({ extension: 'png', size: 1024 });

        return new EmbedBuilder()
            .setThumbnail(userAvatarURL)
            .setTitle(categoryLabel)
            .setDescription(embedDescription)
            .setColor('#00ff00')
            .setFooter({ text: `Ticket created by ${userName}`, iconURL: userAvatarURL })
            .setTimestamp();
    }

    public static buildEmbed(embedConfig: any): EmbedBuilder {
        const embed = new EmbedBuilder();

        if (embedConfig.color) embed.setColor(embedConfig.color);
        if (embedConfig.title) embed.setTitle(embedConfig.title);
        if (embedConfig.description) embed.setDescription(embedConfig.description);
        if (embedConfig.timestamp) embed.setTimestamp();
        if (embedConfig.URL) embed.setURL(embedConfig.URL);
        if (embedConfig.image) embed.setImage(embedConfig.image);
        if (embedConfig.thumbnail) embed.setThumbnail(embedConfig.thumbnail);

        if (embedConfig?.footer?.text) {
            embed.setFooter({
                text: embedConfig.footer.text,
                iconURL: embedConfig.footer.iconURL || undefined,
            });
        }

        if (embedConfig?.author?.name) {
            embed.setAuthor({
                name: embedConfig.author.name,
                iconURL: embedConfig.author.iconURL || undefined,
                url: embedConfig.author.url || undefined,
            });
        }

        return embed;
    }

    public static async isUserSupport(interaction: any): Promise<boolean> {
        const config = await TicketManager.readConfigFile();
        const supportRoles = config.supportRoles;

        const memberRoles = interaction.member.roles.cache.map((role) => role.id);
        return memberRoles.some((role) => supportRoles.includes(role));
    }

    public static async readConfigFile(): Promise<Config> {
        try {
            const configFile = await fs.readFile('./config.yml', 'utf8');
            return YAML.parse(configFile) as Config;
        } catch (error) {
            throw new Error(`Failed to read config file: ${error.message}`);
        }
    }
}
