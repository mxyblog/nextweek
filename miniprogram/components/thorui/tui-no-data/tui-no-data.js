Component({
  properties: {
    //是否垂直居中
    fixed: {
      type: Boolean,
      value: true
    },
    //图片地址，没有则不显示
    imgUrl: {
      type: String,
      value: ""
    },
    //图片宽度
    imgWidth: {
      type: Number,
      value: 200
    },
    //图片高度
    imgHeight: {
      type: Number,
      value: 200
    },
    //按钮宽度
    btnWidth: {
      type: Number,
      value: 200
    },
    btnHeight:{
      type: Number,
      value: 60
    },
    //按钮文字，没有则不显示
    btnText: {
      type: String,
      value: ""
    },
    //按钮背景色
    backgroundColor:{
      type:String,
      value: "#EB0909"
    },
    size:{
      type:Number,
      value:28
    },
    radius:{
      type:String,
      value:'8rpx'
    }
  },
  methods: {
    handleClick(e) {
      this.triggerEvent('click', {});
    }
  }
})