require('dotenv').config();

const tmi = require('tmi.js');
const client = require('./client').obtenerCliente();

const {onMessageHandler, onJoinHandler, onPingHandler, onRitualHandler, onNewChatterHandler} = require('./handlers');

client.connect().catch(console.error);

client.on('connected', (a,b) => {
    setInterval(() => {
        client.say(`#${process.env.TWITCH_USERNAME}`, new Date() + ' - ');
    }, 240000);

    client.say(`#${process.env.TWITCH_USERNAME}`, 'bibi_bot_ En línea');
});

client.on('message', onMessageHandler);

client.on('ping', onPingHandler);
client.on('newchatter', onNewChatterHandler);
client.on('ritual', onRitualHandler);

//setTimeout(()=>{client.on('join', onJoinHandler);}, 600000);