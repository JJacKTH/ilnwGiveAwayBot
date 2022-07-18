const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: '🏓ตรวจสอบสถานะเซิฟเวอร์!',
    run: async(client, interaction) => {
        let pembed = new MessageEmbed()
            .setColor('#2F3136')
            .setTitle('Client Ping')
            .addField('**เวลาในการตอบสนอง**', `\`${Date.now() - interaction.createdTimestamp}ms\``)
            .addField('**เวลาในการตอบสนอง API**', `\`${Math.round(client.ws.ping)}ms\``)
            .setTimestamp()
            .setFooter({
                text: `${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            })
        interaction.reply({
            embeds: [pembed]
        });
    },
};