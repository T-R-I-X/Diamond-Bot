const { Listener } = require('./node_modules/axoncore');

class MessageCreateLog extends Listener {
    /**
     * @param {import('./node_modules/axoncore').Module} module
     * @param {import('./node_modules/axoncore').ListenerData} data
     */
    constructor(module, data = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'messageCreate';
        /** Event name (Function name) */
        this.label = 'messageCreateLog';

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
        if (!message.channel.guild) {
            return Promise.resolve();
        }
        console.log(`Msg ${message.channel.guild.id}`);
        return Promise.resolve();
    }
}

module.exports = MessageCreateLog;