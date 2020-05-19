const { RichEmbed,Attachment} = require("discord.js");
const progress = require("progress-string");
const { Canvas } = require("canvas-constructor")
const fetch = require("node-fetch");
const imageUrlRegex = /\?size=2048$/g;

exports.run = async (message, args, client, prefix) => {
try {
client.imger.Search.Random("hug",1).then(Results => {
      Results.forEach(Post => {
      
      message.channel.send(Post.url)
            console.log(`Item ${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
      });
}).catch(console.error);
} catch (e) {
    let embed = new RichEmbed()
      .setColor("ORANGE")
      .setDescription(`⛔ Report this to the owner trix\n File: \`${__dirname+'/test.js'}\`\n \`\`\`\n${e}\`\`\``)
      .setTimestamp();
    message.channel.send(embed);
}
}
exports.help = {
  name: "test",
  description: ["None"],
  aliases: [],
  usage: ["None"],
  accessableby:"Owner"
};