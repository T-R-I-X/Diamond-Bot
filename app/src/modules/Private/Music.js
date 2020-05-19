"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};//basic starter

Object.defineProperty(exports, "__esModule", { value: true });

// Imports
import Eris from './node_modules/Eris'

import BotConfig from '../../JSON/BotConfig.json'

import Ytdl from './node_modules/ytdl-core'
import YouTube from './node_modules/simple-youtube-api'

class musicClient {

    constructor(YouTubeApiKey, options = {earProtections: true,loop: false,songChooseTimeout: 10,volume: 100}) {

        this.google_api_key = BotConfig["settings"]["YouTubeApiKey"]; // Api key

        this.youtube = new YouTube(this.google_api_key); //Constructing the api
        
        this.queueList = new Map(); // The queue 
        
        this.settings = {};//settings like volume
        
        if (options.songChooseTimeout) this.settings.songChooseTimeout = options.songChooseTimeout * 1000; else this.settings.songChooseTimeout = 10000; if (options.volume) this.settings.volume = options.volume; else this.settings.volume = 30; // Defining basic settings
        
        this.settings.earProtections = false; // Ear protection from ear rape defaults to false
        
        if (options.loop)
        
        this.settings.loop = options.loop; // If loop is defined, default to option
        
        else
        
        this.settings.loop = false; // Defaults loop to false
    }

    // Runs when the play command is called
    play(msg, searchQuery) {

        return __awaiter(this, void 0, void 0, function* () {

            if (typeof searchQuery !== "string") return console.log("The query provided is not a string");
            
            const youtube = this.youtube    
            const url = searchQuery ? searchQuery.replace(/<(.+)>/g, '$1') : '';
            const voiceChannel = msg.member.voiceChannel;

            if (!voiceChannel) return msg.reply(' ⛔ Join a voice channel to play music !')

            const permissions = voiceChannel.permissionsFor(msg.client.user);

            if (!permissions.has('CONNECT'))return msg.reply(' ⛔ I cannot join the voice channel !')

            if (!permissions.has('SPEAK'))return msg.reply(' ⛔ I cannot speak in this voice channel !')

            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

            const playlist = yield youtube.getPlaylist(url);
            const videos = yield playlist.getVideos();

            let video;

            for (video of Object.values(videos)) {

            const video2 = yield youtube.getVideoByID(video.id);
            yield musicFunctions.handleVideo(this.queueList, video2, msg, voiceChannel, this.settings.volume, this.settings.loop, false, true);
            
            }

            var embed = new discord.RichEmbed()
            .setColor("GREEN")
            .setTimestamp()
            .setDescription(`:white_check_mark: Added playlist **${playlist.title}** to queue`);
            msg.channel.send(embed)
            return
            }
            else {
            try {
            var video = yield youtube.getVideo(url);
            }
            catch (error) {
            try {
            var videos = yield youtube.searchVideos(searchQuery, 10);
            let index = 0;
            var embed = new discord.RichEmbed()
            .setTimestamp()
            .setColor("GREEN")
            .setDescription(`**Search Results**\n\n${videos.map((video2) => { return `${++index} - ${video2.title}`; }).join('\n')}`);
            msg.channel.send(embed)
            try {
            var response = yield msg.channel.awaitMessages((msg2) => { return msg2.content > 0 && msg2.content < 11; }, {
            errors: ['time'],
            maxMatches: 1,
            time: this.settings.songChooseTimeout
            });
            } catch (err) {
            console.error(err);
            return msg.reply(' ⛔ No search selected !')
            }
            const videoIndex = parseInt(response.first().content);
            var video = yield youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
            console.error(err);
            return msg.reply(' ⛔ Could not fetch any search results !')
            }
            }
            return musicFunctions.handleVideo(this.queueList, video, msg, voiceChannel, this.settings.volume, this.settings.loop);
            }
            });
            }
    /**
     * Stops music and remove the music queue.
     *
     * This will also cause the bot to leave the voice channel.
     * @param msg The message object that triggers the command.
     */
            stop(msg) {
            const queue = this.queueList;
            const serverQueue = queue.get(msg.guild.id);
            if (!msg.member.voiceChannel)return msg.reply(' ⛔ Please join a voice channel !')
            if (!serverQueue)return msg.reply(' ⛔ Nothing in the queue !')
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end(" ⛔ Bug?");
            }
    /**
     * Skips the music which the bot is now playing.
     *
     * If this is the last song in the queue,
     * this will also cause the bot to leave the voice channel.
     * @param msg The message object that triggers the command.
     */
             skip(msg) {
             const queue = this.queueList;
             const serverQueue = queue.get(msg.guild.id);
             if (!msg.member.voiceChannel)
             return msg.reply(' ⛔ Please join a voice channel !')
             if (!serverQueue)
             return msg.reply(' ⛔ Nothing in the queue !')
             var embed = new discord.RichEmbed()
             .setColor("GREEN")
             .setTimestamp()
             .setDescription(`:white_check_mark: Skipped the song !`);
             msg.channel.send(embed)
             serverQueue.connection.dispatcher.end(embed);
             }
    /**
     * Displays the music queue.
     * @param msg The message object that triggers the command.
     */
             showQueue(msg) {
             const queue = this.queueList;
             const serverQueue = queue.get(msg.guild.id);
             if (!serverQueue)return msg.reply(' ⛔ Nothing in the queue !')
             var index = 0;
             var songArray = serverQueue.songs.map((song) =>  { return `${++index} - [${song.title}](${song.url})`});
             try { 
             var embed = new discord.RichEmbed().setColor("GREEN").setTimestamp().setDescription(`**${msg.guild.name}'s Queue**\n`+songArray.join('\n'))
             if (index > 20) return message.reply(" ⛔ Can't send whole queue, over "+ index +" songs !")
             msg.channel.send(embed)
             } catch(e) {
             var embed = new discord.RichEmbed().setColor("GREEN").setTimestamp().setDescription(`**${msg.guild.name}'s Queue**\n`+songArray.join('\n'))
             msg.channel.send(embed)
             }
             }
    /**
     * Removes a certain song in the music queue.
     *
     * You cannot remove the first song in the queue with this method.
     * @param msg The message object that triggers the command.
     * @param {number} queueIndex The index for the song in the queue.
     * @example
     * // Song queue :
     * // 1. National Anthem of USSR,
     * // 2. Do you hear the people sing?
     *
     * // I wanted to remove the song "Do you hear the people sing?".
     * musicClient.remove(2)
     * // New song queue :
     * // 1. National Anthem of USSR
     */
    remove(msg, queueIndex) {
        if (!msg.member.voiceChannel) return msg.reply(' ⛔ Please join a voice channel !')
        if (typeof queueIndex !== "number")return msg.reply(" ⛔ Number does not exist !");
        const queue = this.queueList;
        const serverQueue = queue.get(msg.guild.id);
        if (!serverQueue) return msg.reply(' ⛔ Nothing queued !')
        var deleteIndex = queueIndex - 1;
        if (deleteIndex === 0)return msg.reply(` ⛔ Cannot remove that song please use the skip command instead !`)
        var removed = serverQueue.songs.splice(deleteIndex, 1);
        var embed = new discord.RichEmbed()
        .setColor("GREEN")
        .setTimestamp()
        .setDescription(`:white_check_mark: Removed ${removed[0].title} from the queue !`);
        msg.channel.send(embed)
    }
    /**
     * Repeats the first song in queue.
     *
     * Looping the song queue will be disabled upon usage of this command.
     * @param msg The message object that triggers the command.
     */
    repeat(msg) {
        if (!msg.member.voiceChannel)
            return msg.reply(' ⛔ Please join a voice channel !')
        const serverQueue = this.queueList.get(msg.guild.id);
        if (!serverQueue)
            return msg.reply(' ⛔ Nothing queued !')
        if (serverQueue.repeat === false) {
            serverQueue.repeat = true;
        var embed = new discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(":white_check_mark: Enabled repeating !");
        msg.channel.send(embed)
          if (serverQueue.loop === true) {
          serverQueue.loop = false;
          var embed = new discord.RichEmbed()
          .setColor("GREEN")
          .setDescription(":white_check_mark: Disabled repeating !");
        msg.channel.send(embed)
            }
        }
        else {
          serverQueue.repeat = false;
          var embed = new discord.RichEmbed()
          .setColor("GREEN")
          .setDescription(":white_check_mark: Disabled repeating !")
          msg.channel.send(embed)
        }
    }
    /**
     * Loops the whole song queue.
     *
     * Repeat a single song will be disabled upon usage of this command.
     * @param msg The message object that triggers the command.
     */
    loop(msg) {
        if (!msg.member.voiceChannel)
            return msg.channel.send('You are not in a voice channel!').then((m) => {
                return m.delete(10000).catch((reason) => {
                    console.log(`Attempting to delete a deleted message (Which is impossible)`);
                });
            });
        const queue = this.queueList;
        const serverQueue = queue.get(msg.guild.id);
        if (!serverQueue)
            return msg.channel.send('There is nothing playing.').then((m) => {
                return m.delete(10000).catch((reason) => {
                    console.log(`Attempting to delete a deleted message (Which is impossible)`);
                });
            });
        if (serverQueue.loop === false) {
            serverQueue.loop = true;
            msg.channel.send("The song queue is now being looped.").then((m) => {
                return m.delete(10000).catch((reason) => {
                    console.log(`Attempting to delete a deleted message (Which is impossible)`);
                });
            });
            if (serverQueue.repeat === true) {
                serverQueue.repeat = false;
                msg.channel.send("Repeating the first song has been disabled to avoid confusion.").then((m) => {
                    return m.delete(10000).catch((reason) => {
                        console.log(`Attempting to delete a deleted message (Which is impossible)`);
                    });
                });
            }
        }
        else {
            serverQueue.loop = false;
            msg.channel.send("The song queue is no longer being looped.").then((m) => {
                return m.delete(10000).catch((reason) => {
                    console.log(`Attempting to delete a deleted message (Which is impossible)`);
                });
            });
        }
    }
    /**
     * Shuffles the whole music queue.
     * @param msg The message object that triggers the command.
     */
    shuffle(msg) {
        if (!msg.member.voiceChannel)
            return msg.channel.send('You are not in a voice channel!').then((m) => {
                return m.delete(10000).catch((reason) => {
                    console.log(`Attempting to delete a deleted message (Which is impossible)`);
                });
            });
        const queue = this.queueList;
        const serverQueue = queue.get(msg.guild.id);
        if (!serverQueue)
            return msg.channel.send('There is nothing playing.').then((m) => {
                return m.delete(10000).catch((reason) => {
                    console.log(`Attempting to delete a deleted message (Which is impossible)`);
                });
            });
        musicFunctions.shuffleArray(serverQueue.songs);
        var index = 0;
        var songArray = serverQueue.songs.map((song) => { return `**${++index}-** [${song.title}](${song.url})`; });
        musicFunctions.addMusicQueueField(msg, songArray, queue).then((results) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < results.length; i++) {
                yield new Promise((r) => { return setTimeout(r, 500); });
                const element = results[i];
                msg.channel.send(element).then((m) => {
                    return m.delete(30000).catch((reason) => {
                        console.log(`Attempting to delete a deleted message (Which is impossible)`);
                    });
                });
            }
        }));
        msg.channel.send("Song queue has been shuffled.").then((m) => {
            return m.delete(30000).catch((reason) => {
                console.log(`Attempting to delete a deleted message (Which is impossible)`);
            });
        });
    }
    /**
     * Changes the volume of the music.
     *
     * The default volume is 20/100, which is safe to turn the music bot volume in discord to 100%.
     * Tuning up the volume higher than 50 is not recommended.
     *
     * Any negative numbers in the volume will only cause the bot to display current volume.
     *
     * This will NOT cause any performance issues as stated from some music bot developers.
     * @param msg The message object that triggers the command.
     * @param {number} volume A number to change the volume based on 100.
     */
    volume(msg, volume = -1) {
        if (!msg.member.voiceChannel)
            return msg.reply(' ⛔ Please join a voice channel !')
        if (typeof volume !== "number")
            return msg.reply(" ⛔ Please provide a number !")
        var queue = this.queueList;
        const serverQueue = queue.get(msg.guild.id);
        if (!serverQueue)
            return msg.reply(' ⛔ Nothing queued !')
        if (volume > 100)
        var embed = new discord.RichEmbed()
        .setColor("ORANGE")
        .setTimestamp()
        .setDescription(`Warning the volume has been raised above 100 this can damage your ears | :white_check_mark: Volume raised to ${volume}`);
        msg.channel.send(embed)       
        if (volume < 101) 
        var embed2 = new discord.RichEmbed().setColor("GREEN").setTimestamp().setDescription(`:white_check_mark: Set volume to ${volume}`);
        msg.channel.send(embed2)
        serverQueue.volume = volume;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(volume / 100);
    }
    /**
     * Pause the music playback.
     * @param msg The message object that triggers the command.
     */
    pause(msg) {
        if (!msg.member.voiceChannel)
            return msg.reply(' ⛔ Please join a voice channel !')
        const queue = this.queueList;
        const serverQueue = queue.get(msg.guild.id);
        if (serverQueue.playing === true) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            var embed = new discord.RichEmbed()
            .setColor("GREEN")
            .setDescription("Song has been paused");
            return msg.channel.send(embed);
        }
        else {
            return msg.reply(" ⛔ Song is already paused !")
        }
    }
    /**
     * Resumes the music playback.
     * @param msg The message object that triggers the command.
     */
    resume(msg) {
        if (!msg.member.voiceChannel)
            return msg.reply(' ⛔ Please join a voice channel !')
        const queue = this.queueList;
        const serverQueue = queue.get(msg.guild.id);
        if (serverQueue.playing === false) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            var embed = new discord.RichEmbed()
            .setColor("GREEN")
            .setDescription("Resumed song !");
            return msg.channel.send(embed);
        }
        else {
            return msg.reply(" ⛔ The song is already playing !");
        }
    }
    nowPlaying(msg) {
        const queue = this.queueList;
        const serverQueue = queue.get(msg.guild.id);
        if (!serverQueue)
            return msg.channel.send('There is nothing playing.').then((m) => {
                return m.delete(10000).catch((reason) => {
                    console.log(`Attempting to delete a deleted message (Which is impossible)`);
                });
            });
        var embed = new discord_js_1.RichEmbed()
            .setColor("GREEN")
            .setTimestamp()
            .setThumbnail(serverQueue.songs[0].icon)
            .addField(`Now playing in ${msg.guild.name}:`, `[**${serverQueue.songs[0].title}**](${serverQueue.songs[0].url})`)
        return msg.channel.send(embed)
    }
}
exports.musicClient = musicClient;
const musicFunctions = {
    addMusicQueueField(msg, content, queue) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverQueue = queue.get(msg.guild.id);
            var toSendEmbed = [];
            var color = Math.floor(Math.random() * 16777214) + 1;
            let i = 0;
            while (i < content.length) {
                var embed = new discord_js_1.RichEmbed();
                let index = 0;
                while (i < content.length && index < 25) {
                    var list = [];
                    const element0 = content[i];
                    index++;
                    i++;
                    const element1 = content[i];
                    index++;
                    i++;
                    const element2 = content[i];
                    index++;
                    i++;
                    const element3 = content[i];
                    index++;
                    i++;
                    const element4 = content[i];
                    index++;
                    i++;
                    list.push(element0);
                    element1 ? list.push(element1) : console.log("Empty element");
                    element1 ? list.push(element2) : console.log("Empty element");
                    element1 ? list.push(element3) : console.log("Empty element");
                    element1 ? list.push(element4) : console.log("Empty element");
                    if (i < 25) {
                        embed.setTitle(`Song queue for ${msg.guild.name}`);
                        embed.setDescription(`There are ${serverQueue.songs.length} songs in total.`);
                        embed.setAuthor(msg.author.username, msg.author.avatarURL);
                    }
                    embed.setTimestamp();
                    embed.setFooter(`Now playing : ${serverQueue.songs[0].title}`);
                    embed.addField("** **", list.join("\n"));
                    embed.setColor(color);
                }
                toSendEmbed.push(embed);
            }
            return toSendEmbed;
        });
    },
    handleVideo(queueList, video, msg, voiceChannel, musicVolume = 20, loopQueue = false, top = false, playlist = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverQueue = queueList.get(msg.guild.id);
            const song = {
                guild: msg.guild.name,
                icon: video.thumbnails.default.url,
                id: video.id,
                length: {
                    hrs: video.duration.hours,
                    mins: video.duration.minutes,
                    secs: video.duration.seconds
                },
                title: video.title,
                url: `https://www.youtube.com/watch?v=${video.id}`
            };
            if (!serverQueue) {
                var queueConstruct = {
                connection: null,
                loop: loopQueue,
                repeat: false,
                playing: true,
                songs: [],
                textChannel: msg.channel,
                voiceChannel,
                volume: musicVolume
                };
                queueList.set(msg.guild.id, queueConstruct);
                queueConstruct.songs.push(song);
                console.log("Song added to queue.");
                try {
                var connection = yield voiceChannel.join();
                queueConstruct.connection = connection;
                musicFunctions.playMusic(msg.guild, queueConstruct.songs[0], queueList);
                } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                queueList.delete(msg.guild.id);
                return msg.channel.send(`I could not join the voice channel: ${error}`).then((m) => {
                return m.delete(10000).catch((reason) => {
                 console.log(`Attempting to delete a deleted message (Which is impossible)`);
                        });
                    });
                }
            }
            else if (top) {
                serverQueue.songs.splice(1, 0, song);
                if (playlist)
                    return undefined;
                else
                    return msg.channel.send(`✅ **${song.title}** has been added to the top of the queue!`).then((m) => {
                        return m.delete(10000).catch((reason) => {
                            console.log(`Attempting to delete a deleted message (Which is impossible)`);
                        });
                    });
            }
            else {
                serverQueue.songs.push(song);
                if (playlist)
                    return undefined;
                else
                    var embed = new discord.RichEmbed()
                    .setColor("GREEN")
                    .setTimestamp()
                    .setDescription(`✅ **${song.title}** has been added to the queue !`);
                    return msg.channel.send(embed)
            }
            return undefined;
        });
    },
    playMusic(guild, song, queueList) {
        const serverQueue = queueList.get(guild.id);
        try {
            if (!song) {
                serverQueue.voiceChannel.leave();
                queueList.delete(guild.id);
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {
            filter: "audioonly",
            quality: "highestaudio"
        })).on('end', (reason) => {
            if (serverQueue.loop === true) {
                console.log("Song ended, but looped");
                var toPush = serverQueue.songs[0];
                serverQueue.songs.push(toPush);
                serverQueue.songs.shift();
                musicFunctions.playMusic(guild, serverQueue.songs[0], queueList);
            }
            else if (serverQueue.repeat === true) {
                console.log("Song ended, but repeated");
                musicFunctions.playMusic(guild, serverQueue.songs[0], queueList);
            }
            else {
                if (reason === 'Stream is not generating quickly enough.')
                    console.log('Song ended.');
                else
                    console.log(`${reason}`);
                serverQueue.songs.shift();
                musicFunctions.playMusic(guild, serverQueue.songs[0], queueList);
            }
        }).on('error', (error) => { return console.error(error); });
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
        var embed = new discord.RichEmbed()
        .setDescription(`🎶 Start playing: **${song.title}**`)
        .setColor("GREEN")
        .setTimestamp();
        serverQueue.textChannel.send(embed)
    },
    shuffleArray(array) {
        let temp = array[0];
        array.splice(0, 1);
        var i;
        var j;
        var x;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        array.unshift(temp);
        temp = [];
        return array;
    }
};
module.exports = musicClient;