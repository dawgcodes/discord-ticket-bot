<center><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=AikouTicket&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient" /></center>

[![Version][version-shield]](version-url)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Support Server][support-shield]][support-server]
[![MIT License][license-shield]][license-url]
[![Run on Repl.it](https://repl.it/badge/github/LucasB25/AikouTicket)](https://repl.it/github/LucasB25/AikouTicket)
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/LucasB25/AikouTicket)

<!-- PROJECT LOGO -->
<br />

  <h1 align="center">AikouTicket</h1>

  <p align="center">AikouTicket and TypeScript.
    <br />
    <br />
        <a href="https://discord.gg/AhUJa2kdAr">Serveur Support</a>
    ·
    <a href="https://github.com/LucasB25/AikouTicket/issues">Report Bug & Request Feature</a>
  </p>
</p>

# AikouTicket

AikouTicket is a Discord bot specialized in managing support tickets. It allows users to create, manage, and track tickets directly from their Discord server, thus facilitating support and organization of user requests.

## 🔧 Requirements

-   Create Discord Bot and get token and client id from [Discord Developer Portal](https://discord.com/developers/applications)

-   Download [Node.js](https://nodejs.org/en/download/)

## 🚀 Installation from source

1. Clone the AikouTicket repository:

```bash
git clone https://github.com/LucasB25/AikouTicket.git
```

2. change the directory to AikouTicket

```bash
cd AikouTicket
```

3. Install the required packages:

```bash
npm i
or
yarn i
```

4. Set up your environment variables:

Create a `.env` file in the root directory of your project with the following variables:
or you can use the [.env.example](https://raw.githubusercontent.com/LucasB25/AikouTicket/main/.env.example) file

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

Your contribution will be reviewed by the project maintainers, and any necessary feedback or changes will be discussed with you. We appreciate your help in making AikouTicket better!

## 👥 Contributors

Thanks goes to these wonderful people :

<a href="https://github.com/LucasB25/AikouTicket/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LucasB25/AikouTicket" alt="contributors" width="500" />
</a>

[version-shield]: https://img.shields.io/github/package-json/v/LucasB25/AikouTicket?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/LucasB25/AikouTicket.svg?style=for-the-badge
[contributors-url]: https://github.com/LucasB25/AikouTicket/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/LucasB25/AikouTicket.svg?style=for-the-badge
[forks-url]: https://github.com/LucasB25/AikouTicket/network/members
[stars-shield]: https://img.shields.io/github/stars/LucasB25/AikouTicket.svg?style=for-the-badge
[stars-url]: https://github.com/LucasB25/AikouTicket/stargazers
[issues-shield]: https://img.shields.io/github/issues/LucasB25/AikouTicket.svg?style=for-the-badge
[issues-url]: https://github.com/LucasB25/AikouTicket/issues
[license-shield]: https://img.shields.io/github/license/LucasB25/AikouTicket.svg?style=for-the-badge
[license-url]: https://github.com/LucasB25/AikouTicket/blob/mains/LICENSE
[support-server]: https://discord.gg/AhUJa2kdAr
[support-shield]: https://img.shields.io/discord/942117923001098260.svg?style=for-the-badge&logo=discord&colorB=7289DA
