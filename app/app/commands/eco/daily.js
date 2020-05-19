const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
    var user = message.author;
    var output = await client.eco.Daily(user.id,2500)
    if (output.updated) {
   var emoji = client.emojis.get("658396028164243506")
    let pingembed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`:white_check_mark: Claimed daily of ${emoji} 2.5k !`)
    .setTimestamp()
    message.channel.send(pingembed);
    } else {
      message.reply(`⛔ Daily already claimed but don't worry on ${output.timetowait} until your next daily!`)
    }
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/balance.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "daily",
  description: "Gives you a daily reward for using diamond.",
  aliases: ["claimdaily"],
  usage: "daily",
  accessableby:"Members",
  catagory:"economy"
}