const discord = require("discord.js")
const db = require("quick.db")
const progress = require("progress-string");
const { Canvas } = require("canvas-constructor")
const fetch = require("node-fetch");
const imageUrlRegex = /\?size=2048$/g;

module.exports = async member => {    
try {
var setting;
var add;
var role = await db.fetch(`settings${member.guild.id}.autorole`); 
var log = await db.fetch(`settings${member.guild.id}.joinch`)
if(!log) log = "None"
if(log == "None") return addrole()
var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq"];
function abbreviateNumber(number){
var tier = Math.log10(number) / 3 | 0;
if(tier == 0) return number;
var suffix = SI_SYMBOL[tier];
var scale = Math.pow(10, tier * 3);
var scaled = number / scale;
return scaled.toFixed(1) + suffix;
}
var num = await abbreviateNumber(member.guild.members.size)

  async function profile(rank) {
  const result = await fetch(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
  if (!result.ok) throw new Error("Failed to get the avatar.");
  const avatar = await result.buffer();
  const name = await member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;

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
  .setTextFont("15px Impact")//font nd size
  .setColor("#FFFFFF")
  .addText(`Welcome to ${member.guild.name},`, 280, 60)//guild name
  .addText(name, 265, 95)//name text
  .setTextFont("15px Impact")//font nd size
  .setTextAlign("left")
  .addText(`The server now has ${rank} members !`, 140, 130)//rank text
  .toBuffer()
  }
    
    const buffer = await profile(num);
    const filename = `profile-${member}.jpg`;
    const attachment = new discord.Attachment(buffer, filename);
    member.guild.channels.get(log).send(attachment)
    addrole()
    function addrole() {
    if(!role) return "no can do"
    setting = member.guild.roles.get(role); 
    add = member.addRole(setting);
    }
} catch (e) {
        console.log(`[Error] [guildmemberadd] >> ${e}`);
    }
}