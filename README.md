<!-- PROJECT LOGO -->
<br />

  <h1 align="center">discord-ticket-bot</h1>

  <p align="center">discord-ticket-bot and TypeScript.
    <br />
    <br />
        <a href="https://discord.gg/AhUJa2kdAr">Serveur Support</a>
    ·
    <a href="https://github.com/dawgcodes/discord-ticket-bot/issues">Report Bug & Request Feature</a>
  </p>
</p>

# discord-ticket-bot

discord-ticket-bot is a Discord bot specialized in managing support tickets. It allows users to create, manage, and track tickets directly from their Discord server, thus facilitating support and organization of user requests.

## 🔧 Requirements

-   Create Discord Bot and get token and client id from [Discord Developer Portal](https://discord.com/developers/applications)

-   Download [Node.js](https://nodejs.org/en/download/)

## 🚀 Installation from source

1. Clone the AikouTicket repository:

```bash
git clone https://github.com/dawgcodes/discord-ticket-bot.git
```

2. change the directory to AikouTicket

```bash
cd discord-ticket-bot
```

3. Install the required packages:

```bash
npm i
or
yarn i
```

4. Set up your environment variables:

Create a `.env` file in the root directory of your project with the following variables:
or you can use the [.env.example](https://raw.githubusercontent.com/dawgcodes/discord-ticket-bot/main/.env.example) file

```bash
TOKEN= #Discord Bot Token
CLIENT_ID= #Discord Bot Client ID
ACTIVITY=/help
LOGSBOT= #ID of the channel where bot logs will be sent
DATABASE_URL = "" # Your database url (If you want to use sqlite, then you can leave it blank.).
```

5. Set up your environment variables:

Open `config.yml` to configure the settings and messages to your liking, make sure to properly configure the ticket categories

6. generate the prisma client

```bash
npm run prisma:push
```

Run the migrations (Only if you want to migrate your database)

```bash
npm run prisma:migrate
```

8. Run the bot:

```bash
npm start
```

## 📜 Contributing

Thank you for your interest in contributing to AikouTicket! Here are some guidelines to follow when contributing:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Write clean and concise code that follows the established coding style.
3. Create detailed and thorough documentation for any new features or changes.
4. Write and run tests for your code.
5. Submit a pull request with your changes.
