const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
  var user = message.mentions.users.first()
  var reason = args.join(" ").slice(22);
  if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("⛔ Missing **BAN_MEMBERS** permission !")
  if(!user) return message.reply("⛔ No member mentioned !")
  if(!user.bannable) return message.reply("⛔ I can't ban this user !")
  if(!reason) reason = "Diamond ban by " + message.author.username
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:tools: Banned User :tools:\n\n➤ Moderator\n\n➥ <@${message.author.id}>\n\n ➤ User\n\n➥ <@${user.id}>`)
  .setTimestamp();
  let embed2 = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Banned <@${user.id}>`)
  .setTimestamp();
  message.guild.member(user).ban(reason)
  var log = await client.db.fetch(`settings${message.guild.id}.logch`)
  if(!log) log = "None"
  if(log == "None") return message.channel.send(embed2); 
  message.channel.send(embed2)
  message.guild.channels.get(log).send(embed)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/ban.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "ban",
  description: "Bans a member.",
  aliases: ["banuser","buser"],
  usage: "ban [user]",
  accessableby:"Admins",
  catagory:"moderation"
}