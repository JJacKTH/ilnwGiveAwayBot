const config = require('../config.json');
module.exports = {
    giveaway: (config.everyoneMention ? "@everyone\n\n" : "") +
        "🎉 **กิจกรรมแจกของรางวัล** 🎉",
    giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "") +
        "🎉 **กิจกรรมแจกของรางวัล สิ้นสุดแล้ว** 🎉",
    drawing: `สิ้นสุด: **{timestamp}**`,
    inviteToParticipate: `กด Emoji 🎉 เพื่อร่วมกิจกรรม!`,
    winMessage: "ยินดีด้วย, {winners}! วันนี้เป็นวันที่ดีของคุณ คุณได้รับ **{this.prize}**!",
    embedFooter: "แจกของรางวัล",
    noWinner: "ยกเลิกกิจกรรมแจกรางวัล ไม่มีผู้เข้าร่วมกิจกรรม.\n",
    hostedBy: "🎫 เจ้าของกิจกรรม: {this.hostedBy}",
    winners: "🥳 ผู้ชนะ : ",
    endedAt: "สิ้นสุด"
}