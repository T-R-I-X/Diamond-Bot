const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
    var user = message.author
    var bal = await client.eco.FetchBalance(`${user.id}.bank`)
    var amount = args[0]
    if(!amount) return message.reply("⛔ No amount given !")
    if(amount.toLowerCase() == "all") amount = bal.balance
    if(amount <= 0) return message.reply("⛔ Number has to be greater than 0 !")
    if(!amount) return message.reply("⛔ No number given !")
    if(isNaN(amount)) return message.reply("⛔ Only numbers !")
    if (amount > bal.balance) return message.reply("⛔ Not enough diamonds in your bank!")  
    var input = await client.eco.Transfer(`${user.id}.bank`,user.id,amount)
    var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq","E","Eq","R","Rq","P","Pq","C","Cq"];

    function abbreviateNumber(number){
     var tier = Math.log10(number) / 3 | 0;
     if(tier == 0) return number;
     var suffix = SI_SYMBOL[tier];
     var scale = Math.pow(10, tier * 3);
     var scaled = number / scale;
     return scaled.toFixed(1) + suffix;
 }
var num = abbreviateNumber(amount)
var emoji = client.emojis.get("658396028164243506")
    let pingembed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setDescription(`:white_check_mark: Withdrawed ${emoji} ${num} !`);
    message.channel.send(pingembed);
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/withdraw.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "withdraw",
  description: "Allows you to transfer diamonds from your bank to your balance.",
  aliases: ["with"],
  usage: "withdraw [number]",
  accessableby:"Members",
  catagory:"economy"
}