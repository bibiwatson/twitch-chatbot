const client = require('./client').obtenerCliente();
const fn = require('./functions');

const strErrMsg = 'Oops! algo rarito ocurrió, estoy malito, pásenme la cobijita';

function onMessageHandler(channel, tags, message, self){
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
                    client.say(channel, `${tags.username} eres un simple mortal, ten un dorito DoritosChip`);
                    return;
                }

                if(fn.esVip(tags)){
                    client.say(channel, `${tags.username} has sido bendecid@ por los dioses`);
                    return;
                }

                if(fn.esBroadcaster(tags)){
                    client.say(channel, `MercyWing1 ${tags.username} MercyWing2 eres el diosito o la diosita del olimpo del canal, aquí se hace tu voluntad`);
                    return;
                }

                if(fn.esMod(tags)){
                    client.say(channel, `${tags.username} eres un@ modsit@ <3`);
                    return;
                }
            }
            catch(err){
                console.error(channel, tags.username, tags, message, self, err);
                client.say(channel, strErrMsg);
            }

            break;

        case '!cuenta':

            try{
                if(!fn.esBroadcaster(tags) && !fn.esMod(tags)){
                    client.say(channel, `${tags.username} no puedes usar el comando !cuenta FootYellow`);
                    return;
                }

                let inicio = 5;
                const max = 30;
                const m = originalMsg.replace(/\s+/g,' ');
                const partes = m.split(' ');

                if(partes.length > 1 && !Number.isNaN(partes[1]*1) && Number.isInteger(eval(partes[1]))){
                    inicio = eval(partes[1]);

                    if(inicio > max){
                        client.say(channel, `No se puede iniciar la cuenta en ${inicio}, se iniciará en 5`);
                    }

                    inicio = (inicio <= max)? inicio : 5;
                }

                setTimeout(() => {fn.countdown(client, channel, inicio);}, 500);
            }
            catch(err){
                console.error(channel, tags.username, tags, message, self, err);
                client.say(channel, strErrMsg);
            }
            
            break;

        case '!timer':
            try{
                if(!fn.esBroadcaster(tags) && !fn.esMod(tags)){
                    client.say(channel, `${tags.username} no puedes usar el comando !timer FootYellow`);
                    return;
                }

                const minutes = 5;

                fn.setTimer(client, channel, minutes*60);
            }
            catch(err){
                console.error(err);
                client.say(channel, strErrMsg);
            }
            break;

        case '!stoptimer':
            try{
                if(!fn.esBroadcaster(tags) && !fn.esMod(tags)){
                    client.say(channel, `${tags.username} no puedes usar el comando !timer FootYellow`);
                    return;
                }

                fn.stopTimer(client, channel);
            }
            catch(err){
                console.error(err);
                client.say(channel, strErrMsg);
            }
            break;
    }
}

function onJoinHandler(channel, nick, anonymous) {
    console.log('join', {channel, nick, anonymous});

    if(process.env.NO_SALUDAR.indexOf(nick) >= 0){
        console.log(`${nick} no quiere ser saludad@`);
        return;
    }

    setTimeout(()=>{client.say(channel, `Bienvenid@ ${nick}`);}, 3000);
}

function onRitualHandler(ritualName, channel, username, tags, msg){
    console.log({ritualName, channel, username, tags, msg});
}

function onNewChatterHandler(channel, username, tags, msg){
    console.log('NEWCHATTER', {channel, usernamem, tags, msg});
}

function onPingHandler(){
    console.log('ping...');
}

module.exports = {
    onMessageHandler,
    onJoinHandler,
    onPingHandler,
    onRitualHandler,
    onNewChatterHandler
}