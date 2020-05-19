const Discord = require("discord.js");
const store = require("../../assets/store.json")

exports.run = async (message, args, client, prefix) => {
  try {

var user = message.mentions.users.first() || message.author;
var diamonds = await client.eco.FetchBalance(user.id);
var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq","E","Eq","R","Rq","P","Pq","C","Cq"];
function abbreviateNumber(number){
     var tier = Math.log10(number) / 3 | 0; 
     if(tier == 0) return number;
     var suffix = SI_SYMBOL[tier];
     var scale = Math.pow(10, tier * 3);
     var scaled = number / scale;
     return scaled.toFixed(1) + suffix;
 }
var emoji = client.emojis.get("658396028164243506")
var item = store[args[0]-1]
if(!item) return message.reply("⛔ Item doesn't exist !")
var num = await abbreviateNumber(diamonds.balance)
let pingembed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setDescription(`⟰ Authenticated bank of ${client.user.username}\n\n➤ User\n➥ <@${user.id}>\n\n➤ Diamonds\n➥ ${num}`);
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
  disabled: true,
  name: "open",
  description: "Open an crate.",
  aliases: ["opencrate"],
  usage: "open [crate name]",
  accessableby:"Members",
  catagory:"economy"
}