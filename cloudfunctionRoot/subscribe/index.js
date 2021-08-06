// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  console.log(OPENID)
  if (event.function_name == "notifySchedule") {
    try {
      const result = await cloud.openapi.subscribeMessage.send({
          touser: OPENID,
          page: 'pages/next/next',
          lang: 'zh_CN',
          data: {
            thing1: {
              value: event.title
            },
            time3: {
              value: event.time
            }
          },
          templateId: 'N67wGxr2mDVzA8VaxSZihAVep7HB0oVS1GbAYp8ItaA',
          miniprogramState: 'formal'
        })

    // 在云开发数据库中存储用户订阅
    return await db.collection('messages').where({
      touser:OPENID
    }).get().then(
      res=>{
        console.log(res.data)
        if(res.data.length === 0){
          //新用户
          db.collection('messages').add({
            data:{
              touser: OPENID,
              done: false,
              updateTime:new Date()
            }
          }).then(res=>{
              console.log('添加成功->',res)
              }).catch( err=>{
              console.log('添加失败',err)
            });
        }else{
          console.log("账号已经存在")
        }
      })

    } catch (err) {
      return err
    }

  }



  try {

} catch (err) {
    console.log(err);
    return err;
}
}