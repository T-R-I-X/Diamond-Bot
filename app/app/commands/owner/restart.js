const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
try {
  if(message.author.id == 261167188193443841) {
  var ting = await message.channel.send(new Discord.RichEmbed().setColor("GREEN").setDescription(`:white_check_mark: Restarted bot!`).setTimestamp()) 
  process.exit(0)
  } else {
  let embed = new Discord.RichEmbed()
    .setColor("ORANGE")
    .setDescription(`⛔ This is a developer command!\n`)
    .setTimestamp();
    message.channel.send(embed); 
  }
} catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/restart.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
}
exports.help = {
  name: "restart",
  description: [],
  aliases: [],
  usage: [],
  accessableby:"Owner"
};