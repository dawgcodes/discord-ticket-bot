import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

import { type Bot, Command, type Context } from '../../structures/index.js';

export default class About extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'about',
            nameLocalizations: {
                fr: 'à-propos',
            },
            description: {
                content: 'Shows information about the bot',
                usage: 'about',
                examples: ['about'],
            },
            descriptionLocalizations: {
                fr: 'Affiche des informations sur le bot',
            },
            category: 'general',
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            cooldown: 3,
            options: [],
        });
    }

    async run(client: Bot, ctx: Context): Promise<void> {
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel(`Invite ${this.client.user.username}`)
                .setURL(
                    `https://discord.com/oauth2/authorize?client_id=${this.client.user?.id}&scope=bot%20applications.commands&permissions=8`,
                )
                .setStyle(ButtonStyle.Link),
            new ButtonBuilder().setLabel('Support Server').setURL('https://reedroux.biz/support').setStyle(ButtonStyle.Link),
        );

        const embed = client.embed().setColor(this.client.color).setAuthor({ name: 'Ticket Bot' }).addFields(
            { name: 'Creator', value: '[Twodawg](https://github.com/TwoDawg)', inline: true },
            {
                name: 'Repository',
                value: '[Here](https://github.com/TwoDawg/Tickets)',
                inline: true,
            },
            { name: 'Support', value: '[Here](https://reedroux.biz/support)', inline: true },
        );

        await ctx.sendMessage({ embeds: [embed], components: [row] });
    }
}
