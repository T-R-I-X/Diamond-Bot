const discord = require("discord.js")
const db = require("quick.db")

module.exports = async channel => {    
try {
if(!channel.guild.me.hasPermission('VIEW_AUDIT_LOG')) return
const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
var log = await db.fetch(`settings${channel.guild.id}.logch`)
if(!log) log = "None"
if(log == "None") return
var embed = new discord.RichEmbed()
.setColor('GREEN')
.setTimestamp()
.setDescription(`:tools: Channel Deleted :tools:`)
.addField('➤ Moderator',`➥ ${entry.executor}`,true)
.addField('➤ Channel',`➥ <@${channel.name}>`,true);
channel.guild.channels.get(log).send(embed)
} catch (e) {
        console.log(`[Error] [channelDelete] >> ${e}`);
    }
}