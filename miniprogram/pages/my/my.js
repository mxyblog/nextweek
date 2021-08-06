import Mydate from '../../common/mydate';
import Store from '../../common/store';
import Common from '../../common/common';
const tmplId = 'N67wGxr2mDVzA8VaxSZihAVep7HB0oVS1GbAYp8ItaA' //这是订阅消息模板id，需自行申请

Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
  },

  onShow: function () {
    let userCache = Store.get('userInfo');
    console.log(userCache)
    if(userCache){
      this.setData({
        userInfo: userCache,
        hasUserInfo: true
      })
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        Store.set('userInfo',res.userInfo);
      }
    })
  },

  dingyueComfirm: function () {
    let zhou = Mydate.getWeekNum() + 1;
    // 调用微信 API 申请发送订阅消息
    wx.requestSubscribeMessage({
      // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
      tmplIds: [tmplId],
      success: res => {
        console.log(res)
        if (res[tmplId] === 'accept') {
          // 这里将订阅的课程信息调用云函数存入db
          wx.cloud
            .callFunction({
              name: 'subscribe',
              data: {
                function_name:"notifySchedule",
                title: "本年度第" + zhou + "周计划可以开始制定了",
                time: Mydate.getNextWeekFirstDay(),
              },
            }).then(res => {
              wx.showToast({
                title: '订阅成功',
                icon: 'success',
                duration: 2000,
              });
              console.log('订阅成功', res)
            })
        }
      },
      fail(err) {
        //失败
        console.log(err)
      }
    })
  },
  emptyData:function(){
    wx.showModal({
      title: '确定清空数据么？',
      content: '点击确定后将会完全清空计划数据，请谨慎操作！',
      success(res) {
        if (res.confirm) {
          　Store.set('todo_list','');
            console.log('清除成功');

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
   }
  })
  },
  logout:function(){
    Store.set('userInfo','{}');
    this.setData({
      userInfo: '{}',
      hasUserInfo: false
    })
  },

  onShareAppMessage: function (options) {
    return Common.shareTofriend();
  },

  //分享到朋友圈
  onShareTimeline: () => {
    return Common.shareToCircle();
  },

})
