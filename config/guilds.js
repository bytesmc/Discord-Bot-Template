module.exports = [
    {
        id: '1011462271286919168',         //  Discord Guild ID
        theme: '#2f3136',
        prefix: '!',
        footer: '',
        roles: {
            owner: '1011464895230914621',
            member: ''
        },
        channels: {
            welcome: '',
            suggestions: '1011467342540181514'
        },
        emojis: {
            suggestion_yes: '✔️',
            suggestion_no: '❌'
        }
    }
];

module.exports.get = (id) => {
    return module.exports.find(guild => guild.id == id);
}