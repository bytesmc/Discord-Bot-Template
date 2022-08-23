const Guilds = require('../config/guilds');

module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.channel.type != "GUILD_TEXT") return;

    let guild = Guilds.get(message.guild.id);
    if (!guild) return;
    if (!guild.prefix || guild.prefix.length == 0) return;

    if (message.content.match(new RegExp(`^<@!?${bot.user.id}>`))) return message.reply(`Hey ${message.member}! For a list of commands please use \`${guild.prefix}help\`. Feel free to create a support ticket for additional support.`).catch(console.error);
    if (!message.content.toLowerCase().startsWith(guild.prefix.toLowerCase())) return;

    let args = message.content.slice(guild.prefix.length).split(/ +/);
    let name = args.shift().toLowerCase();
    let command = bot.commands.find(c => c.aliases.includes(name));

    if (!command) return;

    if (command.roles.length != 0) {
        let roles = command.roles.map(role => guild.roles[role]);
        if (!message.member.roles.cache.map(role => role.id).some(id => roles.includes(id))) return message.error('You do not have permission to execute this command.');
    }

    if (command.channels.length != 0) {
        let channels = command.channels.map(channel => guild.channels[channel]);
        if (!channels.includes(message.channel.id) && !message.member.roles.cache.map(role => role.id).some(id => id == guild.roles.owner)) return;
    }

    try {
        command.execute(message, bot, guild, args);
    } catch (err) {
        console.error(`Error executing command '${command.name}'`);
        console.error(err);
    }
}
