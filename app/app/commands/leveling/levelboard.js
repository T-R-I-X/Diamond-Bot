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
if(!message.mentions.users.first()) {
client.level.Leaderboard({limit: 5}).then(async users => {
var num1 = abbreviateNumber(users[0].level)
var num2 = abbreviateNumber(users[1].level)
var num3 = abbreviateNumber(users[2].level)
var num4 = abbreviateNumber(users[3].level)
var num5 = abbreviateNumber(users[4].level)
let pingembed = new Discord.RichEmbed()
.setColor("GREEN")
.setTimestamp()
.setDescription(`**Diamond's top 5 leveling leaders**\n\n 1 - <@${users[0].userid}> | ${num1} levels\n 2 - <@${users[1].userid}> | ${num2} levels\n 3 - <@${users[2].userid}> | ${num3} levels\n 4 - <@${users[3].userid}> | ${num4} levels\n 5 - <@${users[4].userid}> | ${num5} levels\n`)
message.channel.send(pingembed)
})
} else {
var output = await client.level.Leaderboard({search: message.mentions.users.first().id})
if (output !== "Not found") output = "#"+output
var diamonds = await client.level.Fetch(message.mentions.users.first().id)
var num1 = abbreviateNumber(diamonds.level)
let pingembed = new Discord.RichEmbed()
.setColor("GREEN")
.setTimestamp()
.setDescription(`<@${message.mentions.users.first().id}> is **${output}** on the levelboard with **${num1}** levels !`)
message.channel.send(pingembed) 
}
} catch (e) {
let embed = new Discord.RichEmbed()
.setColor("ORANGE")
.setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/levelboard.js'}\`\n \`\`\`\n${e}\`\`\``)
.setTimestamp();
message.channel.send(embed);
}
};

exports.help = {
  name: "levelboard",
  description: "Shows top 10 leveling leaders.",
  aliases: ["globallevelleaders","lvlboard"],
  usage: "levelboard [user]",
  accessableby:"Members",
  catagory:"leveling"
}