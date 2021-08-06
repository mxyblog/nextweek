const cloud = require('wx-server-sdk');
// 云函数入口函数
// todo: 查询条数限制，最大1000
// https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/collection/Collection.limit.html
// 有人实际测试可以最大 10000
// https://developers.weixin.qq.com/community/develop/article/doc/000624c67c8b48611dba2b12058c13
// 1w条都不够用的话，可以先count，然后在limit之前加上skip
// db.collection('messages')
// .where({
//   done: true
// })
// .count()

exports.main = async (event, context) => {
    cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
    const db = cloud.database();
    const $ = db.command.aggregate;


    try {
        const messages = await db.collection('messages')
            .aggregate()
            // .match({
            //     done: false,
            // })
            // .skip(20 * (pageNum - 1))
            .limit(10000)
            .group({
                "_id": '$touser',
                "idList": $.addToSet("$_id")
            })
            .end();

        // "config": "0 30 10 * * * *"
        // console.log(messages);
        let date = new Date()
        let time = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-')
        const sendPromises = messages.list.map(async msg => {
            let data = {
                thing1: {
                    value: "一天辛勤工作后,来更新下计划的完成情况吧"
                },
                time3: {
                    value: time
                }
            }
            try {
                // 发送订阅消息
                await cloud.openapi.subscribeMessage.send({
                    "touser": msg._id,
                    "templateId": "N67wGxr2mDVzA8VaxSZihAVep7HB0oVS1GbAYp8ItaA",
                    "page": "pages/index/index",
                    "data": data
                });

                // 发送成功后将消息的状态改为已发送
                return db.collection('messages')
                    .doc(msg.idList[0])
                    .update({
                        data: {
                            done: true,
                            updateTime:new Date()
                        }
                    });
            } catch (e) {
                return e;
            }
        });
        return Promise.all(sendPromises);
    } catch (err) {
        console.log(err);
        return err;
    }

};