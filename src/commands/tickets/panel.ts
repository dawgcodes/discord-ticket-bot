import { ActionRowBuilder, type EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';

import { type Bot, Command, type Context } from '../../structures/index.js';
import { TicketManager } from '../../utils/TicketManager.js';

export default class PanelCommand extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'panel',
            nameLocalizations: {
                fr: 'pannel',
            },
            description: {
                content: 'Send the ticket panel in the channel.',
                usage: 'panel',
                examples: ['panel'],
            },
            descriptionLocalizations: {
                fr: 'Envoyez le panneau de ticket dans la chaîne.',
            },
            category: 'ticket',
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: ['ManageGuild'],
            },
            cooldown: 3,
            options: [],
        });
    }

    async run(client: Bot, ctx: Context): Promise<void> {
        await ctx.sendDeferMessage({});
        const config = await TicketManager.readConfigFile();

        const panelEmbedConfig = config.embeds.panelEmbed;
        const panelEmbed = this.createPanelEmbed(client, panelEmbedConfig);

        const selectMenu = this.createSelectMenu(config.ticketCategories, config.menuPlaceholder);

        const actionRowsMenus = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

        try {
            await ctx.editMessage({ content: 'Sending the panel in this channel...' });
            await ctx.channel.send({ embeds: [panelEmbed], components: [actionRowsMenus] });
            await this.saveTicketData(ctx.guild.id, selectMenu.options);
            await ctx.editMessage({ content: 'Panel sent successfully.' });
        } catch (error) {
            this.client.logger.error('Error sending the panel or saving ticket data:', error);
            await ctx.editMessage({
                content: 'There was an error sending the panel. Please contact the administrator.',
            });
        }
    }

    createPanelEmbed(_client: Bot, panelEmbedConfig: any): EmbedBuilder {
        const embed = TicketManager.buildEmbed(panelEmbedConfig);

        return embed;
    }

    createSelectMenu(ticketCategories: any, placeholder: string): StringSelectMenuBuilder {
        const options = Object.keys(ticketCategories).map((customId) => {
            const category = ticketCategories[customId];
            const option = new StringSelectMenuOptionBuilder()
                .setLabel(category.menuLabel)
                .setDescription(category.menuDescription)
                .setValue(customId);

            if (category.menuEmoji !== '') {
                option.setEmoji(category.menuEmoji);
            }

            return option;
        });

        return new StringSelectMenuBuilder()
            .setCustomId('categoryMenu')
            .setPlaceholder(placeholder)
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(options);
    }

    async saveTicketData(guildId: string, options: any): Promise<void> {
        try {
            await this.client.db.saveTicketData(guildId, options);
        } catch (error) {
            this.client.logger.error('Error saving ticket data:', error);
        }
    }
}
