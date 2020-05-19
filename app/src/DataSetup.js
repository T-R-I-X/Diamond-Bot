import Bot from './Bot';
import config from './configs/config.json';

// If database is enabled then try to connect
if (config.settings.db === 1) {
    try {
        const mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/DiamondDB', {
            useCreateIndex: true,
            autoReconnect: true,
        } )
            .then( () => {
                // No error, connected to database
                Bot.logger.notice('Connected to the database.');
            } )
            .catch(err => {
                // Something went wrong connecting
                Bot.logger.fatal(`Could not connect the the database ID:2  \n${err.stack}`);
            } );
    } catch (e) {
        // Something went wrong in general, might be more than connecting
        Bot.logger.fatal(`Could not connect the the database ID:3  \n${e.stack}`);
    }
}

// Starting Client
Bot.start();

// Sends a conole log showing that diamond is up and online
Bot.logger.notice('Diamond is running');