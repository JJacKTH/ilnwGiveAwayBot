const Discord = require("discord.js")

module.exports = {
    name: 'list',
    description: '🎉 รายการ กิจกรรม.',
    run: async(client, interaction) => {
        const select = new Discord.MessageSelectMenu().setCustomId("select").setPlaceholder("เลือกประเภทกิจกรรมเพื่อดู!").addOptions([{
                label: '🎉 กิจกรรม ปกติ',
                description: 'ตรวจสอบกิจกรรมปกติที่ดำเนินการอยู๋!',
                value: 'normal',
            },
            {
                label: "⚙ กิจกรรมตามความต้องการ!",
                description: "ตรวจสอบกิจตามความต้องการที่ดำเนินการอยู๋!",
                value: "guildReq"
            },
        ])
        const row = new Discord.MessageActionRow().addComponents([select])
        let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildId === `${interaction.guild.id}` && !g.ended);
        if (!giveaways.some(e => e.messageId)) {
            return interaction.reply('💥 ไม่มีกิจกรรม ที่จะแสดง')
        }
        const msg = await interaction.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("เลือกตัวเลือกในเมนูเลือกเพื่อเริ่มต้น!!").setColor("#2F3136").setTimestamp()], components: [row] })
        let embed = new Discord.MessageEmbed()
            .setTitle("กิจกรรมที่ดำเนินการอยู่ในปัจจุบัน")
            .setColor("#2F3136")
            .setFooter({
                text: `ทำรายการโดย ${interaction.user.username} | ${client.user.username} v1 By i-lnw.com`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
        let embedGuild = new Discord.MessageEmbed()
            .setTitle("Currently Active Join Requirement Giveaways")
            .setColor("#2F3136")
            .setFooter({
                text: `ทำรายการโดย ${interaction.user.username} | ${client.user.username} v1 By i-lnw.com`,
                iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
        const filter = x => x.customId == "select" && x.user.id == interaction.member.id
        const collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000, max: 1 })
        await interaction.deferReply()
        collector.on("collect", async(i) => {
            const val = i.values[0]
            if (val == "normal") {
                await Promise.all(giveaways.map(async(x) => {
                    embed.addField(`กิจกรรมปกติ:`, `**รางวัล:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})\nเริ่ม: ** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**สิ้นสุด: ** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
                }));
                msg.delete()
                interaction.editReply({ embeds: [embed], components: [] })
            }
            if (val == "guildReq") {
                if (val == "guildReq") {
                    if (!giveaways.some(e => e.extraData)) {
                        interaction.editReply({ content: '💥 ไม่มีกิจกรรมที่ต้องการจะแสดง', embeds: [], components: [] })
                        msg.delete()
                        return
                    }
                }
                await Promise.all(giveaways.map(async(x) => {
                    if (x.extraData) {
                        const guild = client.guilds.cache.get(x.extraData.server)
                        const channel = guild.channels.cache
                            .filter((channel) => channel.type === 'text')
                            .first()
                        const inv = await channel.createInvite()
                        embedGuild.addField(`ร่วมกิจกรรม:`, `**รางวัล: ** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})**\n**ต้องการ: [This Server](${inv})**\n**เริ่ม: ** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**สิ้นสุด: ** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
                    }
                }));
                msg.delete()
                interaction.editReply({ embeds: [embedGuild], components: [] })

            }
        })
        collector.on("end", (collected, reason) => {
            if (reason == "time") {
                interaction.editReply({ content: "👀 Collector Destroyed, Try Again!", components: [] })
            }
        })
    },
};