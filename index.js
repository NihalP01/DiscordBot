const Discord = require("discord.js");
const config = require("./config.json");


const client = new Discord.Client();

const prefix = "?";

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  //for ping test
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    const userName = message.author.username;
    message.reply(`Pong! Hey ${userName}, I am Alive. Latency: ${timeTaken}ms.`);
  }

  //to get avatar
  else if(command === "photo"){
        const profilePic = message.author.displayAvatarURL();
        message.reply(`Here is your avatar ${profilePic}`)    
  }

  //to kick a member
  else if(command === "kick"){
      const user = message.mentions.users.first();
      if(user){
        const member = message.guild.member(user);
        if(member){
            member.kick('Optional reason')
                  .then(() => {
                      message.reply(`Successfully kicked ${user.tag}`);
                  })
                  .catch(err => {
                      message.reply(`Sorry, I was not able to kick ${user.tag} \n Reason: ${err},`);
                  });
        }else{
            message.reply('That user is not in this guild!');
        }
      }else{
         message.reply('You have not mentioned the user to kick!'); 
      }
  }

  //to ban a member
  else if(command === "ban"){
    const user = message.mentions.users.first();
    if(user){
      const member = message.guild.member(user);
      if(member){
        member.ban({reason: 'Get the fuck off!'})
              .then(()=>{
                message.reply(`Successfully baned ${user.tag}`);
              })
              .catch(err=>{
                message.reply(`Sorry, I was unable to kick ${user.tag}\n Reason: ${err}`);
              })
      }else{
        message.reply('That user is not in this guild');
      }
    }else{
      message.reply('You have not mentioned the user to kick!')
    }
  }

  //
});

client.login(config.BOT_TOKEN);