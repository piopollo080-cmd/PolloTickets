const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Lista de canales activos de soporte
let canalesSoporte = new Set();

client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

// Detectar cuando se crea un canal de soporte
client.on('channelCreate', channel => {
    if (channel.name.startsWith("soporte")) {  // ejemplo: soporte-usuario123
        canalesSoporte.add(channel.id);
        console.log(`Canal de soporte detectado: ${channel.name}`);
    }
});

// Responder solo en canales de soporte
client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (!canalesSoporte.has(message.channel.id)) return; // Solo soporte

    if (message.content.toLowerCase() === 'hola') {
        message.channel.send('Dame un momento, enseguida estoy contigo :)');
        setTimeout(() => {
            message.channel.send('Hola! ¿En qué te puedo ayudar?');
        }, 2000);
    }

    if (message.content.toLowerCase().includes('ayuda')) {
        message.channel.send('Ok, mejor llamo a un admin para ayudarte, ¡hasta otra!');
    }
});

// Quitar de la lista cuando se elimina el canal
client.on('channelDelete', channel => {
    if (canalesSoporte.has(channel.id)) {
        canalesSoporte.delete(channel.id);
        console.log(`Canal de soporte eliminado: ${channel.name}`);
    }
});

client.login(process.env.TOKEN);


