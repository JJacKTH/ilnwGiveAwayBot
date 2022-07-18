const Discord = require("discord.js")
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
    name: 'start',
    description: '🎉 เริ่มกิจกรรม สุ่มของ / แจกของ จะทำอะไรก็ได้ เป็นบอทช่วย Random ชื่อคนที่ร่วมกิจกรรม',

    options: [{
            name: 'channel',
            description: 'กรอก # ตามด้วยชื่อห้องที่ต้องการให้กิจกรรมที่กำหนดแสดง',
            type: 'CHANNEL',
            required: true
        },
        {
            name: 'duration',
            description: 'ระบุเวลาของกิจกรรมที่สร้างขึ้น ตัวอย่าง 1s, 1m, 1h, 1d คือ 1วินาที 1นาที 1ชั่วโมง 1วัน',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'กรอกจำนวนผู้ชนะ ห้ามต่ำกว่า 0 และมากกว่า 100',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'ชื่อของรางวัล หรือ กิจกรรมต่างๆ ',
            type: 'STRING',
            required: true
        },
        {
            name: 'bonusrole',
            description: 'ยศที่จะได้รับหลังจากที่ ชนะ',
            type: 'ROLE',
            required: false
        },
        {
            name: 'bonusamount',
            description: 'จำนวนโบนัสของยสที่ชนะจะได้รับ กรอกเป็นตัวเลขเท่านั้น',
            type: 'INTEGER',
            required: false
        },
        {
            name: 'invite',
            description: 'คำเชิญของเซิฟเวอร์ที่กำหนด ในการเข้าร่วมแจกของรางวัล',
            type: 'STRING',
            required: false
        },
        {
            name: 'role',
            description: 'ยศที่กำหนดเท่านั้น ถึงจะสามารถเล่นกิจกรรมได้',
            type: 'ROLE',
            required: false
        },
    ],

    run: async(client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: คุณต้องมีสิทธิ์จัดการข้อความเพื่อเริ่มแจกของรางวัล.',
                ephemeral: true
            });
        }

        const giveawayChannel = interaction.options.getChannel('channel');
        const giveawayDuration = interaction.options.getString('duration');
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');

        if (!giveawayChannel.isText()) {
            return interaction.reply({
                content: ':x: กรุณาเลือก text channel!',
                ephemeral: true
            });
        }
        if (isNaN(ms(giveawayDuration))) {
            return interaction.reply({
                content: ':x: โปรดกรอก เวลากิจกรรม ให้ถูกต้อง!',
                ephemeral: true
            });
        }
        if (giveawayWinnerCount < 1) {
            return interaction.reply({
                content: ':x: จำนวนผุ้ชนะต้องมากกว่า 0.',
            })
        }

        const bonusRole = interaction.options.getRole('bonusrole')
        const bonusEntries = interaction.options.getInteger('bonusamount')
        let rolereq = interaction.options.getRole('role')
        let invite = interaction.options.getString('invite')

        if (bonusRole) {
            if (!bonusEntries) {
                return interaction.reply({
                    content: `:x: คุณต้องระบุ ${bonusRole} เพื่อรับ!`,
                    ephemeral: true
                });
            }
        }


        await interaction.deferReply({ ephemeral: true })
        let reqinvite;
        if (invite) {
            let invitex = await client.fetchInvite(invite)
            let client_is_in_server = client.guilds.cache.get(
                invitex.guild.id
            )
            reqinvite = invitex
            if (!client_is_in_server) {
                return interaction.editReply({
                    embeds: [{
                        color: "#2F3136",
                        author: {
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        },
                        title: "Server Check!",
                        //url: "https://youtube.com/c/ZeroSync",
                        description: "ว้าว ว้าว ว้าว! ฉันเห็นเซิร์ฟเวอร์ใหม่! คุณแน่ใจหรือว่าฉันอยู่ในนั้น คุณต้องเชิญฉันไปที่นั่นเพื่อกำหนดสิ่งนั้นเป็นข้อกำหนด! 😳",
                        timestamp: new Date(),
                        footer: {
                            iconURL: client.user.displayAvatarURL(),
                            text: "Server Check"
                        }
                    }]
                })
            }
        }

        if (rolereq && !invite) {
            messages.inviteToParticipate = `**กด Emoji 🎉 เพื่อร่วมกิจกรรม!**\n>>> - เฉพาะสมาชิกที่มียศ ${rolereq} เท่านั้นที่จะอนุญาติให้เข้าร่วมกิจกรรม!!`
        }
        if (rolereq && invite) {
            messages.inviteToParticipate = `**กด Emoji 🎉 เพื่อร่วมกิจกรรม!**\n>>> - เฉพาะสมาชิกที่มียศ ${rolereq} เท่านั้นที่จะอนุญาติให้เข้าร่วมกิจกรรม!\n- คุณต้องเข้าร่วม [this server](${invite}) เพื่อเล่นกิจกรรม!`
        }
        if (!rolereq && invite) {
            messages.inviteToParticipate = `**กด Emoji 🎉 เพื่อร่วมกิจกรรม!**\n>>> - คุณต้องเข้าร่วม [this server](${invite}) เพื่อเล่นกิจกรรม!`
        }


        // start giveaway
        client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            duration: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: parseInt(giveawayWinnerCount),
            // BonusEntries If Provided
            bonusEntries: [{
                // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
                bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
                cumulative: false
            }],
            // Messages
            messages,
            extraData: {
                server: reqinvite == null ? "null" : reqinvite.guild.id,
                role: rolereq == null ? "null" : rolereq.id,
            }
        });
        interaction.editReply({
            content: `กิจกรรมได้เริ่มขึ้นแล้ว ที่ช่อง ${giveawayChannel}!`,
            ephemeral: true
        })

        if (bonusRole) {
            let giveaway = new Discord.MessageEmbed()
                .setAuthor({ name: `แจ้งเตือน โบนัสพิเศษ!` })
                .setDescription(
                    `**${bonusRole}** มี **${bonusEntries}** พิเศษในกิจกรรมครั้งนี้!`
                )
                .setColor("#2F3136")
                .setTimestamp();
            giveawayChannel.send({ embeds: [giveaway] });
        }

    }

};