import Mydate from '../../common/mydate';
import Store from '../../common/store';
import Common from '../../common/common';
Page({
  data: {
    todos: [],
    thisWeekToDo: [],
    thisWeekStartDate:''
  },

  onLoad: function () {
    this.setData({
      thisWeekStartDate: Mydate.getCurrentWeekFirstDay(),
    })
  },

  onShow: function () {
    var todos = Store.get('todo_list')
    if (todos && todos.length!==0) {
      this.setData({
        todos: todos,
      })
    }else{
      //增加第一次登陆小程序的新手引导数据
      let demoTodos = [
        {
          weekStartDay: Mydate.getCurrentWeekFirstDay(),
          weekEndDay: Mydate.getCurrentWeekLastDay(),
          name: "开始新手引导",
          completed: true,
        },{
          weekStartDay: Mydate.getCurrentWeekFirstDay(),
          weekEndDay: Mydate.getCurrentWeekLastDay(),
          name: "点击左侧圆圈,可以改变本条代办完成状态",
          completed: false,
        },{
          weekStartDay: Mydate.getCurrentWeekFirstDay(),
          weekEndDay: Mydate.getCurrentWeekLastDay(),
          name: "点击右侧删除按钮，可以将本条代办删除",
          completed: false,
        },
        {
          weekStartDay: Mydate.getCurrentWeekFirstDay(),
          weekEndDay: Mydate.getCurrentWeekLastDay(),
          name: "去计划页面开始制定下周的计划，制定后的计划到了下周将会显示在这里。",
          completed: false,
        },{
          weekStartDay: Mydate.getCurrentWeekFirstDay(),
          weekEndDay: Mydate.getCurrentWeekLastDay(),
          name: "相信聪明的你已经学会了，期待遇见更好的自己。",
          completed: false,
        },{
          weekStartDay: Mydate.getCurrentWeekFirstDay(),
          weekEndDay: Mydate.getCurrentWeekLastDay(),
          name: "现在你可以将这些新手引导数据都一一删除",
          completed: false,
        }
      ]
      this.setData({
        todos: demoTodos,
      })
    }
    this.getThisWeekToDo();
  },

  /**
   * 获取本周计划
   */
  getThisWeekToDo: function () {
    let thisWeekToDo = this.getSameStartToDo(this.data.todos, this.data.thisWeekStartDate)
    this.setData({
      thisWeekToDo: thisWeekToDo
    })
    // console.log(JSON.stringify(thisWeekToDo));
  },

  getSameStartToDo(arry, value) {
    const set = new Set()
    arry.forEach(item => {
      // console.log(item.weekStartDay)
      if (item.weekStartDay === value) {
        set.add(item)
      }
    })
    return [...set]
  },

  /**
   * 删除已经计划的任务
   * @param {*} e
   */
  removeTodoHandle: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    console.log(todos);
    var remove = todos.splice(index, 1)[0]
    console.log(remove,'已删除');
    this.setData({
      todos: todos,
    })
    this.getThisWeekToDo();
    this.save()
  },
  /**
   * 切换任务完成/未完成
   */
  toggleTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    this.setData({
      todos: todos,
    })
    this.getThisWeekToDo();
    this.save()
  },

  save: function () {
    Store.set('todo_list', this.data.todos);
  },

  onShareAppMessage: function (options) {
    return Common.shareTofriend()
  },

  //分享到朋友圈
  onShareTimeline: () => {
    return Common.shareToCircle()
  },

})