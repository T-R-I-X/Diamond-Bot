const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
try {
  var user2 = message.mentions.users.first()
  if(message.author.id == 261167188193443841) {
  if(!user2) return message.reply(`⛔ No user mentioned !`)  
  if(!args[1]) return message.reply(`⛔ No amount givenn !`)  
  var addbadge = await client.eco.SetBalance(user2.id,args[1])
  var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq","E","Eq","R","Rq","P","Pq","C","Cq"];

    function abbreviateNumber(number){

     // what tier? (determines SI symbol)
     var tier = Math.log10(number) / 3 | 0;

     // if zero, we don't need a suffix
     if(tier == 0) return number;

     // get suffix and determine scale
     var suffix = SI_SYMBOL[tier];
     var scale = Math.pow(10, tier * 3);

     // scale the number
     var scaled = number / scale;

     // format number and add suffix
     return scaled.toFixed(1) + suffix;
 }
  var num = await abbreviateNumber(args[1])
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`➤ User\n\n➥ <@${user2.id}>\n\n ➤ Set to\n\n➥ ${num}`)
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
  name: "setbal",
  description: ["None"],
  aliases: [],
  usage: ["None"],
  accessableby:"Owner"
};