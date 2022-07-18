const Discord = require("discord.js")
module.exports = {
    async execute(giveaway, member) {
        return member.send({
            embeds: [new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle('❓ เดี๋ยวก่อน คุณเพิ่งลบ Emoji ออกจากกิจกรรมใช่ไหม?')
                .setColor("#2F3136")
                .setDescription(
                    `ไปยัง [This ilnwGiveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) ในเมื่อคุณไม่ต้องการ **${giveaway.prize}** ก็ต้องเลือกคนอื่น 😭`
                )
                .setFooter({ text: "คิดว่ามันเป็นความผิดพลาด? ไปร่วมกิจกรรมอีกครั้ง!" })
            ]
        }).catch(e => {})

    }
}