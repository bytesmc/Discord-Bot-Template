const { execSync } = require('child_process');
const { Client, Collection } = require('discord.js');
const getFiles = require('./util/getFiles');

const bot = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS']
});

(async () => {
    try {
        let remote = execSync('git config --get remote.origin.url').toString().trim();
        let branch = execSync('git symbolic-ref --short HEAD').toString().trim();
        let revision = execSync('git rev-parse HEAD').toString().trim();
    
        console.log({ remote, branch, revision });
    } catch (err) {
        console.log('Remote/Branch/Rev Unknown');
    }

    bot.commands = new Collection();

    getFiles('./events', (name, path) => bot.on(name, require(`${path}`).bind(null, bot)))
    getFiles('./commands', (name, path) => bot.commands.set(name, new (require(`${path}`))()));
    getFiles('./util/extend', (name, path) => require(path));
    
    bot.login(process.env.DISCORD_TOKEN);
})();