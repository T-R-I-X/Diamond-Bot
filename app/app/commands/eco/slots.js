const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
    var user = message.author;
    var amount = parseInt(args[0])
    if (!amount) return message.reply("⛔ No amount given!")
    var bal = await client.eco.FetchBalance(user.id)
    var emoji = client.emojis.get("658396028164243506")
    if(bal.balance < amount) return message.reply("⛔ You don't have that many diamonds!")
    var input = await client.eco.Slots(user.id, amount, {Rolls: 4, Emojis: ['🍎','🍒','🍉','🍍','🍆','🍓','🥝','🍇']})
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
    var num = await abbreviateNumber(amount)
    var num2 = await abbreviateNumber(Math.floor(amount * 2))
    if(input.output == 'lost') {
    var embed = new Discord.RichEmbed()
    .setTimestamp()
    .setColor("RED")
    .setDescription("You lost!")
    .addField("➤ Roll", `➥ ${input.slots1} | ${input.slots2} | ${input.slots3}`)
    .addField("➤ Lost profit(2x)", `➥ ${emoji} ${num2}`)
    message.channel.send(embed)
    } else {
    var embed = new Discord.RichEmbed()
    .setTimestamp()
    .setColor("GREEN")
    .setDescription("You won!")
    .addField("➤ Roll", `➥ ${input.slots1} | ${input.slots2} | ${input.slots3}`)
    .addField("➤ Return profit(2x)", `➥ ${emoji} ${num2}`)
    message.channel.send(embed)
    }
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/slots.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "slots",
  description: "Allows you to gamble your money away.",
  aliases: ["slot"],
  usage: "slot [number]",
  accessableby:"Members",
  catagory:"economy"
}