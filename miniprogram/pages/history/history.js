import Mydate from '../../common/mydate';
import Store from '../../common/store';
import Common from '../../common/common';
Page({
  data: {
    historys: []
  },
  onLoad: function () {

  },

  onShow: function () {
    var todos = Store.get('todo_list')
    if (todos) {
      this.setData({
        todos: todos,
      })
      //列出所有计划项目 不管是已完成还是未完成
      let historys = this.sortByWeek(todos)
      console.log('汇总后',historys)
      this.setData({
        historys: historys
      })
    }
  },
  /**
   * 获取所有已完成的计划
   * @param {*} arry
   * @returns
   */
  getCompleted(arry) {
    const set = new Set()
    arry.forEach(item => {
      if (item.completed) {
        set.add(item)
      }
    })
    return [...set]
  },
  /**
   * 根据不同周汇总
   * @param {*} arr
   * @returns
   */
  sortByWeek(arr){
    var map = {},
    dest = [];
    for(var i = 0; i < arr.length; i++){
      var item = arr[i];
      if(!map[item.weekStartDay]){
          dest.push({
            weekStartDay:item.weekStartDay,
            weekEndDay:item.weekEndDay,
            info:[{'name':item.name,'completed':item.completed}]
          });
        map[item.weekStartDay] = item;
      }else{
        for(var j = 0; j < dest.length; j++){
          var ditem = dest[j];
          if(ditem.weekStartDay === item.weekStartDay){
              ditem.info.push({'name':item.name,'completed':item.completed});
              break;
          }
      }
      }
    }
    console.log(map)
    return dest;
  },

  onShareAppMessage: function (options) {
    return Common.shareTofriend()
  },

  //分享到朋友圈
  onShareTimeline: () => {
    return Common.shareToCircle()
  },

})