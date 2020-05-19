const discord = require("discord.js")
const db = require("quick.db")
var index = require("../index.js")

module.exports = async guild => {    
try {
var client = index.client
var embed = new discord.RichEmbed()
.setColor('GREEN')
.setDescription(`Joined a new guild !\n\n Guild\n ${guild}\n\n Owner\n ${guild.owner}\n\n Member count\n ${guild.members.size}`)
client.guilds.get("612023254055649280").channels.get("612484092231155713").send(embed)
} catch (e) {
        console.log(`[Error] [guildcreate] >> ${e}`);
    }
}