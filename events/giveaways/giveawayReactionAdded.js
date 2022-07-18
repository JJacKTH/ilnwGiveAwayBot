const Discord = require("discord.js")
module.exports = {
    async execute(giveaway, reactor, messageReaction) {
        let approved = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor("#2F3136")
            .setTitle("คุณได้ร่วมกิจกรรมแล้ว! | คุณมีโอกาสที่จะชนะ!!")
            .setDescription(
                `การเข้าร่วม [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) คุณได้รับการอนุมัติแล้ว!`
            )
            .setFooter({ text: "By.i-lnw.com!" })
            .setTimestamp()
        let denied = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor("#2F3136")
            .setTitle(":x: รายการถูกปฏิเสธ | ไม่พบรายการดังกล่าว!")
            .setDescription(
                `รายการของคุณ [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) ถูกปฏิเสธ กรุณาตรวจสอบข้อกำหนดในการแจกให้ถูกต้อง.`
            )
            .setFooter({ text: "By.i-lnw.com!" })

        let client = messageReaction.message.client
        if (reactor.user.bot) return;
        if (giveaway.extraData) {
            if (giveaway.extraData.server !== "null") {
                try {
                    await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
                    return reactor.send({
                        embeds: [approved]
                    });
                } catch (e) {
                    messageReaction.users.remove(reactor.user);
                    return reactor.send({
                        embeds: [denied]
                    }).catch(e => {})
                }
            }
            if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)) {
                messageReaction.users.remove(reactor.user);
                return reactor.send({
                    embeds: [denied]
                }).catch(e => {})
            }

            return reactor.send({
                embeds: [approved]
            }).catch(e => {})
        } else {
            return reactor.send({
                embeds: [approved]
            }).catch(e => {})
        }
    }
}