const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN; // El token vendrá de las variables de entorno en Render

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignorar mensajes de otros bots

  if (message.content.toLowerCase() === 'hola') {
    message.channel.send('Hola! Dame un momento, enseguida estoy contigo :)');
    setTimeout(() => {
      message.channel.send('En qué te puedo ayudar?');
    }, 2000);
  } else if (message.content.toLowerCase().includes('ayuda')) {
    message.channel.send('Vale, mejor llamo a un admin para ayudarte. ¡Hasta otra!');
    // Aquí puedes mencionar un rol si quieres: <@&ID_DEL_ROL>
  }
});

client.login(TOKEN);
