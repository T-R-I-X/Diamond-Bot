const { RichEmbed,Attachment} = require("discord.js");

exports.run = async (message, args, client, prefix) => {
try {
client.imger.Search.Random("kiss",1).then(Results => {
      Results.forEach(Post => {
      var user = message.author
      var user2 = message.mentions.users.first()
      if(!user2) return message.reply("⛔ No user mentioned!")
      var embed = new RichEmbed()
      .setDescription(`<@${user.id}> **kissed** <@${user2.id}> !`)
      .setImage(Post.url)
      .setColor("GREEN")
      .setTimestamp()
message.channel.send(embed)
      });
}).catch(console.error);
} catch (e) {
    let embed = new RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/kiss.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
}
exports.help = {
  name: "kiss",
  description: "Allows you to kiss a user.",
  aliases: ["kissuser"],
  usage: ["kiss [user]"],
  accessableby:"Members",
  catagory:"roleplay"
};