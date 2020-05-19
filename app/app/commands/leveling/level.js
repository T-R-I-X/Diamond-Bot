const { RichEmbed,Attachment} = require("discord.js");
const progress = require("progress-string");
const { Canvas } = require("canvas-constructor")
const fetch = require("node-fetch");
const imageUrlRegex = /\?size=2048$/g;

exports.run = async (message, args, client, prefix) => {
  try {
   if(!message.mentions.users.first()) {
    var level = await client.level.Fetch(message.author.id)
    var place = await client.level.Leaderboard({search: message.author.id})
    var nxp = Math.floor(level.level * 50)
    if(place == "Not found") place = "No rank"
    var bar = progress({
      width: 10,
      total: nxp,
      complete: "✧",
      incomplete: "✧",
      style: function(complete, incomplete) {
        // add an arrow at the head of the completed part
        return complete + "✦" + incomplete;
      }
    });
     
    var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq"];

    function abbreviateNumber(number){

     // what tier? (determines SI symbol)
     var tier = Math.log10(number) / 3 | 0;

     // if zero, we don't need a suffix
     if(tier == 0) return number;

     // get suffix and determine scale
     var suffix = SI_SYMBOL[tier];
     var scale = Math.pow(10, tier * 3);

     // scale the number
     var scaled = number / scale;

     // format number and add suffix
     return scaled.toFixed(1) + suffix;
 }
    var num = await abbreviateNumber(level.xp)
    var num2 = await abbreviateNumber(nxp)

  async function profile(member, rank) {
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
  .addCircle(84, 90, 62)//avatar background
  .addCircularImage(avatar, 84, 90, 62)//avatar
  .save()
  .restore()
  .setTextAlign("center")
  .setTextFont("13px Impact")//font nd size
  .setColor("#FFFFFF")
  .addText(name, 267, 50)//name text
  .addText(`Level: ${level.level}`, 265,80)//level text
  .setTextAlign("left")
  .addText(`Rank: #${rank}`, 235, 110)//rank text
  .addText(`${bar(level.xp)} ${num} / ${num2}`, 170, 140)//exp text
  .toBuffer()
  }
    
    const buffer = await profile(message.member, place);
    const filename = `profile-${message.author.id}.jpg`;
    const attachment = new Attachment(buffer, filename);
    message.channel.send(attachment)
  } else {
    
    var level = await client.level.Fetch(message.mentions.users.first().id)
    var place = await client.level.Leaderboard({search: message.mentions.users.first().id})
    var nxp = Math.floor(level.level * 50)
    if(place == "Not found") place = "None"
    var bar = progress({
      width: 10,
      total: nxp,
      complete: "✧",
      incomplete: "✧",
      style: function(complete, incomplete) {
        // add an arrow at the head of the completed part
        return complete + "✦" + incomplete;
      }
    });
    var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq","E","Eq","R","Rq","P","Pq","C","Cq"];

    function abbreviateNumber(number){

     // what tier? (determines SI symbol)
     var tier = Math.log10(number) / 3 | 0;

     // if zero, we don't need a suffix
     if(tier == 0) return number;

     // get suffix and determine scale
     var suffix = SI_SYMBOL[tier];
     var scale = Math.pow(10, tier * 3);

     // scale the number
     var scaled = number / scale;

     // format number and add suffix
     return scaled.toFixed(1) + suffix;
 }
  var num = await abbreviateNumber(level.xp)
  var num2 = await abbreviateNumber(nxp)
  async function profile(member, rank) {
  const result = await fetch(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
  if (!result.ok) throw new Error("Failed to get the avatar.");
  const avatar = await result.buffer();
  const name = member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;

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
  .addCircle(84, 90, 62)//avatar background
  .addCircularImage(avatar, 84, 90, 62)//avatar
  .save()
  .restore()
  .setTextAlign("center")
  .setTextFont("13px Impact")//font nd size
  .setColor("#FFFFFF")
  .addText(name, 267, 50)//name text
  .addText(`Level: ${level.level}`, 265,80)//level text
  .setTextAlign("left")
  .addText(`Rank: #${rank}`, 235, 110)//rank text
  .addText(`${bar(level.xp)} ${num} / ${num2}`, 170, 140)//exp text
  .toBuffer()
  }
    const member1 = client.users.get(message.mentions.users.first().id)
    const buffer = await profile(member1, place);
    const filename = `profile-${member1.id}.jpg`;
    const attachment = new Attachment(buffer, filename);
    message.channel.send(attachment)
  }
  } catch (e) {
    let embed = new RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/level.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "level",
  description: "Shows yours or someone elses level.",
  aliases: [],
  usage: "level [user]",
  accessableby:"Members",
  catagory:"leveling"
}