const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
    var user = message.mentions.users.first()
    if (!user) return message.reply("⛔ No user mentioned!")
    if (user.id == message.author.id) return message.reply("⛔ Can't pay yourself!")
    var amount = parseInt(args[1])
    if(amount <= 0) return message.reply("⛔ Number has to be greater than 0 !")
    if(!amount) return message.reply("⛔ No number given !")
    if(isNaN(amount)) return message.reply("⛔ Only numbers !")
    var emoji = client.emojis.get("658396028164243506")
    var bal = await client.eco.FetchBalance(message.author.id)
    if (amount > bal.balance) return message.reply("⛔ Not enough diamonds!")  
    var input = await client.eco.Transfer(message.author.id,user.id,amount)
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
  var num = abbreviateNumber(amount)
    let pingembed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setDescription(`:white_check_mark: Paid <@${user.id}> ${emoji} ${num} !`);
    message.channel.send(pingembed);
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/pay.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "pay",
  description: "Allows you to transfer diamonds to other users.",
  aliases: ["transfer"],
  usage: "pay [user] [number]",
  accessableby:"Members",
  catagory:"economy"
}