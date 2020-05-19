const Discord = require("discord.js");

exports.run = async (message, args, client, prefix) => {
  try {
  var user = message.author
  var memberinfo = await client.db.fetch(`info${message.author.id}.levelnotify`)
  if(!memberinfo) memberinfo = "true"
  if(memberinfo == "true") {
  var set = await client.db.set(`info${message.author.id}.levelnotify`,"false")
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Disabled level notifications`)
  .setTimestamp();
  message.channel.send(embed);
  } else {
  var set = await client.db.set(`info${message.author.id}.levelnotify`,"true")
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`:white_check_mark: Enabled level notifications`)
  .setTimestamp();
  message.channel.send(embed);
  }
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/disablelvl.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "lvlnotify",
  description: "Disables or enables the level notification.",
  aliases: [],
  usage: "lvlnotify",
  accessableby:"Members",
  catagory:"leveling"
}