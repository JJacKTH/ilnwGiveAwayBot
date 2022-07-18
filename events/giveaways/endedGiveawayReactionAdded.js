const Discord = require("discord.js")
module.exports = {
    async execute(giveaway, member, reaction) {
        reaction.users.remove(member.user);
        member.send(`** ❌แย่จัง ดูเหมือนว่ากิจกรรมได้จบลงแล้ว!❌**`).catch(e => {})
    }
}