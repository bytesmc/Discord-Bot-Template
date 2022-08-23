const { Message, MessageEmbed } = require('discord.js');
const { colors } = require('../../config/global');

Message.prototype.createEmbed = () => {
    return new MessageEmbed();
};

Message.prototype.reacts = async function (...reactions) {
    reactions.forEach(reaction => this.react(reaction).catch(console.error));
}

Message.prototype.warn = async function (message, channel = false) {
    this.embedReply(
        new MessageEmbed()
            .setColor(colors.warn)
            .setDescription('⚠️ ' + message),
        true,
        10000,
        channel
    );
}

Message.prototype.error = async function (message, channel = false) {
    this.embedReply(
        new MessageEmbed()
            .setColor(colors.error)
            .setDescription('❌ ' + message),
        true,
        10000,
        channel
    );
}

Message.prototype.success = async function (message, channel = false) {
    this.embedReply(
        new MessageEmbed()
            .setColor(colors.success)
            .setDescription('✔️ ' + message),
        true,
        10000,
        channel
    );
}

Message.prototype.embedReply = async function (embed, notify = true, ttl = 0, channel = false) {
    if (channel) {
        this.channel.send({
            content: notify ? this.author.toString() : '',
            embeds: [embed]
        })
        .then(msg => ttl > 0 && setTimeout(() => msg.delete().catch(console.error), ttl))
        .catch(console.error);

        return;
    }


    this
        .reply({
            embeds: [embed],
            allowedMentions: { repliedUser: notify }
        })
        .then(msg => ttl > 0 && setTimeout(() => msg.delete().catch(console.error), ttl))
        .catch(console.error);
}