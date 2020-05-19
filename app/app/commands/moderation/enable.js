const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(" ⛔ Missing **MANAGE_GUILD** permission !")
  if(!args[0]) return message.reply(" ⛔ No command given !")
  var command = args[0].toLowerCase()
  var ting = null
  var cat = false
  if (client.ecocommands.has(command)) ting = args[0]
  else if (client.levelcommands.has(command)) ting = args[0]
  else if (client.modcommands.has(command)) ting = args[0]
  else if (client.roleplaycommands.has(command)) ting = args[0]
  else if (client.utilcommands.has(command)) ting = args[0]
  else if (client.musiccommands.has(command)) ting = args[0]
  else if (command == "economy") ting = args[0], cat = true
  else if (command == "moderation") ting = args[0], cat = true
  else if (command == "music") ting = args[0], cat = true
  else if (command == "roleplay") ting = args[0], cat = true
  else if (command == "utils") ting = args[0], cat = true
  else if (command == "leveling") ting = args[0], cat = true
  if(ting == null) return message.reply(" ⛔ Command / catagory doesn't exist !")
  var fetch = await client.db.fetch(`info${message.guild.id}-${command}`)
  if(fetch == "true") return message.reply(" ⛔ Command / catagory already enabled !")
  var set = await client.db.set(`info${message.guild.id}-${command}`,"true")
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:tools: Enabled Command :tools:`)
  .addField(`➤ Moderator`,`➥ <@${message.author.id}>`,true)
  .addField(`➤ Category`,`➥ **${args[0]}**`,true)
  .setFooter(`**You can always disable it with =disable [command]**`)
  .setTimestamp();
  let embed1 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:tools: Enabled Category :tools:`)
  .addField(`➤ Moderator`,`➥ <@${message.author.id}>`,true)
  .addField(`➤ Category`,`➥ **${args[0]}**`,true)
  .setFooter(`**You can always disable it with =disable [category]**`)
  .setTimestamp();
  let embed2 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Enabled Command **${args[0]}**`)
  .setFooter(`**You can always enable it with =disable [command]**`)
  .setTimestamp();
  let embed3 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Enabled Category **${args[0]}**`)
  .setFooter(`**You can always enable it with =disable [category]**`)
  .setTimestamp();
  var log = await client.db.fetch(`settings${message.guild.id}.logch`)
  if(!log) log = "None"
  if(log == "None") return
  if(cat == false) return message.channel.send(embed2), message.guild.channels.get(log).send(embed);
  if(cat == true) return message.channel.send(embed3), message.guild.channels.get(log).send(embed1); 
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/enable.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "enable",
  description: "Enables a command in your server.",
  aliases: ["enablecommand"],
  usage: "enable [command]",
  accessableby:"Moderator",
  catagory:"moderation"
}