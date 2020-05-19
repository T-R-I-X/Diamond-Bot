const Discord = require('discord.js')

exports.run = async (message, args, client, prefix) => {
  try {
  var title = parseInt(args[0])
  if(!title) return message.reply(` ⛔ Please provide a number !`)
  client.music.volume(message,title)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/volume.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "volume",
  description: "Sets the volume for you guild.",
  aliases: ["setvolume"],
  usage: "volume [number]",
  accessableby:"Members",
  catagory:"music"
}