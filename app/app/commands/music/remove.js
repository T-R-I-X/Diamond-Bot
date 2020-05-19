const Discord = require('discord.js')

exports.run = async (message, args, client, prefix) => {
  try {
  var title = args[0]
  if(!title) return message.reply(" ⛔ Please provide a number !")
  if(isNaN(title)) return message.reply(" ⛔ Please number is not a number !")
  client.music.remove(message,title)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/remove.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "remove",
  description: "Removes song form the queue.",
  aliases: ["removesong"],
  usage: "remove",
  accessableby:"Members",
  catagory:"music"
}