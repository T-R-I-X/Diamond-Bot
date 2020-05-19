const Discord = require('discord.js')

exports.run = async (message, args, client, prefix) => {
  try {
  client.music.repeat(message)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/repeat.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "repeat",
  description: "Repeats current song that is playing.",
  aliases: ["repeatsong"],
  usage: "repeat",
  accessableby:"Members",
  catagory:"music"
}