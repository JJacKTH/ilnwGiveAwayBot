const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config.json');

module.exports.run = async(client, message, args) => {

    const embed = new MessageEmbed()
        .setTitle(`Commands of ${client.user.username}`)
        .setColor('#2F3136')
        .setDescription('**กรุณาเลือก หมวดหมู่ เพื่อดูคำสั่งใช้งาน**')
        .addField("Version", "ilnwGiveAway v.1", true)
        .addField("Website", "https://i-lnw.com", true)
        //.addField(`Links:`, `- [Youtube Channel](https://youtube.com/c/Zerosync)\n- [Discord Server](https://discord.gg/ARu4hr6hJw)\n- [GitHub](https://github.com/ZeroDiscord/Giveaway)`, true)
        .setTimestamp()
        .setFooter({
            text: `Requested by ${message.author.username} | GiveawayBot™ v1 By JJacKTH`,
            iconURL: message.author.displayAvatarURL()
        });

    const giveaway = new MessageEmbed()
        .setTitle("Categories » Giveaway")
        .setColor('#2F3136')
        .setDescription("```yaml\nนี่คือ commands สำหรับหัวข้อแจกรางวัล:```")
        /*.addFields({ name: 'Start', value: `เริ่มแจกของรางวัลในกิลด์ของคุณ!\n > **การใช้งาน: !give_start [ชื่อห้อง] [เวลา] [จำนวนผู้เข้าร่วม] [ของรางวัล]**`, inline: true }, { name: 'Edit', value: `แก้ไขการแจกของรางวัลที่กำลังทำงานอยู่!\n > **Types: __\`slash\` / \`message\`__**`, inline: true }, { name: 'End', value: `สิ้นสุดการแจกของรางวัลที่กำลังทำงานอยู่!\n > **Types: __\`slash\` / \`message\`__**`, inline: true }, { name: 'List', value: `รายการแจกของรางวัล ทั้งหมด ที่อยู่ในกิลด์นี้!\n > **Types: __\`slash\` / \`message\`__**`, inline: true }, { name: 'Pause', value: `หยุดการแจกรางวัลชั่วคราว!\n > **Type: __\`slash\`__**`, inline: true }, { name: 'Reroll', value: `สุ่มการแจกของรางวัลที่ สิ้นสุดไปแล้ว อีกครั้ง!\n > **Types: __\`slash\` / \`message\`__**`, inline: true }, { name: 'Resume', value: `กลับมาแจกของรางวัลที่ หยุดพักไว้ชั่วคราว อีกครั้ง!\n > **Type: __\`slash\`__**`, inline: true }, )*/
        .addFields({ name: '!give_start', value: "เริ่มแจกของรางวัลในกิลด์ของคุณ!\n > **การใช้งาน: ```!give_start [ใช้ # แท็กห้อง] [เวลา s m h] [จำนวนผู้เข้าร่วม] [ของรางวัล]```**", inline: true }, { name: '\u200B', value: '\u200B' }, { name: '!give_list', value: "รายการแจกของรางวัล ทั้งหมด ที่อยู่!\n > **การใช้งาน: ``` !give_list และเลือกรายการที่ต้องการดู```**", inline: true }, )

    .setTimestamp()


    .setFooter({
        text: `Requested by ${message.author.username} | ${client.user.username} v1 By JJacKTH`,
        iconURL: message.author.displayAvatarURL()
    });

    const general = new MessageEmbed()
        .setTitle("Categories » General")
        .setColor('#2F3136')
        .setDescription("```yaml\nนี่คือ commands สำหรับหัวข้อทั่วไป:```")
        .addFields({ name: '!give_help', value: `แสดง commands ที่มีอยู่ทั้งหมดสำหรับบอทนี้!\n > **เช่น: __\`!give_help\`__**`, inline: true }, { name: 'invite', value: `รับลิงก์คำเชิญของบอทเข้าเซิฟเวอร์ที่ต้องการ!\n > **เช่น: __\`!give_invite\`__**`, inline: true }, )
        .setTimestamp()
        .setFooter({
            text: `Requested by ${message.author.username} | ${client.user.username} v1 By JJacKTH`,
            iconURL: message.author.displayAvatarURL()
        });

    const components = (state) => [
        new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId("help-menu")
            .setPlaceholder("กรุณาเลือกรายการในเมนูนี้ !!")
            .setDisabled(state)
            .addOptions([{
                    label: `การแจกของรางวัล`,
                    value: `giveaway`,
                    description: `ดูคำสั่ง แจกของรางวัล ทั้งหมด!`,
                    emoji: `🎉`
                },
                {
                    label: `ทั่วไป`,
                    value: `general`,
                    description: `ดูคำสั่ง ทั่วไป ทั่งหมด!`,
                    emoji: `⚙`
                }
            ])
        ),
    ];

    const initialMessage = await message.reply({ embeds: [embed], components: components(false) });

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({
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
    collector.on("end", (collected, reason) => {
        if (reason == "time") {
            initialMessage.edit({
                content: "Collector Destroyed, Try Again!",
                components: [],
            });
        }
    });
}