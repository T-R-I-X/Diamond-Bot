const discord = require("discord.js")
const db = require("quick.db")

module.exports = async message => {    
try {
if(!message.guild.me.hasPermission('VIEW_AUDIT_LOG')) return
var log = await db.fetch(`settings${message.guild.id}.logch`)
if(!log) log = "None"
if(log == "None") return
const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
var embed = new discord.RichEmbed()
.setColor('GREEN')
.setTimestamp()
.setDescription(`:tools: Message Deleted :tools:`)
.addField('➤ Moderator',`➥ ${entry.executor}`,true)
.addField('➤ Message Content',"```"+message+"```");
message.guild.channels.get(log).send(embed)
} catch (e) {
        console.log(`[Error] [messageDelete] >> ${e}`);
    }
}