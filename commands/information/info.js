const Command = require('../../util/command');

module.exports = class extends Command {
    constructor() {
        super(
            "Information",
            "Displays server information",
            "info",
            "info",
            ['info', 'serverinfo']
        )
    }

    async execute(message, bot, guild, args) {
        let owner = await message.guild.fetchOwner();

        let embed = message.createEmbed()
            .setColor(guild.theme)
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: 'Owner', value: `<@${owner.id}>`, inline: true },
                { name: 'Server ID', value: message.guild.id, inline: true },
                { name: 'Member Count', value: message.guild.memberCount.toString(), inline: true }
            )
            .setFooter({ text: guild.footer });

        return message.embedReply(embed);
    }
} 