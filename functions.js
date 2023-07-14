const timers = require('./timers')
module.exports = {
        
    obtenerCanales: function(){
        if(process.env.TWITCH_CHANNELS == undefined){
            return [];
        }

        const lista = process.env.TWITCH_CHANNELS;

        let arr_canales = []

        process.env.TWITCH_CHANNELS.split(',').forEach(item => {
            arr_canales.push(`${item}`);
        });

        return arr_canales;
    },

    countdown: function(client, channel, timeLeft) {
        client.say(channel, `${timeLeft}`);
        
        timeLeft--;

        if (timeLeft > 0) {
            setTimeout(()=> {this.countdown(client, channel, timeLeft)}, 1000);
            return;
        }

        setTimeout(()=> {client.say(channel, 'Go Go Go!')}, 1000);
    },

    esVip(tags){
        try{
            if(tags == null || tags.badges == null){
                return false;
            }

            return tags.badges.vip == '1';
        }
        catch(err){
            console.log('esVip', err);
            return false;
        }
    },

    esMod(tags){
        try{
            if(tags == null || tags.badges == null){
                return false;
            }

            return tags.badges.moderator == '1';
        }
        catch(err){
            console.log('esMod', err);
            return false;
        }
    },

    esBroadcaster(tags){
        try{
            if(tags == null || tags.badges == null){
                return false;
            }

            return tags.badges.broadcaster == '1';
        }
        catch(err){
            console.log('esBroadcaster', err);
            return false;
        }
    },

    setTimer(client, channel, duration){
        try{
    
            if(timers.isTimerRunning(channel)){
                client.say(channel, 'Ya existe un timer corriendo');
                return;
            }
    
            const msg = 'ImTyping ';
            client.say(channel, `${msg} 0${duration/60} : 00`);
    
            const inter = 20;
            const interMilis = inter * 1000;
    
            console.log(timers, timers.isTimerRunning(channel));
    
            const myInterval = setInterval(function(){
                duration-=inter;
                const minutes   = parseInt(duration/60);
                let seg         = parseInt(duration%60);
    
                seg = seg < 10 ? `0${seg}` : seg;
    
                console.log(new Date(), `${msg} ${minutes < 10? '0'+minutes : minutes} : ${seg}`);
                client.say(channel, `${msg} ${minutes < 10? '0'+minutes : minutes} : ${seg}`);
                if(duration <= 0){
                    timers.deleteTimer(channel);
                    clearInterval(myInterval);
                    client.say(channel, 'Time! GlitchCat')
                }
            }, interMilis);
    
            timers.addTimer(channel, myInterval);
        }
        catch(err){
            console.error(err);
            client.say(channel, 'Error al iniciar el timer WutFace');
        }
    },
    
    stopTimer(client, channel){
        try{
            if(!timers.isTimerRunning(channel)){
                client.say(channel, 'No se encuentra ningún timer');
                return;
            }
    
            client.say(channel, 'El timer se ha detenido');
            timers.deleteTimer(channel);
        }
        catch(err){
            console.error(err);
            client.say(channel, 'Error al detener el timer WutFace');
        }
    }
}