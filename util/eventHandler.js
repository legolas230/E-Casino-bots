const reqEvent = (event) => require(`./events/${event}`)

module.exports = bot => {
    bot.on("ready", async () => { reqEvent("ready")(bot) });
    bot.on('logs', async(log) => { reqEvent("logging")(log, bot) });
    bot.on("reconnecting", () => reqEvent("reconnecting") (bot));
    bot.on("disconnect", () => reqEvent("disconnect") (bot));
    bot.on("warn", async (warn) => reqEvent("warn")(bot, warn));
    bot.on("error", async (error) => { reqEvent("error")(bot, error) });
}
