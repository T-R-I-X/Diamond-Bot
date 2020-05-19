const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
    var user = message.mentions.users.first() || message.author;
    var diamonds = await client.eco.FetchBalance(user.id);
    var badges = await client.db.fetch(`user${user.id}.badges`);
    var emoji = client.emojis.get("658396028164243506")
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
    var num = await abbreviateNumber(diamonds.balance)
    if(!badges) badges = ["None"]
    let pingembed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setDescription(`Profile of <@${user.id}>\n\n➤ Married to\n➥ No one\n\n \`\`\`Badges : ${badges.join(", ")}\n\n\`\`\`\n\n \`\`\`Description : None\`\`\``);
    message.channel.send(pingembed);
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/profile.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "profile",
  description: "Gives information about you or a mentioned user.",
  aliases: ["userprofile"],
  usage: "profile [user]",
  accessableby:"Members",
  catagory:"roleplay"
}