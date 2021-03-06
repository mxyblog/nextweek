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
            "templateId": "2j_q3erxVvwAltRXzkJgndEbp9XDjj-t3fxmM0ELU_M",
            "page": "pages/index/index",
            "data": {
                thing3: {
                    value: "更新本周计划的完成进度"
                },
                date1: {
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