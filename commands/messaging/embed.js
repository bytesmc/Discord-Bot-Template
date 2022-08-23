const Command = require('../../util/command');

module.exports = class extends Command {
    constructor() {
        super(
            "Embed",
            "Send an embed to the specified channel",
            "embed [channel] [-s] <title>\n<description>",
            "embed #general Example Embed\nThis is an example embed.",
            ['embed'],
            ['owner']
        )
    }

    async execute(message, bot, guild, args) {
        if (args.length == 0) return message.error('You must specify a message!');

        let channelId = message.channel.id;

        if (/^<#[0-9]*>$/g.test(args[0])) {
            channelId = message.mentions.channels.first();
            args.shift();
        }

        let channel = bot.channels.cache.find(c => c.id == channelId);
        if (!channel) return message.error('That channel could not be found.');

        let silent = args[0] == '-s';
        if (silent) args.shift();

        let content = args.join(' ').split('\n', 2);
        let embed = message.createEmbed()
            .setColor(guild.theme);

        if (content.length == 2) {
            embed.setTitle(content[0]);
            embed.setDescription(content[1]);
        } else {
            embed.setDescription(content[0]);
        }

        if (!silent) {
            embed.setFooter({ text: `${message.author.tag}`, iconURL: message.author.avatarURL() });
            embed.setTimestamp();
        }

        channel.send({ embeds: [embed], files: Array.from(message.attachments.values()) }).catch(console.error);
    }
}