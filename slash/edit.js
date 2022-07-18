module.exports = {
    name: 'edit',
    description: '🎉 แก้ไขการแจกของรางวัล',

    options: [{
            name: 'giveaway',
            description: 'ชื่อของรางวัล หลังจบ(message ID)',
            type: 'STRING',
            required: true
        },
        {
            name: 'duration',
            description: 'กำหนดเวลาในการแจกของรางวัล เช่น 30s = 30วินาที , 1m = 1นาที , 1h = 1ชั่วโมง!',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'กำหนดจำนวนผู้ชนะ',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'กำหนดของรางวัลที่จะทำการแจก',
            type: 'STRING',
            required: true
        }
    ],

    run: async(client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: คุณต้องมีสิทธิ์จัดการข้อความเพื่อเริ่มแจกของรางวัล.',
                ephemeral: true
            });
        }
        const gid = interaction.options.getString('giveaway');
        const time = interaction.options.getString('duration');
        const winnersCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');

        await interaction.deferReply({
                ephemeral: true
            })
            // Edit the giveaway
        try {
            await client.giveawaysManager.edit(gid, {
                newWinnersCount: winnersCount,
                newPrize: prize,
                addTime: time
            })
        } catch (e) {
            return interaction.editReply({
                content: `ไม่พบ ID ของรางวัล: \`${gid}\` ที่ระบุ`,
                ephemeral: true
            });
        }
        interaction.editReply({
            content: `ของรางวัลนี้ได้รับการแก้ไขแล้ว!`,
            ephemeral: true
        });
    }

};