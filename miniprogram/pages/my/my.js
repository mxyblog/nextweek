import Mydate from '../../common/mydate';
import Store from '../../common/store';
import Common from '../../common/common';
const tmplId = ['2j_q3erxVvwAltRXzkJgndEbp9XDjj-t3fxmM0ELU_M','fDxJfVuwBjfXOcAdecKZDGXB-Lo70rzy7DJQfob3n2w'] //这是订阅消息模板id，需自行申请

Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
    isSubscribe:false
  },

  onShow: function () {
    let userCache = Store.get('userInfo');
    this.isAlwaysConfirm();
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
      desc: '用于显示头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
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

  isAlwaysConfirm:function(){
    var _this=this
    wx.getSetting({
      withSubscriptions: true,
      success (res) {
        console.log(res.subscriptionsSetting.itemSettings)
        if(res.subscriptionsSetting.itemSettings){
          if(res.subscriptionsSetting.itemSettings.hasOwnProperty(tmplId[0]) && res.subscriptionsSetting.itemSettings.hasOwnProperty(tmplId[1])){
            console.log("用户已永久订阅")
            _this.setData({isSubscribe:true})
          }
        }
        // res.subscriptionsSetting = {
        //   mainSwitch: true, // 订阅消息总开关
        //   itemSettings: {   // 每一项开关
        //     SYS_MSG_TYPE_INTERACTIVE: 'accept', // 小游戏系统订阅消息
        //     SYS_MSG_TYPE_RANK: 'accept'
        //     zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: 'reject', // 普通一次性订阅消息
        //     ke_OZC_66gZxALLcsuI7ilCJSP2OJ2vWo2ooUPpkWrw: 'ban',
        //   }
        // }
      }
    })
  },



  dingyueComfirm: function () {
    let _this = this;
    let zhou = Mydate.getWeekNum() + 1;
    if(_this.data.isSubscribe){
      wx.showToast({
        title: '您已订阅',
        icon: 'success',
        duration: 2000,
      });
      return;
    }
    // 调用微信 API 申请发送订阅消息
    wx.requestSubscribeMessage({
      // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
      tmplIds: tmplId,
      success: res => {
        console.log(res)
        _this.isAlwaysConfirm()
        if(_this.data.isSubscribe){
          // 这里将订阅的课程信息调用云函数存入db
          wx.cloud
          .callFunction({
            name: 'subscribe',
            data: {
              function_name:"notifySchedule"
            },
          }).then(res => {
            wx.showToast({
              title: '订阅成功',
              icon: 'success',
              duration: 2000,
            });
            console.log('订阅成功', res)
          })
        }else{
          wx.showToast({
            title: '请勾选总是保持以便接收服务通知',
            icon: 'none',
            duration: 2000,
          });
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
