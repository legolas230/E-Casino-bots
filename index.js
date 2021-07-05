// Creating client and require discord
const Discord = require('Discord.js');
const bot1 = new Discord.Client({ disableMentions: 'everyone' });
const bot2 = new Discord.Client({ disableMentions: 'everyone' });
// General requirements
const enmap = require('enmap');
require('./util/eventHandler.js')(bot1)
require('./util/eventHandler.js')(bot2)
require('./util/commandParser1.js')(bot1)
require('./util/commandParser2.js')(bot2)
// Database
const db = new enmap({
  name: "db",
  cloneLevel: "deep",
  fetchAll: true,
  autoFetch: true
});
// Configs, functions, bot, etc
const config = require('./util/config.js');
// Bot 1
const token1 = config.bot1.token;
bot1.config = config.bot1;
bot1.db = db;
bot1.commands = new Discord.Collection();
bot1.aliases = new Discord.Collection();
// Bot 2
const token2 = config.bot2.token;
bot2.config = config.bot2;
bot2.db = db;
bot2.commands = new Discord.Collection();
bot2.aliases = new Discord.Collection();

// Command handler
require('./util/commandHandler.js')(bot1)
require('./util/commandHandler.js')(bot2)

// Logging the bots in
bot1.login(token1)
bot2.login(token2)
