const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq","E","Eq","R","Rq","P","Pq","C","Cq"];
function abbreviateNumber(number){
var tier = Math.log10(number) / 3 | 0;
if(tier == 0) return number;
var suffix = SI_SYMBOL[tier];
var scale = Math.pow(10, tier * 3);
var scaled = number / scale;
return scaled.toFixed(1) + suffix;
}
var diamond = client.emojis.get("658396028164243506")
if(!message.mentions.users.first()) {
client.eco.Leaderboard({limit: 5, filter: x => x.balance > 100}).then(async users => {
var num1 = abbreviateNumber(users[0].balance)
var num2 = abbreviateNumber(users[1].balance)
var num3 = abbreviateNumber(users[2].balance)
var num4 = abbreviateNumber(users[3].balance)
var num5 = abbreviateNumber(users[4].balance)
let pingembed = new Discord.RichEmbed()
.setColor("GREEN")
.setTimestamp()
.setDescription(`**Diamond's top 5 economic leaders**\n\n 1 - <@${users[0].userid}> | ${diamond} ${num1}\n 2 - <@${users[1].userid}> | ${diamond} ${num2}\n 3 - <@${users[2].userid}> | ${diamond} ${num3}\n 4 - <@${users[3].userid}> | ${diamond} ${num4}\n 5 - <@${users[4].userid}> | ${diamond} ${num5}\n`)
message.channel.send(pingembed)
})
} else {
var output = await client.eco.Leaderboard({search: message.mentions.users.first().id})
if (output !== "Not found") output = "#"+output
var diamonds = await client.eco.FetchBalance(message.mentions.users.first().id)
var num1 = abbreviateNumber(diamonds.balance)
let pingembed = new Discord.RichEmbed()
.setColor("GREEN")
.setTimestamp()
.setDescription(`<@${message.mentions.users.first().id}> is **${output}** on the leaderboard with ${diamond} **${num1}**`)
message.channel.send(pingembed) 
}
} catch (e) {
let embed = new Discord.RichEmbed()
.setColor("ORANGE")
.setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/leaderboard.js'}\`\n \`\`\`\n${e}\`\`\``)
.setTimestamp();
message.channel.send(embed);
}
};

exports.help = {
  name: "ecoboard",
  description: "Shows top 10 economic leaders.",
  aliases: ["globalecoleaders"],
  usage: "leaderboard [user]",
  accessableby:"Members",
  catagory:"economy"
}