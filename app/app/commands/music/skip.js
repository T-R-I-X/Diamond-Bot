const Discord = require('discord.js')

exports.run = async (message, args, client, prefix) => {
  try {
  client.music.skip(message)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/resume.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "skip",
  description: "Skips playing song.",
  aliases: ["skipsong"],
  usage: "skip",
  accessableby:"Members",
  catagory:"music"
}