const Discord = require('discord.js')

exports.run = async (message, args, client, prefix) => {
  try {
  client.music.pause(message)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/pause.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "pause",
  description: "Pauses the music playing.",
  aliases: ["pausesong"],
  usage: "pause",
  accessableby:"Members",
  catagory:"music"
}