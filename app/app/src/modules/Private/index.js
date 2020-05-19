const { Module, CommandPermissions } = require('./node_modules/axoncore');

const commands = require('./commands/index');
// const listeners = require('./commands/index');

class Private extends Module {
    /**
     * @param {import('./node_modules/axoncore').AxonClient} client
     * @param {import('./node_modules/axoncore').ModuleData} data
     */
    constructor(client, data = {} ) {
        super(client, data);

        this.label = 'Private';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'Private',
            description: 'Very Private. Much Dev. Wow.',
        };

        /**
         * @type {CommandPermissions}
         */
        this.permissions = new CommandPermissions(this, {}, true);
    }

    init() {
        return { commands };
    }
}

module.exports = Private;