const Discord = require('discord.js');

module.exports = async message => {
try {
let client = message.client
if(message.channel.type == 'dm') return
//custom prefix
var guildpre = await client.db.fetch(`settings${message.guild.id}.prefix`)
if(!guildpre) guildpre = "="; 
var set = await client.db.set(`settings${message.guild.id}.prefix`, guildpre)
let prefix = guildpre
//   

if(message.author.bot) return

//level system
var level = await client.level.Fetch(message.author.id)
if(level.level == 0) return client.level.AddLevel(message.author.id,1) 
var nxp = Math.floor(level.level * 50)
if(!message.guild.me.hasPermission('SEND_MESSAGES')) return
var memberinfo = await client.db.fetch(`info${message.author.id}.levelnotify`)
if(!memberinfo) memberinfo = "true"
if(message.guild.id == "264445053596991498") memberinfo = "false"
//check exp
if(level.xp >= nxp) {
var setlevel = await client.level.AddLevel(message.author.id, 1) 
var remove = await client.level.AddXp(message.author.id, -level.xp)
if(memberinfo == "true") {
  async function profile() {
  const { Canvas } = require("canvas-constructor")
  const fetch = require("node-fetch");
  const imageUrlRegex = /\?size=2048$/g;
  const result = await fetch(message.member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
  if (!result.ok) throw new Error("Failed to get the avatar.");
  const avatar = await result.buffer();
  const name = await message.member.displayName.length > 20 ? message.member.displayName.substring(0, 17) + "..." : message.member.displayName;

  return new Canvas(450, 180)
  .setColor("#353836")//background color
  .addRect(0, 0, 450, 180)//background
  .setColor("#58615b")
  .addRect(90, 28, 380, 123)//plate background
  .setColor("#222423")//rect colors
  .addRect(90, 28, 360, 35)//nameplate
  .addRect(90, 60, 360, 35)//level
  .addRect(90, 85, 360, 36)//rank
  .addRect(90, 121, 360, 30)//exp bar
  .setShadowColor("rgba(22, 22, 22, 1)")
  .setShadowOffsetY(5)
  .setShadowBlur(10)
  .fill()
  .addCircle(65, 90, 62)//avatar background
  .addCircularImage(avatar, 65, 90, 62)//avatar
  .save()
  .restore()
  .setTextAlign("center")
  .setTextFont("17px Impact")//font nd size
  .setColor("#FFFFFF")
  .addText(`Welcome to level ${level.level} !`, 280, 60)//guild name
  .addText(name, 265, 95)//name text
  .setTextFont("15px Impact")//font nd size
  .setTextAlign("left")
  .addText(`You can disable this with ${prefix}lvlnotify !`, 140, 130)//rank text
  .toBuffer()
  }
    
    const buffer = await profile();
    const filename = `profile-${message.author.id}.jpg`;
    const attachment = new Discord.Attachment(buffer, filename);
    message.channel.send(attachment)
}
}
//add exp
var randomnumexp = await Math.floor(Math.random() * 3 + 1)
var addexp = await client.level.AddXp(message.author.id,randomnumexp)

//

//

    if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) message.channel.send(new Discord.RichEmbed().setColor("GREEN").setDescription(`My prefix for this server is **${prefix}**`))
    if(!message.content.startsWith(prefix)) return;
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0].toLowerCase();
    const args = messageArray.slice(1);

    let command = message.content.split(' ')[0].slice(prefix.length).toLowerCase()
    if(!command) return
    let commandfile;
    if (client.ownercommands.has(command)) commandfile = await client.ownercommands.get(command)
    else if (client.ecocommands.has(command)) commandfile = await client.ecocommands.get(command)
    else if (client.musiccommands.has(command)) commandfile = await client.musiccommands.get(command)
    else if (client.modcommands.has(command)) commandfile = await client.modcommands.get(command)
    else if (client.levelcommands.has(command)) commandfile = await client.levelcommands.get(command)
    else if (client.roleplaycommands.has(command)) commandfile = await client.roleplaycommands.get(command)
    else if (client.utilcommands.has(command)) commandfile = await client.utilcommands.get(command)
    else if (client.ecoaliases.has(command)) commandfile = await client.ecocommands.get(client.ecoaliases.get(command));
    else if (client.modaliases.has(command)) commandfile = await client.modcommands.get(client.modaliases.get(command));
    else if (client.levelaliases.has(command)) commandfile = await client.levelcommands.get(client.levelaliases.get(command));
    else if (client.rpaliases.has(command)) commandfile = await client.roleplaycommands.get(client.rpaliases.get(command));
    else if (client.owneraliases.has(command)) commandfile = await client.ownercommands.get(client.owneraliases.get(command));
    else if (client.utilaliases.has(command)) commandfile = await client.utilcommands.get(client.utilaliases.get(command));
    else if (client.musicaliases.has(command)) commandfile = await client.musiccommands.get(client.musicaliases.get(command));
    if(!commandfile) return
    if(commandfile.help.disabled == true) return
    var wait = await client.db.fetch(`info${message.guild.id}-${commandfile.help.name}`)
    if(!wait) wait = "true"
    var wait2 = await client.db.fetch(`info${message.guild.id}-${commandfile.help.catagory}`)
    if(!wait2) wait = "true"
    if (wait == "false") return message.reply("⛔ Command is disabled on this server !")
    if (wait2 == "false") return message.reply("⛔ Category is disabled on this server !")
    if (commandfile) commandfile.run(message, args, client, prefix);
  } catch (e) {
     console.log(`(message.js) ${e}`)
  }
}