const Discord = require("discord.js");
const talkedRecently = new Set();

exports.run = async (message, args, client, prefix) => {
  try {
    if (talkedRecently.has(message.author.id)) {
           message.reply("⛔ Please wait 1 minute before trying again!")
    } else {
    var SI_SYMBOL = ["", "K", "M", "B", "T", "Q", "Qq","E","Eq","R","Rq","P","Pq","C","Cq"];
    var emoji = client.emojis.get("658396028164243506")
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

    var user = message.mentions.users.first() || message.author;
    var money = Math.floor(Math.random() * 6000 + 1)
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']});
    if(input.earned > 0) {
      var num = await abbreviateNumber(input.earned)
      let embed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
      .setTimestamp()
      message.channel.send(embed)
      
    } else {
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']}); 
    if(input.earned > 0) {
        var num = await abbreviateNumber(input.earned)
    let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
    .setTimestamp()
    message.channel.send(embed)
     
    } else {
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']}); 
    if(input.earned > 0) {
        var num = await abbreviateNumber(input.earned)
      
    let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
    .setTimestamp()
    message.channel.send(embed)
     
    } else {
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']}); 
    if(input.earned > 0) {
      var num = await abbreviateNumber(input.earned)
    let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
    .setTimestamp()
    message.channel.send(embed)
     
    } else {
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']}); 
    if(input.earned > 0) {
      var num = await abbreviateNumber(input.earned)
    let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
    .setTimestamp()
    message.channel.send(embed)
     
    } else {
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']}); 
    if(input.earned > 0) {
    var num = await abbreviateNumber(input.earned)
    let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
    .setTimestamp()
    message.channel.send(embed)
     
    } else {
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']}); 
    if(input.earned > 0) {
    var num = await abbreviateNumber(input.earned)
    let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
    .setTimestamp()
    message.channel.send(embed)
     
    } else {
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']}); 
    if(input.earned > 0) {
    var num = await abbreviateNumber(input.earned)
    let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
    .setTimestamp()
    message.channel.send(embed)
     
    } else {
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']}); 
    if(input.earned > 0) {
    var num = await abbreviateNumber(input.earned)
    let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
    .setTimestamp()
    message.channel.send(embed)
     
    } else {
    var input = await client.eco.Work(user.id,{failurerate: -0, money: money, jobs: ['You picked up dog poop', 'You worked as a bouncer','You tase tested food','You tested products','You danced at a store','Your parents asked you to mow','You found some diamonds on the ground','You sang for a the queen','You danced for trix','You worked as a power agent','You produced a beat for dre','You worked for apple']}); 
    if(input.earned > 0) {
    var num = await abbreviateNumber(input.earned)
    let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`${input.job} and you earned ${emoji} ${num} !`)
    .setTimestamp()
    message.channel.send(embed)
     
    } else {
    let embed = new Discord.RichEmbed()
    .setColor("ORANGE")
    .setDescription(`⛔ This is a bug let trix know!`)
    .setTimestamp()
    message.channel.send(embed)
    }
    }  
    }
    }
    }
    }
    }
    }
    }
    }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 60000);
    }
  } catch (e) {
    let embed = new Discord.RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/work.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
  }
};

exports.help = {
  name: "work",
  description: "Allows you to work for diamonds risk free.",
  aliases: [],
  usage: "work",
  accessableby:"Members",
  catagory:"economy"
}