let timers = {}

module.exports = {
    addTimer(channel, intervalo){

        if(timers[channel] != null){
            return false;
        }

        timers[channel] = intervalo;

        return true;
    },

    deleteTimer(channel){

        clearInterval(timers[channel]);

        timers[channel] = null;
        delete timers[channel];
    },

    isTimerRunning(channel){
        return timers[channel] != null;
    }
}