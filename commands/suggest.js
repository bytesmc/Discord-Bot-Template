const Command = require('../util/command');

module.exports = class extends Command {
    constructor() {
        super(
            "Suggest",
            "Suggest a change to the server",
            "suggest <suggestion>",
            "suggest ban cheaters!",
            ['suggest'],
            [],
            ['suggestions']
        )
    }

    async execute(message, bot, guild, args) {
        if (guild.channels.suggestions) {
            if (args.length == 0) return message.error('You must specify a suggestion!');

            let suggestion = args.join(' ');

            let embed = message.createEmbed()
                .setColor(guild.theme)
                .setTitle('Suggestion')
                .setDescription(suggestion)
                .setFooter({ text: `${message.author.tag}`, iconURL: message.author.avatarURL() });

            let channel = bot.channels.cache.find(c => c.id == guild.channels.suggestions);
            if (!channel) return message.error('Suggestion channel could not be found');

            channel
                .send({ embeds: [embed] })
                .then(m => m.reacts(guild.emojis.suggestion_yes, guild.emojis.suggestion_no))
                .catch(console.error);

            return message.success('Your suggestion has been submitted');
        }
    }
}
