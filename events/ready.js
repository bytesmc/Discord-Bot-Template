const { activity, readyMessage } = require('../config/global');

module.exports = async (bot) => {
    bot.user.setActivity(activity);
    console.log(readyMessage);
}