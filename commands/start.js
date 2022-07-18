const ms = require("ms");
const messages = require("../utils/message");
module.exports.run = async(client, message, args) => {
    // If the member doesn't have enough permissions
    if (!message.member.permissions.has("MANAGE_MESSAGES") &&
        !message.member.roles.cache.some(r => r.name === "Giveaways")
    ) {
        return message.reply(
            ":x: คุณต้องมีสิทธิ์จัดการข้อความเพื่อเริ่มแจกของรางวัล."
        );
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if (!giveawayChannel) {
        return message.reply(":x: คุณต้องเลือก Channel ให้ถูกต้อง!");
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
        return message.reply(":x: คุณต้องระบุ เวลา ให้ถูกต้อง!");
    }

    // Number of winners
    let giveawayNumberWinners = parseInt(args[2]);
    // If the specified number of winners is not a number
    if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
        return message.reply(
            ":x: คุณต้องระบุจำนวน ผู้ชนะ ให้ถูกต้อง ต้องมากกว่า 0 และไม่เกิน 100 คน!"
        );
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(" ");
    // If no prize is specified
    if (!giveawayPrize) {
        return message.reply(":x: คุณต้องระบุ ของรางวัล ให้ถูกต้อง!");
    }
    // Start the giveaway
    await client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        duration: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: parseInt(giveawayNumberWinners),
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages
    });
    message.reply(`กิจกรรมได้เริ่มขึ้นแล้ว ที่ห้อง ${giveawayChannel}!`);
}