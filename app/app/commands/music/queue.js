const Discord = require('discord.js')

exports.run = async (message, args, client, prefix) => {
  try {
  client.music.showQueue(message)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/queue.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "queue",
  description: "Shows the queue in your guild.",
  aliases: ["showqueue","guildqueue"],
  usage: "queue",
  accessableby:"Members",
  catagory:"music"
}