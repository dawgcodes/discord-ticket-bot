import type { Bot } from './index.js';
import type { ApplicationCommandOption, PermissionResolvable } from 'discord.js';

interface CommandDescription {
    content: string;
    usage: string;
    examples: string[];
}

interface CommandOptions {
    name: string;
    nameLocalizations?: Record<string, string>;
    description?: CommandDescription;
    descriptionLocalizations?: Record<string, string>;
    aliases?: string[];
    cooldown?: number;
    permissions?: {
        dev: boolean;
        client: string[] | PermissionResolvable;
        user: string[] | PermissionResolvable;
    };
    options?: ApplicationCommandOption[];
    category?: string;
}

export default class Command {
    public client: Bot;
    public name: string;
    public nameLocalizations: Record<string, string>;
    public description: CommandDescription;
    public descriptionLocalizations: Record<string, string> | null;
    public cooldown: number;
    public permissions: {
        dev: boolean;
        client: string[] | PermissionResolvable;
        user: string[] | PermissionResolvable;
    };
    public options: ApplicationCommandOption[];
    public category: string;

    constructor(
        client: Bot,
        {
            name,
            nameLocalizations = {},
            description = {
                content: 'No description provided',
                usage: 'No usage provided',
                examples: ['No examples provided'],
            },
            descriptionLocalizations = {},
            cooldown = 3,
            permissions = {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            options = [],
            category = 'general',
        }: CommandOptions,
    ) {
        this.client = client;
        this.name = name;
        this.nameLocalizations = nameLocalizations;
        this.description = description;
        this.descriptionLocalizations = descriptionLocalizations;
        this.cooldown = cooldown;
        this.permissions = permissions;
        this.options = options;
        this.category = category;
    }

    public async run(_client: Bot, _message: any): Promise<any> {
        return await Promise.resolve();
    }
}
