const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Conjunto de canales de soporte activos
let canalesSoporte = new Set();

client.once('ready', async () => {
    console.log(`Bot conectado como ${client.user.tag}`);

    // Cargar todos los canales existentes que empiecen por "soporte"
    client.guilds.cache.forEach(guild => {
        guild.channels.cache.forEach(channel => {
            if (channel.name.startsWith("soporte")) {
                canalesSoporte.add(channel.id);
                // Mensaje automático solo si el canal no tiene mensajes previos
                if (channel.messages.cache.size === 0) {
                    channel.send('Hola! Dame un momento, enseguida estoy contigo :)')
                        .then(() => {
                            setTimeout(() => {
                                channel.send('Hola! ¿En qué te puedo ayudar?');
                            }, 2000);
                        });
                }
            }
        });
    });
});

// Detectar canales nuevos
client.on('channelCreate', channel => {
    if (channel.name.startsWith("soporte")) {
        canalesSoporte.add(channel.id);
        console.log(`Canal de soporte detectado: ${channel.name}`);

        // Mensaje automático al crear un canal
        channel.send('Hola! Dame un momento, enseguida estoy contigo :)')
            .then(() => {
                setTimeout(() => {
