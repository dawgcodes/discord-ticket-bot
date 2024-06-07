import { type Bot, Command, type Context } from '../../structures/index.js';

export default class Ping extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'ping',
            nameLocalizations: {
                fr: 'ping',
            },
            description: {
                content: 'Get the bot latency',
                usage: 'ping',
                examples: ['ping'],
            },
            descriptionLocalizations: {
                fr: 'Obtiens la latence du bot.',
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
        const embed = client
            .embed()
            .setColor(this.client.color)
            .setDescription(`**Pong:** \`${Math.round(client.ws.ping)}ms\``);

        await ctx.sendMessage({ embeds: [embed] });
    }
}
