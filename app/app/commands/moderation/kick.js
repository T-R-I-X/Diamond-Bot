const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
  var user = message.mentions.users.first()
  var reason = args.join(" ").slice(22);
  if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(" ⛔ Missing **KICK_MEMBERS** permission !")
  if(!user) return message.reply(" ⛔ No member mentioned !")
  if(!user.kickable) return message.reply(" ⛔ I can't kick this user !")
  if(!reason) reason = "Diamond bot kick"
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:tools: Kicked User :tools:\n\n➤ Moderator\n\n➥ <@${message.author.id}>\n\n ➤ User\n\n➥ <@${user.id}>`)
  .setTimestamp();
  let embed2 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Kicked <@${user.id}>`)
  .setTimestamp();
  message.guild.member(user).kick(reason)
  var log = await client.db.fetch(`settings${message.guild.id}.logch`)
  if(!log) log = "None"
  if(log == "None") return message.channel.send(embed2); 
  message.channel.send(embed2)
  message.guild.channels.get(log).send(embed)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/kick.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "kick",
  description: "Kicks a member.",
  aliases: ["kickuser","kuser"],
  usage: "kick [user]",
  accessableby:"Moderation",
  catagory:"moderation"
}