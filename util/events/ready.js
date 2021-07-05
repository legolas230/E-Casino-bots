const Discord = require("discord.js")

module.exports = async (bot) => {
	console.log('Ready!')
	// Status of bot
	const status = `status`;
	// Ready embed(with information)
	// Gets the channel
	bot.channels.cache.get(bot.config.channels.ready).send('', {
		embed: new Discord.MessageEmbed()
		.setTitle("Bot ready!")
		.addField("Cached servers:", bot.guilds.cache.size)
		.addField("Cached user amount:", bot.users.cache.size)
		.addField("Status:", status)
		.addField("Client user:", bot.user)
		.setTimestamp()
	})
	// Set the presence to online
	bot.user.setPresence({ status: "online"})
		.catch(console.error);
	// Set the status
	bot.user.setActivity(status, { type: 'WATCHING' })
		.then(presence => console.log(`Activity set to ${presence.activities[0].name} and set status to online!`))
		.catch(console.error);
	// Keeps the status updated
	setInterval(() => {
			bot.user.setActivity(status, { type: 'WATCHING' })
			.catch(console.error);
	}, 60000); // Runs this every 1 minutes.
}
