const { Command, CommandOptions, CommandResponse } = require('./node_modules/axoncore');

const Pong = require('./Ping_Pong');

class Ping extends Command {
    /**
     * @param {import('./node_modules/axoncore').Module} module
     */
    constructor(module) {
        super(module);

        this.label = 'ping';
        this.aliases = [
            'ping',
            'pang',
            'pung',
        ];

        this.hasSubcmd = true;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ping',
            description: 'Ping the bot.',
            usage: 'ping',
            examples: ['ping'],
        };

        /**
         * @type {CommandOptions}
         */
        this.options = new CommandOptions(this, {
            argsMin: 0,
            guildOnly: false,
        } );
    }
    
    init() {
        return [Pong];
    }

    /**
     * @param {import('./node_modules/axoncore').CommandEnvironment} env
     */
    async execute( { msg } ) {
        const start = Date.now();
        const mess = await this.sendMessage(msg.channel, 'Pong! ');
        if (!mess) {
            return new CommandResponse( { success: false } );
        }

        const diff = (Date.now() - start);
        this.editMessage(mess, `Pong! \`${diff}ms\``);

        return new CommandResponse( { success: true } );
    }
}

module.exports = Ping;