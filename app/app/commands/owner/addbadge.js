const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
try {  
  var user1 = message.author;
  if(user1.id == 261167188193443841) {  
  var user2 = message.mentions.users.first()
  var badges = await client.db.fetch(`user${user2.id}.badges`)
  if(!badges) badges = ["jdjasjiijdsaijadsjidiasjadsjiidajidasijdajsiijadsijadsij"]
  var badge = args[1]
  if(!badge) return message.reply(`⛔ No badge given !`)
  if(!user2) return message.reply(`⛔ No user mentioned !`)  
  if(badges.includes(badge)) return message.reply(`⛔ ${user2.username} already has __${badge}__ !`)  
  var addbadge = await client.db.push(`user${user2.id}.badges`,badge)
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`➤ User\n\n➥ <@${user2.id}>\n\n ➤ Badge\n\n➥ __${badge}__`)
  .setTimestamp();
  message.channel.send(embed); 
     
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
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/addbadge.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
}
exports.help = {
  name: "addbadge",
  description: ["None"],
  aliases: [],
  usage: ["None"],
  accessableby:"Owner"
};
