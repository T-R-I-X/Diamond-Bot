const { RichEmbed,Attachment} = require("discord.js");

exports.run = async (message, args, client, prefix) => {
try {
client.imger.Search.Random("smack",1).then(Results => {
      Results.forEach(Post => {
      var user = message.author
      var user2 = message.mentions.users.first()
      console.log(Post.id)
      if(!user2) return message.reply("⛔ No user mentioned!")
      var embed = new RichEmbed()
      .setDescription(`<@${user.id}> **smacked** <@${user2.id}> !`)
      .setImage(Post.url)
      .setColor("GREEN")
      .setTimestamp()
message.channel.send(embed)
      });
}).catch(console.error);
} catch (e) {
    let embed = new RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/smack.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
}
exports.help = {
  name: "smack",
  description: "Allows you to smack a user.",
  aliases: ["smackuser"],
  usage: ["smack [user]"],
  accessableby:"Members",
  catagory:"roleplay"
};