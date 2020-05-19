"use strict";

import { AxonClient } from 'axoncore';

import * as modules from './modules/index';

/**
 * @author Trix
 *
 * @class Client
 * @extends DiamondCore.DiamondClient
 */

class Client extends DiamondClient {
    constructor(client, axonOptions) {
        super(client, axonOptions, modules);

        this.info = 'This starts AxonClient'; // Says what this is about
        this.version = '1.0.0'; // Bot version
    }

    onInit() {
        this.staff.contributors = [];
    }

    onStart() {
        return Promise.resolve(true);
    }

    onReady() {
        return Promise.resolve(true);
    }

    initStatus() {
        // called after ready event
        this.Client.editStatus(null, {
            name: `${this.settings.prefixes[0]}help`,
            type: 0,
        } );
    }

    // disabled
    $sendFullHelp(msg) {
        // override sendFullHelp method
        return this.axonUtils.sendMessage(msg.channel, 'Full Help');
    }

    // disabled
    $sendHelp(command) {
        // override sendHelp method
        return this.axonUtils.sendMessage(msg.channel, `Command help for ${command.label}`);
    }
}

export default Client;