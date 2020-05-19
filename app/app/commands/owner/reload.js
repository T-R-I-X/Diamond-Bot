const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
try {  
  var user1 = message.author;
  if(user1.id == 261167188193443841) {  

  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: reloaded all commands!`)
  .setTimestamp();
  message.channel.send(embed); 
  client.reload();
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
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/reload.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
}
exports.help = {
  name: "reload",
  description: ["None"],
  aliases: [],
  usage: ["None"],
  accessableby:"Owner"
};
