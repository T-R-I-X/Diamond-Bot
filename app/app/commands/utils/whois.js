const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
    var user = await message.guild.fetchMember(message.mentions.users.first()||message.author)
    if(!user) return message.reply(" ⛔ No user mentioned !");

    let userembed = new Discord.RichEmbed()
    .setThumbnail(user.user.displayAvatarURL)
    .setDescription(`➤ Username\n ➥ <@${user.id}>\n\n➤ Userid\n ➥ ${user.id}\n\n➤ Joined at\n ➥ ${message.guild.members.find("id", user.id).joinedAt}\n\n➤ Created at\n ➥ ${user.user.createdAt} `)
    .setColor("GREEN")
    message.channel.send(userembed)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/slots.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "whois",
  description: "Allows you to get information on a user.",
  aliases: ["userinfo"],
  usage: "whois [user]",
  accessableby:"Members",
  catagory:"utils"
}