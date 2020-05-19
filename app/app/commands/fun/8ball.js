const Discord = require("discord.js");
var replys = ["No","Yes","Maybe","Maybe a chance","Probably","Not a chance","If you try","Eh no","If you want","I don't think"]


exports.run = async (message, args, client, prefix) => {
  try {
  if(!args[0]) return message.reply("⛔ No question provided !")
  var rply = Math.floor(Math.Random() * replys.length) + 1
  message.channel.send("***Thinking of a reply...***").then(msg => {
  setTimeout(function (){
  msg.delete()
  let pingembed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setTimestamp()
  .setDescription(`My reasponse is **${replys[rply]}**`)
  msg.channel.send(pingembed)
  }, 5000);  
  })
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/8ball.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "8ball",
  description: "Ask the 8ball your deepest desires.",
  aliases: [],
  usage: "8ball [question]",
  accessableby:"Members",
  catagory:"fun"
}