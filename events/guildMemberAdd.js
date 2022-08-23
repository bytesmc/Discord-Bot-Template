const { MessageEmbed } = require('discord.js');
const Guilds = require('../config/guilds');

module.exports = async (bot, member) => {
    let guild = Guilds.get(member.guild.id);
    if (!guild) return;

    if (guild.roles.member) {
        let role = member.guild.roles.cache.find(role => role.id == guild.roles.member);
        if (role) member.roles.add(role).catch(console.error);
    }

    if (guild.channels.welcome) {
        let channel = member.guild.channels.cache.find(channel => channel.id == guild.channels.welcome);
        if (!channel) return;
    
        let embed = new MessageEmbed()
            .setColor(guild.theme)
            .setDescription(`Welcome to **${member.guild.name}**, <@${member.user.id}>`)
            .setAuthor({
                name: `${member.user.tag}`,
                iconURL: member.user.avatarURL()
            })
            .setFooter({ text: guild.footer })
            .setTimestamp()
    
        channel.send({ embeds: [embed] }).catch(console.error);
    }
}