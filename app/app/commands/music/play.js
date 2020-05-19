const Discord = require('discord.js')

exports.run = async (message, args, client, prefix) => {
  try {
  var title = args[1] || args.join(" ")
  if(!title) return message.reply(" ⛔ Please provide a title !")
  var ting = args.join(' ') || args[1]
  client.music.play(message,ting)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/play.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "play",
  description: "Plays music in your channel.",
  aliases: ["playsong"],
  usage: "play [name] / [link]",
  accessableby:"Members",
  catagory:"music"
}