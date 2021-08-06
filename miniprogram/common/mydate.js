/**
 * 常用方法封装 日期类
 * @author moxiaoyu.
 **/

const Mydate = {

	/**
	 *
	 * @returns 返回下周的第一天 格式 2020-11-23
	 */
	getNextWeekFirstDay() {
		let date = this.getCurrentWeekFirstDay();
		return this.addDate(date, 7);
	},
	/**
	 *
	 * @returns 返回下周的最后一天 格式 2020-11-23
	 */
	getNextWeekLastDay() {
		let date = this.getCurrentWeekLastDay();
		return this.addDate(date, 7);
	},
	/**
	 *
	 * @param {*} date 格式 2020-11-23
	 * @param {*} days 数字
	 * @returns 返回多少天以后的日期 格式 2020-11-23
	 */

	addDate(date, days) {
		var d = new Date(date);
		d.setDate(d.getDate() + days);

		var m = d.getMonth() + 1;
		if (m < 10) {
			m = '0' + m;
		}

		let dd = d.getDate();
		if (dd < 10) {
			dd = '0' + dd;
		}
		return d.getFullYear() + '-' + m + '-' + dd;
	},

	/**
	 *
	 * @returns 返回当天是当前周的第几天
	 */
	getDijitian() {
		let date = new Date()
		let num = date.getDay() ? date.getDay() : 7
		return num;
	},

	/**
	 *
	 * @returns  放回当前是第几周
	 */
	 getWeekNum: function () {
		 let endDate=new Date();
		 //本年的第一天
		 var beginDate = new Date(endDate.getFullYear(), 0, 1);
		 //星期从0-6,0代表星期天，6代表星期六
		 var endWeek = endDate.getDay();
		 if (endWeek == 0) endWeek = 7;
		 var beginWeek = beginDate.getDay();
		 if (beginWeek == 0) beginWeek = 7;
		 //计算两个日期的天数差
		 var millisDiff = endDate.getTime() - beginDate.getTime();
		 var dayDiff = Math.floor(( millisDiff + (beginWeek - endWeek) * (24 * 60 * 60 * 1000)) / 86400000);
		 return Math.ceil(dayDiff / 7) + 1;
	},

	/**
	 * 获取当前的日期
	 * 返回格式: YYYY-mm-dd
	 * */
	getCurrentDate() {
		let date = new Date();
		let month = parseInt(date.getMonth() + 1);
		let day = date.getDate();
		if (month < 10) {
			month = '0' + month
		}
		if (day < 10) {
			day = '0' + day
		}
		return date.getFullYear() + '-' + month + '-' + day;
	},

	/**
	 * 获取本周的第一天
	 * 返回格式: YYYY-mm-dd
	 * 返回日期为: 2020-11-23
	 * */
	getCurrentWeekFirstDay() {
		let date = new Date();
		let num = date.getDay() ? date.getDay() : 7 //第几天
		let weekFirstDay = new Date(date - (num - 1) * 86400000)
		let firstMonth = Number(weekFirstDay.getMonth()) + 1

		if (firstMonth < 10) {
			firstMonth = '0' + firstMonth
		}
		let weekFirstDays = weekFirstDay.getDate();
		if (weekFirstDays < 10) {
			weekFirstDays = '0' + weekFirstDays;
		}
		return weekFirstDay.getFullYear() + '-' + firstMonth + '-' + weekFirstDays;
	},

	/**
	 * 获取本周的最后一天
	 * 返回格式: YYYY-mm-dd
	 * 返回日期为: 2020-11-29
	 * */
	getCurrentWeekLastDay() {
		let date = new Date();
		let num = date.getDay() ? date.getDay() : 7 //第几天
		let weekFirstDay = new Date(date - (num - 1) * 86400000)
		let weekLastDay = new Date((weekFirstDay / 1000 + 6 * 86400) * 1000)
		let lastMonth = Number(weekLastDay.getMonth()) + 1
		if (lastMonth < 10) {
			lastMonth = '0' + lastMonth
		}
		let weekLastDays = weekLastDay.getDate();
		if (weekLastDays < 10) {
			weekLastDays = '0' + weekLastDays;
		}
		return weekFirstDay.getFullYear() + '-' + lastMonth + '-' + weekLastDays;
	},

}

export default Mydate