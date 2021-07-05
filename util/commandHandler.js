module.exports = async (bot) => {
  bot.on('message', async message => {
    if(message.guild){
      var prefix = await bot.db.get('prefix' + message.guild.id);
    }
    if(!prefix){
      prefix = bot.config.prefix
    }
    var color = `#000000`;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if(!commandfile){ return }
    let getPermissionLevel = (user) => {
      // 0 All, 1 bot mod, 2 bot admin, 3 bot dev, 4 Jeff
      if(bot.config.owners[0] === user.author.id) return 4;
      if(bot.config.owners.includes(user.author.id)) return 3;
      if(bot.config.admins.includes(user.author.id)) return 2;
      if(bot.config.moderators.includes(user.author.id)) return 1;
      return 0;
    }
    let level = await getPermissionLevel(message);

    if (commandfile.config.guildOnly && message.channel.type === 'dm'){
      return message.channel.send('I can\'t execute that command inside DMs!');
    }
    if (commandfile.config.dmsOnly && message.channel.type !== 'dm'){
      return message.channel.send(`Command must be ran in dms.`)
    }
    if (level < commandfile.config.permissionRequired){
      return message.channel.send(`Insufficient permission to run that command.`)
    }
    commandfile.run(bot, message, args, bot.db, prefix, color);
  })
}
