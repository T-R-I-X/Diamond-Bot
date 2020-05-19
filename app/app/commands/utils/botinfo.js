const Discord = require("discord.js");
const os = require("os");

exports.run = async (message, args, client, prefix) => {
try {
let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
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
  var num = await abbreviateNumber(client.users.size)
  var num2 = await abbreviateNumber(client.guilds.size)
  var pre = await client.db.fetch(`settings${message.guild.id}.prefix`)
  let embed = new Discord.RichEmbed()
    .setDescription(`Hi im ${client.user.username}! I stride to provide you fun/useful commands.`)
    .setColor("GREEN")
    .setDescription(`My prefix for **${message.guild.name}** is ${pre}`)
    .setThumbnail(client.user.displayAvatarURL)
    .setTimestamp()
    .setFooter("Hosted by glitch!")
    .addField("➤ Users", `➥ ${num}`, true)
    .addField("➤ Servers", `➥ ${num2}`, true)
    .addField("➤ OS type", `➥ ${os.type}`, true)
    .addField("➤ Ping", `➥ ${Math.round(client.ping)} ms`, true)
    .addField("➤ Usage",`➥ \` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} mb \``,true)
    .addField("➤ Website", `➥ [HERE](https://diamonddash.glitch.me)`, true)
    .addField("➤ Server link", `➥ [HERE](https://discord.gg/Ym5BnJU)`, true)
    .addField("➤ Donate", `➥ [HERE](https://www.paypal.me/devtrix?locale.x=en_US)`,true)
    .addField("➤ Time online", `➥ ${days} days, ${hours} hours, ${minutes} minutes`,true)
    
  message.channel.send(embed);
} catch (e) {
      let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/botinfo.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
};

module.exports.help = {
  name: "botinfo",
  description: "Shows information about the bot.",
  usage: "botinfo",
  aliases: ["binfo", "binf", "botinf"],
  accessableby:"Members",
  catagory:"utils"
};