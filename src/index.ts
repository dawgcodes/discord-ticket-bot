import { type ClientOptions, Partials, type TextChannel } from 'discord.js';

import config from './config.js';
import Bot from './structures/Client.js';

const clientOptions: ClientOptions = {
    intents: 131059,
    allowedMentions: {
        parse: ['users', 'roles', 'everyone'],
        repliedUser: false,
    },
    partials: [
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
        Partials.ThreadMember,
        Partials.Channel,
        Partials.GuildScheduledEvent,
    ],
};

const client = new Bot(clientOptions);

client.start(config.token);

function setupEventListeners(client: Bot): void {
    const sendErrorLog = async (error: Error, type: string): Promise<void> => {
        try {
            const logChannel = client.channels.cache.get(config.logsbot) as TextChannel;
            if (logChannel) {
                await logChannel.send(`**[${type}]** ${error.name}: ${error.message}\n\`\`\`${error.stack}\`\`\``);
            } else {
                client.logger.error(`Log channel not found: ${config.logsbot}`);
            }
        } catch (err) {
            client.logger.error('Failed to send log message:', err);
        }
    };

    process.on('unhandledRejection', (error: Error) => {
        client.logger.error(error);
        sendErrorLog(error, 'Unhandled Rejection');
    });

    process.on('uncaughtException', (error: Error) => {
        client.logger.error(error);
        sendErrorLog(error, 'Uncaught Exception');
    });

    process.on('warning', (warning: Error) => {
        client.logger.warn(warning);
        sendErrorLog(warning, 'Warning');
    });

    process.on('exit', () => client.logger.warn('Process exited!'));
}

setupEventListeners(client);
