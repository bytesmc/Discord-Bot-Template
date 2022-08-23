module.exports = class {
    /**
     * Command will automatically register if inside ../commands
     * 
     * @param {string} name         
     * @param {string} description  
     * @param {string} usage        
     * @param {string} example      Example usage of the command
     * @param {string[]} aliases    Non-null list of lowercase command aliases
     * @param {string[]} roles      Allow-list of role names, translated using guild's 'roles' object
     * @param {string[]} channels   Allow-list of channel names, translated using guild's 'channels' object
     * @param {boolean} hidden      Show the command in the help menu
     */
    constructor(name = "", description = "", usage = "", example = "", aliases = [], roles = [], channels = [], hidden = false) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.example = example;
        this.aliases = aliases;
        this.roles = roles;
        this.channels = channels;
        this.hidden = hidden;
        console.log(`Registered command '${this.name}'`);
    }

    /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.Client} bot
     * @param {object} guild    Guild from '../config/guilds.js'
     * @param {string[]} args   Command arguments, excluding command alias
     */
    execute(message, bot, guild, args) {
        throw new Error('Command implementation requires an \'execute\' method.');
    }
}