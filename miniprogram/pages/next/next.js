import Mydate from '../../common/mydate';
import common from '../../common/common';
import Store from '../../common/store';

Page({
  data: {
    input: '',
    todos: [],
    logs: [],
    nextWeekstartDate:'',
    nextWeekEndDate:'',
    nextWeekToDo: [],
    dijitian: '',
  },

  onLoad: function () {
    this.setData({
      todayDate: Mydate.getCurrentDate(),
      nextWeekstartDate:Mydate.getNextWeekFirstDay(),
      nextWeekEndDate:Mydate.getNextWeekLastDay()
      //调试
      // nextWeekstartDate:'2021-07-26',
      // nextWeekEndDate:'2021-08-01',
    })
  },

  onShow: function () {
    var todos = Store.get('todo_list')
    if (todos) {
      this.setData({
        todos: todos,
      })
    }
    this.getNextWeekToDo();
  },

  /**
   * 获取缓存中的下周计划
   */
  getNextWeekToDo: function () {
    let nextWeekToDo = this.getSameStartToDo(this.data.todos, this.data.nextWeekstartDate);
    this.setData({
      nextWeekToDo: nextWeekToDo
    })
    console.log(JSON.stringify(nextWeekToDo));
  },

  /**
   * 获取同一个周区间的任务
   * @param {*} arry
   * @param {*} value
   * @returns
   */
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
   * 监听输入文本
   * @param {*} e
   */
  inputChangeHandle: function (e) {
    console.log(e);
    this.setData({
      input: e.detail.value
    })
  },

  /**
   * 回车添加到代办列表
   * @param {*} e
   * @returns
   */
  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    var todos = this.data.todos
    todos.push({
      weekStartDay: this.data.nextWeekstartDate,
      weekEndDay: this.data.nextWeekEndDate,
      name: this.data.input,
      completed: false,
    })
    this.setData({
      input: '',
      todos: todos,
    })
    this.getNextWeekToDo();
    this.save();
  },


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
    this.getNextWeekToDo();
    this.save()
  },

  save: function () {
    Store.set('todo_list', this.data.todos);
  },


  onShareAppMessage: function (options) {
    return common.shareTofriend()
  },

  //分享到朋友圈
  onShareTimeline: () => {
    return common.shareToCircle()
  },

})