module.exports = [
    {
        //  Discord guild id
        id: '',
        theme: '#2f3136',
        prefix: '!',
        footer: '',
        roles: {
            //  Role ids
            owner: '',
            member: ''
        },
        channels: {
            //  Channel ids
            welcome: '',
            suggestions: ''
        },
        emojis: {
            //  Unicode emojis or guild emoji ids
            suggestion_yes: '✔️',
            suggestion_no: '❌'
        }
    }
];

module.exports.get = (id) => {
    return module.exports.find(guild => guild.id == id);
}