const { Listener } = require('./node_modules/axoncore');

class MessageCreateMod extends Listener {
    /**
     * @param {import('./node_modules/axoncore').Module} module
     * @param {import('./node_modules/axoncore').ListenerData} data
     */
    constructor(module, data = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'messageCreate';
        /** Event name (Function name) */
        this.label = 'messageCreateMod';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    /**
     * @param {import('./node_modules/eris').Message} message
     * @param {import('./node_modules/axoncore').GuildConfig} guildConfig
     */
    execute(message, guildConfig) { // eslint-disable-line
        if (guildConfig) {
            console.log(`Prefix: ${guildConfig.prefixes}`);
        }
        return Promise.resolve();
    }
}

module.exports = MessageCreateMod;