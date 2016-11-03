const DateUtils = {
  converDate (date: string) {
    return date.replace(new RegExp('-','g'),'/')
  },
  getCurrentDate () {
    return new Date().Format('yyyy/MM/dd')
  },

  extendDate () {
    Date.prototype.Format = function (fmt) {
      var o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),//季度
        'S': this.getMilliseconds()//毫秒
      }
      if (/(y+)/.test(fmt)) fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4-RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k +')').test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
    }
  }

  /**
   * http://www.w3school.com.cn/js/js_obj_regexp.asp
   *
   * test() 方法检索字符串中的指定值。返回值是 true 或 false。
   *  var patt1=new RegExp("e");

      document.write(patt1.test("The best things in life are free"));
      由于该字符串中存在字母 "e"，以上代码的输出将是：true

      exec() 方法检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。
   */
}
DateUtils.extendDate()

module.exports = DateUtils