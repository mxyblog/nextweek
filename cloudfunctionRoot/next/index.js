const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;
let nowDate = new Date()
let time = [nowDate.getFullYear(),nowDate.getMonth()+1,nowDate.getDate()].join('.')
exports.main = async (event, context) => {
    const msg = await db.collection("user").where({
        updateTime: _.lt(nowDate),
        }).get();
    // console.log(msg)
    const sendMsg = msg.data.map(async item => {
        await cloud.openapi.subscribeMessage.send({
            "touser": item.openid,
            "templateId": "fDxJfVuwBjfXOcAdecKZDGXB-Lo70rzy7DJQfob3n2w",
            "page": "pages/next/next",
            "data": {
                thing2: {
                    value: "开始下周计划制定"
                },
                time3: {
                    value: time
                }
            }
        });
        db.collection('user').where({
                openid:item.openid
            })
            .update({
                data: {
                    updateTime:nowDate
                }
            });
        return Promise.all(sendMsg);
    });
};