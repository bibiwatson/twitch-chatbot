module.exports = {
        
        obtenerCanales: function(){
            if(process.env.TWITCH_CHANNELS == undefined){
                return '';
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
            if(tags == null || tags.badges == null){
                return false;
            }

            return tags.badges.vip == '1';
        },

        esMod(tags){
            if(tags == null || tags.badges == null){
                return false;
            }

            return tags.badges.moderator == '1';
        },

        esBroadcaster(tags){
            if(tags == null || tags.badges == null){
                return false;
            }

            return tags.badges.broadcaster == '1';
        }
}