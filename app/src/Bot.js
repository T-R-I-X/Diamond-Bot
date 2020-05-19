"use strict";

import Eris from 'eris';

import { AxonOptions } from 'axoncore';
import Client from './Client';
import botConfig from './JSON/BotConfig.json';
import BotUtils from './Utils';
import Database from './DataSetup'

const axonOptions = new AxonOptions( {
    prefixes: botConfig.prefixes,
    settings: botConfig.settings,
    "english": {
        "ERR_BOT_PERM": "Please give me {{permissions}} to do this!",
        "ERR_CALLER_PERM": "You need {{permissions}} to do that!",
        "ERR_DESTINATION_PERM": "This user is a moderator/admin so I can't do that!",
        "ERR_COOLDOWN": "You are on a cooldown! Remaining: **{{cooldown}}**",
        "ERR_GENERAL": "A error has accured, if you keep having this issue contact the developer team."
    },
    logo: null,
    info: botConfig.info,
    staff: botConfig.staff,
    template: botConfig.template,
    custom: {
        param: 1,
    },
},
{
    utils: BotUtils,
    logger: null,
    DBProvider: 'Mongoose',
    DBLocation: `${__dirname}/Database/`,
    axonConfig: null,
    guildConfig: null,
} );


const client = new Eris.Client(
    botConfig["settings"]["token"],
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        disableEveryone: true,
        getAllUsers: false,
        messageLimit: 100,
        restMode: true,
        disableEvents: {
            TYPING_START: true,
        },
    },
);

const Bot = new Client(
    client,
    axonOptions,
);

export default Bot;
