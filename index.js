/* Coded by NihalP01 */

const Discord = require("discord.js");
const apiKey = "PASTE YOUR BOT TOKEN HERE"
const client = new Discord.Client();
client.login(apiKey);

const prefix = "?";

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  let isBotOwner = message.author.id == 481332163539632130

  //for ping test
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    const userName = message.author.username;
    message.channel.send(`Pong! Hey ${userName}, I am Alive. Latency: ${timeTaken}ms.`);
  }

  //to get avatar
  else if (command === "photo") {
    const profilePic = message.author.displayAvatarURL();
    message.reply(`Here is your avatar ${profilePic}`)
  }

  //to kick a member
  else if (command === "kick") {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason')
          .then(() => {
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            message.reply(`Sorry, I was not able to kick ${user.tag} \n Reason: ${err}`);
          });

      }
      else {
        message.reply('That user is not in this guild!');
      }
    } else {
      message.reply('You have not mentioned the user to kick!');
    }
  }

  //to ban a member
  else if (command === "ban") {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban({ reason: 'Get the fuck off!' })
          .then(() => {
            message.reply(`Successfully baned ${user.tag}`);
          })
          .catch(err => {
            message.reply(`Sorry, I was unable to ban ${user.tag}\n Reason: ${err}`);
          })
      }
      else {
        message.reply('That user is not in this guild');
      }
    } else {
      message.reply('You have not mentioned the user to ban!')
    }
  }

  //to shut down(for bot owner)
  else if (command === "shutdown") {
    if (!isBotOwner) {
      message.reply(`Want a punch?, This is owner only command`);
    } else {
      message.reply('Shutting down....').then(m => {
        client.destroy();
      })
    }
  }

  //to restart
  else if (command === "restart") {
    if (!isBotOwner) {
      message.reply(`Want a punch?, This is owner only command`);
    } else {
      message.reply('Restarting my system...').then(m => {
        client.login(apiKey)
      });
    }
  }

  //to purge some messages
  else if (command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 200) {
      message.channel.send('Please provide the number of messages to delete (2<n<200).');
    } else {
      const fetched = await message.channel.messages.fetch({ limit: deleteCount });
      message.channel.bulkDelete(fetched)
      message.channel.send(`Done! Purged ${deleteCount} messages.`)
        .catch(err => message.reply(`Couldn't delete messages \n Reason: ${err}`))
    }
  }
  
});