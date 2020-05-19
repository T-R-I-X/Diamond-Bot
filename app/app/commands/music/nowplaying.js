const Discord = require('discord.js')

exports.run = async (message, args, client, prefix) => {
  try {
  client.music.nowPlaying(message)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/nowplaying.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "nowplaying",
  description: "Shows what song is playing.",
  aliases: ["playing","track"],
  usage: "nowplaying",
  accessableby:"Members",
  catagory:"music"
}