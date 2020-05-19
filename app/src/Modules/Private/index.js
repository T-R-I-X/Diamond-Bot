// Imports
import { Module, CommandPermissions } from 'axoncore';

import * as commands from './commands/index';
// import * as events from './commands/index';
//

class Private extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Private';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'Private',
            description: 'This is private and not to be showed',
        };

        this.permissions = new CommandPermissions(this, {}, true);
    }

    init() {
        return { commands };
    }
}

export default Private;