const discord = require("discord.js")
const db = require("quick.db")

module.exports = async (oldmessage,newmessage) => {    
try {
if(!oldmessage.guild.me.hasPermission('VIEW_AUDIT_LOG')) return
var log = await db.fetch(`settings${oldmessage.guild.id}.logch`)
if(!log) log = "None"
if(log == "None") return
if(newmessage.content != oldmessage.content){
const entry = await oldmessage.guild.fetchAuditLogs({type: 'MESSAGE_UPDATE'}).then(audit => audit.entries.first())
var embed = new discord.RichEmbed()
.setColor('GREEN')
.setTimestamp()
.setDescription(`:tools: Message Updated :tools:`)
.addField('➤ User',`➥ <@${oldmessage.author.id}>`,true)
.addField('➤ Before',"**"+oldmessage+"**")
.addField('➤ After',"**"+newmessage+"**");
oldmessage.guild.channels.get(log).send(embed)
}
} catch (e) {
        console.log(`[Error] [messageUpdate] >> ${e}`);
    }
}