import { type Bot, Command, type Context } from '../../structures/index.js';

export default class Help extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'help',
            nameLocalizations: {
                fr: 'aide',
            },
            description: {
                content: 'Lists all available commands',
                usage: 'help',
                examples: ['help'],
            },
            descriptionLocalizations: {
                fr: 'Liste toutes les commandes disponibles',
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
        const categories = new Map<string, { name: string; description: string }[]>();

        client.commands.forEach((cmd) => {
            if (!categories.has(cmd.category)) {
                categories.set(cmd.category, []);
            }
            categories.get(cmd.category)?.push({
                name: cmd.name,
                description: cmd.description.content,
            });
        });

        let commandList = '';
        categories.forEach((commands, category) => {
            commandList += `\n**${category.charAt(0).toUpperCase() + category.slice(1)}**\n`;
            commandList += commands.map((cmd) => `\`${cmd.name}\`: ${cmd.description}`).join('\n');
            commandList += '\n';
        });

        const embed = client
            .embed()
            .setColor(this.client.color)
            .setAuthor({ name: this.client.user.username })
            .setTitle('Help - List of Commands')
            .setDescription(commandList)
            .setTimestamp();

        await ctx.sendMessage({ embeds: [embed] });
    }
}
