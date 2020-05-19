const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
  var pre = await client.db.fetch(`settings${message.guild.id}.prefix`)
  if(args[0]) {
  var command = args[0].toLowerCase();
  var catagory;
  var ting = null

  if (client.ecocommands.has(command)) ting = args[0]
  else if (client.levelcommands.has(command)) ting = args[0]
  else if (client.modcommands.has(command)) ting = args[0]
  else if (client.roleplaycommands.has(command)) ting = args[0]
  else if (client.utilcommands.has(command)) ting = args[0]
  else if (client.musiccommands.has(command)) ting = args[0]
  else if (ting == null) {
  if(command !== "economy") catagory = null
  else if(command !== "leveling") catagory = null
  else if(command !== "moderation") catagory = null
  else if(command !== "roleplay") catagory = null  
  else if(command !== "utils") catagory = null
  else if(command !== "music") catagory = null
  if(command == "economy") catagory = client.ecocommands
  if(command == "leveling") catagory = client.levelcommands
  if(command == "moderation") catagory = client.modcommands
  if(command == "roleplay") catagory = client.roleplaycommands
  if(command == "utils") catagory = client.utilcommands
  if(command == "music") catagory = client.musiccommands
  if (catagory == null)  return message.reply(" ⛔ Command or catagory does not exist!")  
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`${command} Commands\n\n**${catagory.map(command => `${pre}`+command.help.name).join('\n')}**`)
  .setTimestamp();
  message.channel.send(embed)
  return
  }
  var eco = await client.ecocommands.get(command)
  var level = await client.levelcommands.get(command)
  var mod = await client.modcommands.get(command)
  var rolep = await client.roleplaycommands.get(command)
  var util = await client.utilcommands.get(command)
  var music = await client.musiccommands.get(command)
  if(eco) command = eco
  if(level) command = level
  if(mod) command = mod
  if(rolep) command = rolep
  if(util) command = util
  if(music) command = music
  if(!command) return console.log("Debug error")
  
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`**Command:** ${command.help.name}\n
  **Description:** ${command.help.description || "No Description"}\n
  **Usage:** ${pre}${command.help.usage || "No Usage"}\n
  **Accessable by:** ${command.help.accessableby || "Members"}\n
  **Aliases:** ${command.help.aliases || "None"}\n
  **Category:** ${command.help.catagory || "None"}`)
  .setTimestamp();
  message.channel.send(embed)
  } else {
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setThumbnail(client.user.displayAvatarURL)
  .setDescription(`Pick a category \`${pre}help [catagory] / [command]\`\n\n** :large_blue_diamond: Economy\n\n :level_slider: Leveling\n\n :tools: Moderation\n\n :man: Roleplay\n\n :wrench: Utils\n\n :musical_note: Music**`)
  .setTimestamp()
  message.channel.send(embed)  
  }
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/help.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "help",
  description: "Helps you find all the juicy commands.",
  aliases: ["commands"],
  usage: "help [category] / [command]",
  accessableby: "Members",
  catagory: "utils"
}