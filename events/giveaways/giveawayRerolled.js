const Discord = require("discord.js")
module.exports = {
    async execute(giveaway, winners) {
        winners.forEach((member) => {
            member.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle(`🎁 Let's goo! We Have A New Winner`)
                    .setColor("#2F3136")
                    .setDescription(`สวัสดี ${member.user}\n ฉันได้ยินมาว่าเจ้าของกิจกรรม ซ้ำ แล้ว คุณคือผู้ชนะ **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n วันนี้คือวันของคุณ **${giveaway.prize}!**\nโปรดส่งข้อความหาผู้จัดกิจกรรม เพื่อรับรางวัล!!`)
                    .setTimestamp()
                    .setFooter({
                        text: `${member.user.username}`,
                        iconURL: member.user.displayAvatarURL()
                    })
                ]
            }).catch(e => {})
        });
    }
}