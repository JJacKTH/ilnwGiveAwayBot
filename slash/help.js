const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: 'help',
    description: '📜 ดูคำสั่งทั้งหมดที่ Bot ใช้งานได้!',
    run: async(client, interaction) => {
        const embed = new MessageEmbed()
            .setTitle(`Commands of ${client.user.username}`)
            .setColor('#2F3136')
            .setDescription('**กรุณาเลือกหมวดหมู่เพื่อดูคำสั่งทั้งหมด**')
            //.addField(`Links:`, `- [Youtube Channel](https://youtube.com/c/Zerosync)\n- [Discord Server](https://discord.gg/ARu4hr6hJw)\n- [GitHub](https://github.com/ZeroDiscord/Giveaway)`, true)
            .setTimestamp()
            .setFooter({
                text: `ทำรายการโดย ${interaction.user.username} | ${client.user.username} v1 By i-lnw.com`,
                iconURL: interaction.user.displayAvatarURL()
            })

        const giveaway = new MessageEmbed()
            .setTitle("Categories » กิจกรรม")
            .setColor('#2F3136')
            .setDescription("```yaml\nนี่คือคำสั่ง กิจกรรมทั้งหมด:```")
            .addFields({ name: '/start', value: `คำสั่งนี้ใช้เริ่มกิจกรรม สุ่ม / แจกของ!\n > **Types: __\`slash\` / \`message\`__**`, inline: true }, { name: '/list', value: `เรียกดูรายการกิจกรรมทั้งหมด ที่กำลังดำเนินการ\n > **Types: __\`slash\` / \`message\`__**`, inline: true }, )
            .setTimestamp()
            .setFooter({
                text: `ทำรายการโดย ${interaction.user.username} | ${client.user.username} v1 By i-lnw.com`,
                iconURL: interaction.user.displayAvatarURL()
            })

        const general = new MessageEmbed()
            .setTitle("Categories » ทั่วไป")
            .setColor('#2F3136')
            .setDescription("```yaml\nนี่คือคำสั่ง ทั่วไปทั้งหมด:```")
            .addFields({ name: '/help', value: `แสดง การช่วยเหลือทั้งหมด!\n > **Types: __\`slash\` / \`message\`__**`, inline: true }, { name: '/invite', value: `ลิงค์เชิญบอท!\n > **Types: __\`slash\` / \`message\`__**`, inline: true }, { name: 'ping', value: `เช็คสถานะการทำงานของบอท!\n > **Types: __\`slash\` / \`message\`__**`, inline: true }, )
            .setTimestamp()
            .setFooter({
                text: `ทำรายการโดย ${interaction.user.username} | ${client.user.username} v1 By i-lnw.com`,
                iconURL: interaction.user.displayAvatarURL()
            })

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("กรุณาเลือกหมวดหมู่")
                .setDisabled(state)
                .addOptions([{
                        label: `กิจกรรม`,
                        value: `giveaway`,
                        description: `เลือกรายการนี้เมื่อต้องการดูคำสั่งการทำงานต่างๆ!`,
                        emoji: `🎉`
                    },
                    {
                        label: `ทั่วไป`,
                        value: `general`,
                        description: `เลือกรายการนี้เมื่อต้องการดูคำสั่งการทำงานต่างๆ!`,
                        emoji: `⚙`
                    }
                ])
            ),
        ];

        const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });

        const filter = (interaction) => interaction.user.id === interaction.member.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
            idle: 300000,
            dispose: true,
        });

        collector.on('collect', (interaction) => {
            if (interaction.values[0] === "giveaway") {
                interaction.update({ embeds: [giveaway], components: components(false) }).catch((e) => {});
            } else if (interaction.values[0] === "general") {
                interaction.update({ embeds: [general], components: components(false) }).catch((e) => {});
            }
        });
        collector.on('end', (collected, reason) => {
            if (reason == "time") {
                initialMessage.edit({
                    content: "Collector Destroyed, Try Again!",
                    components: [],
                });
            }
        })
    }
}