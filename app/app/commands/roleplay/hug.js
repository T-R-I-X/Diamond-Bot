const { RichEmbed,Attachment} = require("discord.js");
var links = ["https://media1.tenor.com/images/6db54c4d6dad5f1f2863d878cfb2d8df/tenor.gif?itemid=8787058",""]

exports.run = async (message, args, client, prefix) => {
try {
client.imger.Search.Random("hug",1).then(Results => {
      Results.forEach(Post => {
      var user = message.author
      var user2 = message.mentions.users.first()
      if(!user2) return message.reply("⛔ No user mentioned!")
      var embed = new RichEmbed()
      .setDescription(`<@${user.id}> **huged** <@${user2.id}> !`)
      .setImage(Post.url)
      .setColor("GREEN")
      .setTimestamp();
message.channel.send(embed)
      });
}).catch(console.error);
} catch (e) {
    let embed = new RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/hug.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
}
exports.help = {
  name: "hug",
  description: "Allows you to hug a user.",
  aliases: ["huguser"],
  usage: ["hug [user]"],
  accessableby:"Members",
  catagory:"roleplay"
};