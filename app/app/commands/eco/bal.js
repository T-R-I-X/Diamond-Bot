const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
    var user = message.mentions.users.first() || message.author;
    var diamonds = await client.eco.FetchBalance(user.id);
   var emoji = client.emojis.get("658396028164243506")
    var bank = await client.eco.FetchBalance(`${user.id}.bank`)
    var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq","E","Eq","R","Rq","P","Pq","C","Cq"];
    function abbreviateNumber(number){
     var tier = Math.log10(number) / 3 | 0;
     if(tier == 0) return number;
     var suffix = SI_SYMBOL[tier];
     var scale = Math.pow(10, tier * 3);
     var scaled = number / scale;
     return scaled.toFixed(1) + suffix;
 }
    var num = await abbreviateNumber(diamonds.balance)
    var num2 = await abbreviateNumber(bank.balance)
    let pingembed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setDescription(`:bank: Authenticated bank of <@${user.id}>`)
      .addField("➤ Balance",`➥ ${emoji} ${num}`,true)
      .addField("➤ Bank",`➥ ${emoji} ${num2}`,true)
    message.channel.send(pingembed);
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/balance.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "balance",
  description: "Shows your balance or another users.",
  aliases: ["bal", "userbalance"],
  usage: "balance [user]",
  accessableby:"Members",
  catagory:"economy"
}