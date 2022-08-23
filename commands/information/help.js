const Command = require('../../util/command');

module.exports = class extends Command {
    constructor() {
        super(
            "Help",
            "Displays command information",
            "help <command>",
            "help help",
            ['help'],
            [],
            [],
            true
        )
    }

    async execute(message, bot, guild, args) {
        if (args.length == 0) {
            let embed = message.createEmbed()
                .setColor(guild.theme)
                .setTitle('Available Commands')
                .setFooter({ text: guild.footer });

            bot.commands.filter(command => !command.hidden).forEach(command => embed.addFields({ name: command.name, value: command.description, inline: true }));

            return message.embedReply(embed);
        }

        let name = args[0];
        let command = bot.commands.get(name) || bot.commands.find(c => c.aliases.includes(name));
        if (!command) return message.error('Command could not be found.');

        let description = `
        \`description:\` ${command.description}
        \`usage:\` ${command.usage}
        \`example:\`\n${command.example}
        \`aliases:\` ${command.aliases.join(', ')}`

        if (command.roles.length > 0) {
            let roles = command.roles.map(role => guild.roles[role]);
            description += `\n\`roles:\` ${message.guild.roles.cache.filter(role => roles.includes(role.id)).map(role => `<@&${role.id}>`).join(', ')}`
        }

        if (command.channels.length > 0) {
            description += `\n\`channels:\` ${message.guild.channels.cache.filter(channel => command.channels.includes(channel.id)).map(channel => `<#${channel.id}>`).join(', ')}`
        }

        let embed = message.createEmbed()
            .setColor(guild.theme)
            .setTitle(command.name)
            .setDescription(description)
            .setFooter({ text: guild.footer });

        return message.embedReply(embed);
    }
}