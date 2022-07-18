const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'invite',
    description: '➕ เชิญบอทเข้าเซิฟ!',
    run: async(client, interaction) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel(`เชิญ ${client.user.username}`)
                .setStyle('LINK')
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
                new MessageButton()
                .setLabel('ซัพพอร์ต Bot')
                .setStyle('LINK')
                .setURL("https://i-lnw.com"),
            )
        let invite = new MessageEmbed()
            .setAuthor({
                name: `เชิญ ${client.user.username}`,
                iconURL: client.user.displayAvatarURL()
            })
            .setTitle("ลิงค์เชิญBot & ซัพพอร์ต Bot!")
            .setDescription(`เชิญ ${client.user} ไปยังเซิร์ฟเวอร์ของคุณวันนี้ & เพลิดเพลินกับการแจกของรางวัลที่ไร้รอยต่อด้วยคุณสมบัติขั้นสูง!`)
            .setColor('#2F3136')
            .setTimestamp()
            .setFooter({
                text: `ทำรายการโดย ${interaction.user.username} | ${client.user.username} v1 By i-lnw.com`,
                iconURL: interaction.user.displayAvatarURL()
            })

        interaction.reply({ embeds: [invite], components: [row] });
    }
}