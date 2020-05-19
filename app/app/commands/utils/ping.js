const Discord = require("discord.js");
//sup im at school lol awh lol
exports.run = async (message, args, client, prefix) => {
  try {
    let msgping1 = new Date();
    let clientping = new Date() - message.createdAt;
    let msgping2 = new Date() - msgping1;
    let pingembed = new Discord.RichEmbed()
        .setColor('GREEN')
        .setTimestamp()
        .setDescription(`➤ API Ping\n➥ ${Math.floor(client.ping)}ms\n\n➤ Bot Ping\n➥ ${Math.floor(clientping)}ms\n\n➤ Message Ping\n➥ ~ ${Math.round(msgping2)} ms`)      
    message.channel.send(pingembed);
    
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/ping.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
}

exports.help = {
  name: 'ping',
  description: 'Shows You How Fast The Response Is.',
  aliases: [],
  usage: 'ping',
  accessableby:"Members",
  catagory:"utils"
}