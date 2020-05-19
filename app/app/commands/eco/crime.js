const Discord = require("discord.js");
const reply = ["You got cought","Trix cought you","You slipped","Someone tripped you","A robot saw you","A camera cought you","You fell into a hole","Diamond doesn't like you"]
const talkedRecently = new Set();

exports.run = async (message, args, client, prefix) => {
  try {
    if (talkedRecently.has(message.author.id)) {
           message.reply("⛔ Please wait 2 minutes before trying again!")
    } else {
  var user = message.author;
  var emoji = client.emojis.get("658396028164243506")
  var money = Math.floor(Math.random() * 20000 + 1)
  var input = await client.eco.Work(user.id,{failurerate: 55, money: money, jobs: ['You robbed a oldlady','You robbed a bank',"You robbed trix"]});
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
  var num = await abbreviateNumber(input.earned)
  var num2 = await abbreviateNumber(money)
  if(input.earned > 0) {
  
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
  .setTimestamp()
  message.channel.send(embed)
  
  } else {
  var rply = Math.floor(Math.random() * reply.length)
  let embed = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`${reply[rply]} and you got fined ${emoji} ${num2} !`)
  .setTimestamp()
  message.channel.send(embed)
  var remove = await client.eco.SubtractFromBalance(message.author.id,money)
  }  
       talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 120000);
    }
    
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/crime.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "crime",
  description: "Allows you to earn money but its risky.",
  aliases: [],
  usage: "crime",
  accessableby:"Members",
  catagory:"economy"
}