const Command = require('../util/command');

module.exports = class extends Command {
    constructor() {
        super(
            "Purge",
            "Purge messages from a channel",
            "purge <amount>",
            "purge 1",
            ['purge'],
            ['owner']
        )
    }

    async execute(message, bot, guild, args) {
        if (args.length == 0) return message.error('You must specify the amount of messages!');

        let amount = parseInt(args[0]);

        if (amount <= 1) return message.error('Messages must be more than `1`!');
        if (amount >= 100) return message.error('Messages must be less than `100`!');

        message.channel
            .bulkDelete(amount + 1)
            .then(() => message.success(`Purged \`${amount}\` messages.`, true))
            .catch(() => message.error('You cannot purge messages older than 14 days!', true));
    }
}