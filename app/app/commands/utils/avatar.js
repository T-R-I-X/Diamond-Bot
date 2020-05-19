const Discord = require("discord.js");
//one sec
exports.run = async (message, args, client, prefix) => {
try {
  const mUser = message.mentions.users.first() || client.users.find(user => user.id === message.content.split(" ")[1]) || message.author;

  const avatar = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`**${mUser.username}'s** avatar:`)
    .setImage(mUser.displayAvatarURL)
    .setTimestamp();
  message.channel.send(avatar);
} catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/avatar.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
}
exports.help = {
  name: "avatar",
  description: "Grabs the mentioned users picture.",
  aliases: ["userpic"],
  usage: "avatar [user]",
  accessableby:"Members",
  catagory:"utils"
};
