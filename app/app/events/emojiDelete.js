const discord = require("discord.js")
const db = require("quick.db")

module.exports = async emoji => {    
try {
if(!emoji.guild.me.hasPermission('VIEW_AUDIT_LOG')) return
const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first())
var emojis = await emoji.guild.emojis.get(emoji.id)
var log = await db.fetch(`settings${emoji.guild.id}.logch`)
if(!log) log = "None"
if(log == "None") return
var embed = new discord.RichEmbed()
.setColor('GREEN')
.setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.png?v=1`)
.setTimestamp()
.setDescription(`:tools: Emoji Deleted :tools:`)
.addField('➤ Moderator',`➥ ${entry.executor}`,true)
.addField('➤ Emoji',`➥ **${emoji.name}**`,true);
emoji.guild.channels.get(log).send(embed)
} catch (e) {
        console.log(`[Error] [emojiDelete] >> ${e}`);
    }
}