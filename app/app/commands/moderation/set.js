const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
  var pre = await client.db.fetch(`settings${message.guild.id}.prefix`)
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply(" ⛔ Missing **MANAGE_SERVER** permission !")
  if(!args[0]) {
  let embed = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`Settable settings\n\n${pre}set prefix \`[prefix]\`\n\n${pre}set joinchannel \`[channel]\`\n\n${pre}set logchannel \`[channel]\`\n\n${pre}set autorole \`[role]\``)
  .setTimestamp();
  message.channel.send(embed); 
  return
  }
  if(args[0].toLowerCase() == "prefix") {
  let newpre = args[1]  
  if(!newpre) return message.reply(" ⛔ New prefix wasn't given !")
  var ting = await client.db.set(`settings${message.guild.id}.prefix`,newpre)
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:tools: Set Prefix :tools:\n\n➤ Moderator\n\n➥ <@${message.author.id}>\n\n ➤ New prefix\n\n➥ **${newpre}**`)
  .setTimestamp();
  let embed2 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Set prefix **${newpre}**`)
  .setTimestamp();
  var log = await client.db.fetch(`settings${message.guild.id}.logch`)
  if(!log) log = "None"
  if(log == "None") return message.channel.send(embed2); 
  message.channel.send(embed2)
  } else if (args[0].toLowerCase() == "joinchannel") {
  let newch = message.mentions.channels.first() || args[1]
  let ch;
  var fetch = await client.db.fetch(`settings${message.guild.id}.joinch`)
  var rembed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setTimestamp()
  .setDescription(`Join channel currently is set to <#${fetch}>`);
  if(!args[1]) return message.channel.send(rembed)
  if(!newch) return message.reply(" ⛔ Channel wasn't given !")
  if(!message.mentions.channels.first()) ch = await message.guild.channels.get(newch) || await message.guild.channels.find(channel => channel.name == newch)
  if(message.mentions.channels.first()) ch = await message.mentions.channels.first()
  if(!ch) return message.reply(" ⛔ Cannot find channel !")
  if(fetch == ch.id) return message.reply(" ⛔ Join channel already set to <#" +ch.id+"> !")
  var ting = await client.db.set(`settings${message.guild.id}.joinch`,ch.id)
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:tools: Set Join Channel :tools:\n\n➤ Moderator <@${message.author.id}>\n\n ➤ New channel **<#${ch.id}>**`)
  .setTimestamp();
  let embed2 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Set join channel <#${ch.id}>`)
  .setTimestamp();
  var log = await client.db.fetch(`settings${message.guild.id}.logch`)
  if(!log) log = "None"
  if(log == "None") return message.channel.send(embed2); 
  message.channel.send(embed2)
  message.guild.channels.get(log).send(embed)
  } else if (args[0].toLowerCase() == "logchannel") {
  let newch = message.mentions.channels.first() || args[1]
  let ch;
  var fetch = await client.db.fetch(`settings${message.guild.id}.logch`)
  var rembed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setTimestamp()
  .setDescription(`Log channel currently is set to <#${fetch}>`);
  if(!args[1]) return message.channel.send(rembed)
  if(!newch) return message.reply(" ⛔ Channel wasn't given !")
  if(!message.mentions.channels.first()) ch = await message.guild.channels.get(newch) || await message.guild.channels.find(channel => channel.name == newch)
  if(message.mentions.channels.first()) ch = await message.mentions.channels.first()
  if(!ch) return message.reply(" ⛔ Cannot find channel !")
  if(fetch == ch.id) return message.reply(" ⛔ Log channel already set to <#" +ch.id+"> !")
  var ting = await client.db.set(`settings${message.guild.id}.logch`,ch.id)
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:tools: Set Log Channel :tools:\n\n➤ Moderator <@${message.author.id}>\n\n ➤ New channel **<#${ch.id}>**`)
  .setTimestamp();
  let embed2 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Set log channel <#${ch.id}>`)
  .setTimestamp();
  var log = await client.db.fetch(`settings${message.guild.id}.logch`)
  if(!log) log = "None"
  if(log == "None") return message.channel.send(embed2); 
  message.channel.send(embed2)
  message.guild.channels.get(log).send(embed)
  } else if (args[0].toLowerCase() == "autorole") {
  let srole = message.mentions.roles.first() || args[1]
  let newrole;
  var fetch = await client.db.fetch(`settings${message.guild.id}.autorole`)
  var rembed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setTimestamp()
  .setDescription(`Auto currently is set to <@&${fetch}>`);
  if(!args[1]) return message.channel.send(rembed)
  if(!message.mentions.roles.first()) newrole = await message.guild.roles.get(srole)
  if(!newrole) newrole = await message.guild.roles.find(role => role.name === srole)
  if(!newrole) return message.reply(" ⛔ Cannot find role !")
  if(fetch === newrole.id) return message.reply(" ⛔ Auto role already set to " +newrole.name+"> !")
  var ting = await client.db.set(`settings${message.guild.id}.autorole`,newrole.id)
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:tools: Set Autorole :tools:\n\n➤ Moderator <@${message.author.id}>\n\n ➤ New role <@&${newrole.id}`)
  .setTimestamp();
  let embed2 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Set autorole <@&${newrole.id}>`)
  .setTimestamp();
  var log = await client.db.fetch(`settings${message.guild.id}.logch`)
  if(!log) log = "None"
  if(log === "None") return message.channel.send(embed2); 
  message.channel.send(embed2)
  message.guild.channels.get(log).send(embed)
  } else {
  let embed = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`Settable settings\n\n=set prefix \`[prefix]\`\n\n=set joinchannel \`[channel]\`\n\n=set logchannel \`[channel]\`\n\n=set autorole \`[role]\``)
  .setTimestamp();
  message.channel.send(embed); 
  }
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/set.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "set",
  description: "Lets you change guild commands.",
  aliases: [],
  usage: "set [setting] [value]",
  accessableby:"Moderation",
  catagory:"moderation"
}