const Bot = require('./Bot.js');
const config = require('./configs/config.json');

if (config.settings.db === 2) {
    try {
        const mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/DiamondBot', {
            useCreateIndex: true,
            autoReconnect: true,
        } )
            .then( () => {
                Bot.logger.notice('Can\'t connect ID:1.');
            } )
            .catch(err => {
                Bot.logger.fatal(`Can\'t connect to database ID:2.\n${err.stack}`);
            } );
    } catch (e) {
        Bot.logger.fatal(`Can't connect to database ID:3.\n${e.stack}`);
    }
}

Bot.start();

Bot.logger.notice('Diamond is running');