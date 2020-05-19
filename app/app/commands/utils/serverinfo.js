const Discord = require("discord.js");
const reply = ["You got cought","Trix cought you","You slipped","Someone tripped you","A robot saw you","A camera cought you","You fell into a hole","Diamond doesn't like you"]
exports.run = async (message, args, client, prefix) => {
  try {

const time = message.guild.createdAt;
  
let embed = new Discord.RichEmbed()
.setDescription(`**${message.guild.name}\'s** Info`)
.setColor('GREEN')
.setThumbnail(message.guild.displayAvatarURL)
.setTimestamp()
.addField('➤ Server owner', `➥ ${message.guild.owner}`, true)
.addField('➤ Server id', `➥ ${message.guild.id}`, true)
.addBlankField(true)
.addField('➤ Channels', `➥ \`${message.guild.channels.filter(t => t.type !== 'category').size}\``, true)
.addField('➤ Created at', `➥ ${time.toLocaleDateString()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`, true)
.addBlankField(true)
.addField('➤ Verification level', `➥ \` ${getVerify(message.guild)} \``, true)
.addField('➤ Roles', `➥ ${message.guild.roles.size} `, true)
.addBlankField(true)
.addField('➤ Members', `➥ ${message.guild.memberCount} `, true)
.addField('➤ Bots', `➥ ${message.guild.members.filter(m => m.user.bot).size} `, true)
.addBlankField(true)
message.channel.send(embed)
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/serverinfo.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "serverinfo",
  description: "Gives you basic information on your current guild.",
  aliases: ["serverinf","serinf"],
  usage: "serverinfo",
  accessableby:"Members",
  catagory:"utils"
}

const getRegion = (guild) => {
    let region;
    if(guild.region === 'brazil') region = '🇧🇷 Brazil';
    if(guild.region === 'eu-central') region = '🇪🇺 Central Europe';
    if(guild.region === 'hongkong') region = '🇭🇰 Hong Kong';
    if(guild.region === 'japan') region = '🇯🇵 Japan';
    if(guild.region === 'russia') region = '🇷🇺 Russia';
    if(guild.region === 'singapore') region = '🇸🇬 Singapore';
    if(guild.region === 'southafrica') region = '🇿🇦 South Africa';
    if(guild.region === 'sydney') region = '🇭🇲 Sydney';
    if(guild.region === 'us-central') region = '🇺🇸 US Central';
    if(guild.region === 'us-east') region = '🇺🇸 US East';
    if(guild.region === 'us-south') region = '🇺🇸 US South';
    if(guild.region === 'us-west') region = '🇺🇸 US West';
    if(guild.region === 'eu-west') region = '🇪🇺 Western Europe';
    return region;
}

const getVerify = (guild) => {
    let verify;
    if(guild.verificationLevel === 0) verify = '❌ None';
    if(guild.verificationLevel === 1) verify = '✅ Low';
    if(guild.verificationLevel === 2) verify = '✅ Medium';
    if(guild.verificationLevel === 3) verify = '\`(╯°□°）╯︵ ┻━┻\`';
    if(guild.verificationLevel === 4) verify = '\`┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻\`';
    return verify;
}