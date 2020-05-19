const Discord = require("discord.js");
const store = require("../../assets/store.json")

exports.run = async (message, args, client, prefix) => {
  try {
    
    var user = message.author
    var diamonds = await client.eco.FetchBalance(user.id)
    var emojid = client.emojis.get("658396028164243506")
    var index = 0
    var emoji = null
    let pingembed = new Discord.RichEmbed()
        .setColor('PURPLE')
        .setTimestamp()
        .setDescription(`**Crate shop**\n\n${store.map(item => `ID: \`${++index}\` - ${client.emojis.get(item.emojiid)} ${item.itemname} | ${emojid} \`${item.price}\``).join('\n\n')}`)
    message.channel.send(pingembed);
    
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/store.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
}

exports.help = {
  name: 'store',
  description: 'Shows you what is currently in the store.',
  aliases: ['shop','currencyshop'],
  usage: 'store',
  accessableby:"Members",
  catagory:"economy"
}