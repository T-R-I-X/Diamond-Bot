import { Utils } from 'axoncore';

class BotUtils extends Utils {
    constructor(...args) {
        super(...args);
        this.invite = /^(discord.gg\/|discordapp.com\/invite\/)([a-z0-9]+)$/gi;
    }

    // Converts Hex value to a RGB value
    hexTOrgb(hex) {
        let num = hex.replace('#', '');
        num = parseInt(num, 16);
        return [num >> 16, num >> 8 & 255, num & 255]; 
    }

    // Converts RGB to a Hex value
    rgbTOhex(red, green, blue) {
        return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1); 
    }

    // Converts a Number to a String
    numberTOstring(number) {
        return number.toString()
    }

    // Converts a String to a Int
    stringTOint(string) {
        return parseInt(string)
    }

    // Filter
    msgfilter(Filters,msg) {
        if (Filters.has("DiscordLink")) {
           if (msg.includes(this.invite)) {
               msg:Delete()
           }
            return
        } 
         return
    }
    
}

export default BotUtils;