const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return; // Ignorar mensajes de otros bots

    // Responder a cualquier mensaje con el saludo
    message.channel.send('Hola! Dame un momento, enseguida estoy contigo :)');

    // Esperar un tiempo y luego responder con la segunda parte
    setTimeout(() => {
        message.channel.send('Ya estoy aquí! ¿En qué te puedo ayudar?');
    }, 60000); // 60000 ms = 1 minuto
});

client.login(process.env.TOKEN);

