const common = {
    /**
     * 分享到好友
     */
    shareTofriend(){
          return  {
            title: "计划不写下来，不告诉自己必须完成，它根本不会出现。", // 默认是小程序的名称(可以写slogan等)
            path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
            imageUrl: '/assets/share.jpg', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
            success: function (res) {
            // 转发成功之后的回调
            if (res.errMsg == 'shareAppMessage:ok') {}
            },
            fail: function () {
            // 转发失败之后的回调
            if (res.errMsg == 'shareAppMessage:fail cancel') {
                // 用户取消转发
            } else if (res.errMsg == 'shareAppMessage:fail') {
                // 转发失败，其中 detail message 为详细失败信息
            }
            },
            complete: function () {
            // 转发结束之后的回调（转发成不成功都会执行）
            }
        }
    },
    /**
     * 分享到朋友圈
     */
    shareToCircle(){
        return {
            title: "计划不写下来，不告诉自己必须完成，它根本不会出现。",
            query: "id=21089",
            imageUrl: "/assets/mshare.png"
          }
    }
}
export default common