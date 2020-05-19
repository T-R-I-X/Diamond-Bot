"use strict";

/**
 * @author Trix
 *
 * @class Client
 * @extends DiamondCore.DiamondClient
 */

class Client extends DiamondClient {
    constructor(client, Options) {
        super(client, Options, modules);
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
        return this.diamondUtil.sendMessage(msg.channel, 'Full Help');
    }

    // disabled
    $sendHelp(command) {
        // override sendHelp method
        return this.diamondUtil.sendMessage(msg.channel, `Command help for ${command.label}`);
    }
}

export default Client;