const fs = require('fs');

module.exports = bot => {
  fs.readdir("./commands/bot2/general/", (err, files) => {
    if (err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) { return console.log("[LOGS] Couldn't find bot2 commands!") }

    jsfile.forEach((f, i) => {
      let pull = require(`../commands/bot2/general/${f}`);
      bot.commands.set(pull.config.name, pull);
      pull.config.aliases.forEach(alias => {
        bot.aliases.set(alias, pull.config.name)
      });
    })
  });
}
