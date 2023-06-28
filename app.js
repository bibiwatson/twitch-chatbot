require('dotenv').config();

const tmi = require('tmi.js');

const fn = require('./functions');
const strErrMsg = 'Oops! algo rarito ocurrió, estoy malito, pásenme la cobijita';

const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },

    identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        password: `oauth:${process.env.TWITCH_OAUTH}`
    },

    channels: fn.obtenerCanales()
});

client.connect().catch(console.error);

// When the bot is on, it shall fetch the messages send by user from the specified channel
client.on('message', (channel, tags, message, self) => {
    //console.log(channel, tags, message, self);

    // Lack of this statement or it's inverse (!self) will make it in active
    if (self) return;
    
    let msg = message.toLowerCase();
    const originalMsg = msg;

    if(msg.indexOf('!cuenta') == 0){
        msg = '!cuenta';
    }

    switch (msg) {
        // Use 'tags' to obtain the username of the one who has keyed in a certain input
        // 'channel' shall be used to specify the channel name in which the message is going to be displayed
        // For one to send a message in a channel, you specify the channel name, then the message
        // We shall use backticks when using tags to support template interpolation in JavaScript

        // In case the message in lowercase is equal to the string 'hi', send the sender of that message 'Username, hola'
        case 'holiwis':
            client.say(channel, `${tags.username}, hola!`).catch(err => console.error({err}));
            break;

        case '!minivel':

            try{
                if(tags.badges == null){
                    client.say(channel, `${tags.username} eres un simple mortal`);
                    return;
                }

                if(!fn.esBroadcaster(tags) && !fn.esMod(tags) && !fn.esVip(tags)){
                    client.say(channel, `${tags.username} eres un simple mortal`);
                    return;
                }

                if(fn.esVip(tags)){
                    client.say(channel, `${tags.username} has sido bendecid@ por los dioses`);
                    return;
                }

                if(fn.esBroadcaster(tags)){
                    client.say(channel, `${tags.username} eres el diosito o la diosita del olimpo del canal, aquí se hace su voluntad`);
                    return;
                }

                if(fn.esMod(tags)){
                    client.say(channel, `${tags.username} eres un@ modsit@ <3`);
                    return;
                }
            }
            catch(err){
                console.error(channel, tags.username, tags, message, self, err);
                client.say(strErrMsg);
            }

            break;

        case '!cuenta':

            try{
                if(!fn.esBroadcaster(tags) && !fn.esMod(tags)){
                    client.say(channel, `${tags.username} no puedes usar el comando !cuenta`);
                    return;
                }

                let inicio = 5;
                const m = originalMsg.replace(/\s+/g,' ');
                const partes = m.split(' ');

                if(partes.length > 1 && !Number.isNaN(partes[1]*1) && Number.isInteger(eval(partes[1]))){
                    inicio = eval(partes[1]);
                    inicio = (inicio <= 30)? inicio : 5;
                }

                setTimeout(() => {fn.countdown(client, channel, inicio);}, 500);
            }
            catch(err){
                console.error(channel, tags.username, tags, message, self, err);
                client.say(strErrMsg);
            }
            
            break;
    }
});