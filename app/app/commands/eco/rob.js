const Discord = require("discord.js");
const reply = ["The user saw you","The user wacked you on your head","The user tripped you","The user kicked your shin","The user punched you","The user pooped on you"]
const talkedRecently = new Set();

exports.run = async (message, args, client, prefix) => {
  try {
  var emoji = client.emojis.get("658396028164243506")
  if (talkedRecently.has(message.author.id)) {
  message.reply("⛔ Please wait 30 seconds before trying again !")
  } else {
  var user = message.mentions.users.first() || client.users.get(args[0])
  if(!user) return message.reply("⛔ Can't find user !")
  if(user.id == message.author.id) return message.reply("⛔ You can not rob yourself !")
  var bal = client.eco.FetchBalance(user.id) 
  if(bal.balance <= 0) return message.reply("⛔ User has no money !")
  var money = await Math.floor(Math.random() * bal.balance) + 1
  var input = await client.eco.Work(message.author.id,{failurerate: 25, money: money, jobs: ["robbed user"]});
  var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq","E","Eq","R","Rq","P","Pq","C","Cq"];
  function abbreviateNumber(number){
  var tier = Math.log10(number) / 3 | 0;
  if(tier == 0) return number;
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  return scaled.toFixed(1) + suffix;
  }
  var num = await abbreviateNumber(input.earned)
  if(input.earned > 0) {
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`You robbed <@${user.id}> of ${emoji} **${num}**!`)
  .setTimestamp()
  message.channel.send(embed)
  var doit = await client.eco.SubtractFromBalance(user.id,input.earned)
  } else {
  var rply = Math.floor(Math.random() * reply.length)
  let embed = new Discord.RichEmbed()
  .setColor("RED")
  .setDescription(`${reply[rply]} and took back all their diamonds!`)
  .setTimestamp()
  message.channel.send(embed)
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
  talkedRecently.delete(message.author.id);
  }, 30000);
  }
    
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/rob.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "rob",
  description: "Allows you to rob the money in a users balance.",
  aliases: [],
  usage: "rob [user]",
  accessableby:"Members",
  catagory:"economy"
}