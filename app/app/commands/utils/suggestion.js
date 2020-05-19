const Discord = require("discord.js");
//one sec
exports.run = async (message, args, client, prefix) => {
try {
  
  let suggestion =  args.join(" ");
  if(!suggestion) return message.reply("⛔ No suggestion given!")

  let suggeEmbed = new Discord.RichEmbed()
  .setDescription(`:wrench: Suggestion :wrench:\n\n➤ User\n➥ <@${message.author.id}>\n\n➤ Server\n➥ ${message.guild}\n\n\`\`\`${suggestion}\`\`\``)
  .setColor("GREEN") 
  let done = new Discord.RichEmbed()
  .setDescription(`:white_check_mark: Suggestion sent!`)
  .setColor("GREEN") 
  message.channel.send(done)
  client.channels.get("612484092231155713").send(suggeEmbed);
} catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/suggestion.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
}
exports.help = {
  name: "suggest",
  description: "Allows you to suggest things.",
  aliases: ["suggestion"],
  usage: "suggest [suggestion]",
  accessableby:"Members",
  catagory:"utils"
};