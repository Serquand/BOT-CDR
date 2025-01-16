// Importation des modules nécessaires
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config(); // Pour utiliser les variables d'environnement

// Initialisation du client Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Votre token Discord et ID du client (à configurer dans un fichier .env)
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID; // ID de votre serveur (facultatif si la commande est globale)

const images = {
    11: [
        "https://media.discordapp.net/attachments/710406831046131764/1306050116645421086/FFG_-_11_1.png?ex=678a4a35&is=6788f8b5&hm=a7f522f2f4eaa76a20ccc7acce6748f718f2061ec2ccb7c65cee6b898d13d693&=&format=webp&quality=lossless&width=2182&height=1227",
        "https://media.discordapp.net/attachments/710406831046131764/1306050116943085628/FFG_-_11_2.png?ex=678a4a35&is=6788f8b5&hm=4c003e9fc32d216a224802864da6203938e2e592993cf35f215f863bc14fc8eb&=&format=webp&quality=lossless&width=2182&height=1227"
    ],
    12: [
        "https://media.discordapp.net/attachments/710406831046131764/1306050117236949073/FFG_-_12_1.png?ex=678a4a35&is=6788f8b5&hm=92a708b80a6fd3d9a19e1cf3c5c4ab378c434fff852986e14772a4d22d1f21d2&=&format=webp&quality=lossless&width=2182&height=1227",
        "https://media.discordapp.net/attachments/710406831046131764/1306050117563973642/FFG_-_12_2.png?ex=678a4a35&is=6788f8b5&hm=5a233c7a56dfde327d1f766e3321f0dc39f6d150207eb5ae14f3f9045012fdb0&=&format=webp&quality=lossless&width=2182&height=1227"
    ],
    13: [
        "https://media.discordapp.net/attachments/710406831046131764/1306050117870026894/FFG_-_13_1.png?ex=678a4a35&is=6788f8b5&hm=eb4e7a749bd6b308e592901d4c34977bd7b1057592c9010c4d29dfa39c88d823&=&format=webp&quality=lossless&width=2182&height=1227",
        "https://media.discordapp.net/attachments/710406831046131764/1306050118201643028/FFG_-_13_2.png?ex=678a4a35&is=6788f8b5&hm=cc42fae228b528f314b75d63f13804cee0b0e3d7191d0c349a0b15dd2271b1d2&=&format=webp&quality=lossless&width=2182&height=1227"
    ],
    14: [
        "https://media.discordapp.net/attachments/710406831046131764/1306050118587383918/FFG_-_14_1.png?ex=678a4a35&is=6788f8b5&hm=0f5db5d9e2037eefd5aba47d392661282ed526f93dc1703d870a9e6d93a43468&=&format=webp&quality=lossless&width=2182&height=1227",
        "https://media.discordapp.net/attachments/710406831046131764/1306050118906019880/FFG_-_14_2.png?ex=678a4a35&is=6788f8b5&hm=4a47dbf444e03058a18025cd5e96592359f6f16db8d37554e23ecc45ca398152&=&format=webp&quality=lossless&width=2182&height=1227"
    ],
    15: [
        "https://media.discordapp.net/attachments/710406831046131764/1306050119212470403/FFG_-_15_1.png?ex=678a4a35&is=6788f8b5&hm=963debb29ca5bf59ec8067645092684dcc6cbbddbad642ee38402afbcfc2c60a&=&format=webp&quality=lossless&width=2182&height=1227",
        "https://media.discordapp.net/attachments/710406831046131764/1306050119505936415/FFG_-_15_2.png?ex=678a4a35&is=6788f8b5&hm=d427977133c297c0a9d72d17b2361f079f6e153d725e0b0e6239207dc6399924&=&format=webp&quality=lossless&width=2182&height=1227"
    ],
    16: [
        "https://media.discordapp.net/attachments/710406831046131764/1306050131832864818/FFG_-_16_1.png?ex=678a4a38&is=6788f8b8&hm=55cb7331a0e9756e87d40f8d7a72e5813d5340f6424da4acaa4a487b52fe1b84&=&format=webp&quality=lossless&width=2182&height=1227",
        "https://media.discordapp.net/attachments/710406831046131764/1306050132210352219/FFG_-_16_2.png?ex=678a4a38&is=6788f8b8&hm=4bff1a6925b726ba248410dca275f66edd7e1e9f1d368920d09d50e4f7e6dbed&=&format=webp&quality=lossless&width=2182&height=1227"
    ],
    17: [
        "https://media.discordapp.net/attachments/945018424705294386/1328464278554149017/FFG_-_17_1.png?ex=678ac0c5&is=67896f45&hm=061f8cd39dbfce142d51c4f666da1289e3a71b1506f4d9a91146cd1af42ef419&=&format=webp&quality=lossless&width=2182&height=1227",
        "https://media.discordapp.net/attachments/945018424705294386/1328464279015391385/FFG_-_17_2.png?ex=678ac0c5&is=67896f45&hm=90b1d1b40d92df3404b1e8178ee236c59853c972cd87f0c9a36eb5675f8037a0&=&format=webp&quality=lossless&width=2182&height=1227"
    ]
}

// Définir la commande /ffg
const commands = [
    {
        name: 'ffg',
        description: 'Montre les régulates par niveau pour le Fight For Glory',
        options: [
            {
                name: 'th-level',
                type: 4,
                description: 'Spécifiez le niveau de TH (entre 11 et 17)',
                required: true,
                choices: [
                    { name: '11', value: 11 },
                    { name: '12', value: 12 },
                    { name: '13', value: 13 },
                    { name: '14', value: 14 },
                    { name: '15', value: 15 },
                    { name: '16', value: 16 },
                    { name: '17', value: 17 },
                ],
            },
        ],
    },
];

// Enregistrer les commandes avec l'API Discord
const rest = new REST({ version: '10' }).setToken(TOKEN);
(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log('Commandes enregistrées avec succès !');
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des commandes : ", error);
    }
})();

// Réponse à la commande /ffg
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'ffg') {
        const thLevel = options.getInteger('th-level');
        const response = images[thLevel].join(" ");
        await interaction.reply(response, { ephemeral: true });
    }
});

// Connexion du bot
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
});

client.login(TOKEN);
