const fn = require('./functions');
const tmi = require('tmi.js');

const client = new tmi.Client({
    options: {
        debug: true,
        messagesLogLevel: "info" },
    
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

function obtenerCliente(){
    return client;
}

module.exports = {
    obtenerCliente
}