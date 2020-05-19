"use strict";

import Bot from './Bot';
import BotConfig from './configs/customConfig.json';

// If database is enabled then try to connect
if (BotConfig.db === 1) {
    try {
        const mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/DiamondDB', {
            useCreateIndex: true,
            autoReconnect: true,
        } )
            .then( () => {
                // No error, connected to database
                Client.logger.notice('Connected to the database.');
            } )
            .catch(err => {
                // Something went wrong connecting
                Client.logger.fatal(`Could not connect the the database ID:2  \n${err.stack}`);
            } );
    } catch (e) {
        // Something went wrong in general, might be more than connecting
        Client.logger.fatal(`Could not connect the the database ID:3  \n${e.stack}`);
    }
}

if (BotConfig.Music == 1) {
    try {
        
    } catch (e) {
        // Something went wrong with music
        Client.logger.fatal(`Could not start music  \n${e.stack}`)
    }
}

// Starting Client
Client.start();

// Sends a conole log showing that diamond is up and online
Client.logger.notice('Diamond is running');

export default mongoose