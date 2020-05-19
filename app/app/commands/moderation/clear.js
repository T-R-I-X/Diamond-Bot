const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(" ⛔ Missing **MANAGE_MESSAGES** permission !")
  if(!args[0]) return message.reply(" ⛔ No number of messages given !")
  if(isNaN(args[0])) return message.reply(" ⛔ Only numbers !")
  if(args[0] < 1) return message.reply(" ⛔ Only numbers 1-100")
  if(args[0] > 100) return message.reply(" ⛔ Only numbers 1-100")
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .addField(`➤ Moderator`,`➥ <@${message.author.id}>`,true)
  .addField(`➤ Cleared`,`➥ **${args[0]}**`,true)
  .setDescription(`:tools: Cleared Messages :tools:`) 
  .setTimestamp();
  let embed2 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Cleared **${args[0]}** messages`)
  .setTimestamp();
  message.channel.bulkDelete(args[0])
  var log = await client.db.fetch(`settings${message.guild.id}.logch`)
  if(!log) log = "None"
  if(log == "None") return message.channel.send(embed2); 
  message.channel.send(embed2)
  message.guild.channels.get(log).send(embed)
  
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/clear.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "clear",
  description: "Clears a number of messages.",
  aliases: ["prune","removemessages","deletemessages"],
  usage: "clear [number]",
  accessableby:"Moderator",
  catagory:"moderation"
}