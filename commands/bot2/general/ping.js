const Discord = require("discord.js");

module.exports.run = async (bot, message, args, db, prefix, color) => {
  message.channel.send("Pinging...").then(m => {
    let ping = m.createdTimestamp - message.createdTimestamp
    let choices = ["Your ping is:", "Your ping:", "Heres your ping:", "Ping:", "Bot Ping:"]
    let response = choices[Math.floor(Math.random() * choices.length)]

    m.edit(`${response} Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ws.ping)}\``)
  })
}
module.exports.config = {
    name: "ping",
    description: "Shows information about this tool",
    usage: "ping",
    aliases: [ 'latency' ],
    guildOnly: false,
    dmsOnly: false,
    permissionRequired: 0, // 0 All, 1 bot mod, 2 bot admin, 3 bot dev
}
