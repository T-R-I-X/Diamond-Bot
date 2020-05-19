module.exports = async client => {
    try {

        console.log(`
╔[════════════════════════════════════]╗
Logged in as * [${client.user.username}]
Servers! [${client.guilds.size}]
Users! [${client.users.size}]
Channels! [${client.channels.size}]
Commands! [${client.ecocommands.size + client.modcommands.size + client.levelcommands.size + client.ownercommands.size + client.roleplaycommands.size + client.utilcommands.size + client.musiccommands.size}]
╚[════════════════════════════════════]╝
`)
    
let statuses = [
	'Alpha Stage',
	'Test, Design, Improve',
	'Early Development',
	'Join our server',
  '=help'
]

let types = [
	'PLAYING',
	'WATCHING',
	'WATCHING',
	'PLAYING',
	'STREAMING',
	'LISTENING',
	'WATCHING',
]

let status = 0;

//PLAYING PLAYING LISTENING STREAMING

setInterval(
	function () {

		if (status > statuses.length - 1) {
			status = 0;
		}

		client.user.setPresence({
			status: 'dnd',

			game: {
				name: statuses[status],
				type: types[status]
			}
		}).then(
			status++
		)

	}, 6000)
      
    } catch (e) {
        console.log(`[Error] [ReadyEvent] >> ${e}`);
    }
}