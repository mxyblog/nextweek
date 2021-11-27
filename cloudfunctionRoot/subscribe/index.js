// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const _ = db.command
const nowDate = new Date();
// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  console.log(OPENID)
  if (event.function_name == "notifySchedule") {
    // 在云开发数据库中存储用户订阅
    return await db.collection('user').where({
      openid:OPENID
    }).get().then(
      res=>{
        console.log(res.data)
        if(res.data.length === 0){
          //新用户
          db.collection('user').add({
            data:{
              openid: OPENID,
              createTime:nowDate,
              updateTime:nowDate
            }
          })
        }else{
          db.collection('user').where({
            openid:OPENID
          }).update({
            updateTime:nowDate
          })
        }
      })
  }
}