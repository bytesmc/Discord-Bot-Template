const Command = require('../../util/command');

module.exports = class extends Command {
    constructor() {
        super(
            "Sudo",
            "Send a message as the bot",
            "sudo [channel] <message>",
            "sudo #general hi",
            ['sudo'],
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

        let files = Array.from(message.attachments.values());
        let content = args.join(' ');

        if (content == '') {
            channel.send({ files }).catch(console.error);
        } else {
            channel.send({ content, files }).catch(console.error);
        }
    }
}