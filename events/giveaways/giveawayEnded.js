const Discord = require("discord.js")
module.exports = {
    async execute(giveaway, winners) {
        winners.forEach((member) => {
            member.send({
                embeds: [new Discord.MessageEmbed()
                    .setTitle(`🎁 The Winner GiveAway!`)
                    .setColor("#2F3136")
                    .setDescription(`สวัสดี ${member.user}\n ฉันทราบมาว่า คุณชนะ **[[This ilnwGiveAway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n วันนี้เป็นวันที่ดี คุณได้รับ **${giveaway.prize}!**\n\nโปรดส่งข้อความหาเจ้าของกิจกรรม เพื่อรับของรางวัล!!`)
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