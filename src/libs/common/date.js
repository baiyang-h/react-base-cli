/**
 * @description 年-月-日
 * @param time   时间戳
 * @return {string}
 */
export const getDate = time => {
  var result;
  var d = new Date(time);
  var year = d.getFullYear();
  var mouth;
  var day;
  if (d.getMonth() + 1 < 10) {
    mouth = "0" + (d.getMonth() + 1);
  } else {
    mouth = d.getMonth() + 1;
  }
  if (d.getDate() < 10) {
    day = "0" + d.getDate();
  } else {
    day = d.getDate();
  }
  result = year + "-" + mouth + "-" + day;
  return result;
};

/**
 * @description 年-月-日-时-分-秒
 * @param now    时间戳
 * @return {string}
 */
export const getDateTime = function(now) {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let arr = [month, date, hour, minute, second];
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return (
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
  );
};

/**
 * @description 时间格式化,获取时分秒  这种写法是根据传入的时间戳 转为 年月日时分秒，然后获取它的是时分秒
 * @param time
 * @return {string|*}
 */
export const getBranch = time => {
  if (time == "") {
    return time;
  }
  var result;
  var d = new Date(time);
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var second = d.getSeconds();
  result = hour + ":" + minutes + ":" + second;
  return result;
};


/**
 * @description 传入一个毫秒数，不是时间戳。 就仅仅是毫秒转时分秒有多少，xx小时xx分xx秒   这种写法是传入毫秒 转为 时分秒
 * @param 单纯的一个毫秒
 * @return {string}
 */
function getTime(ms) {    // 后端可能会返回负数 -_-|||
  if(ms>0) {
    let hour, minute, second
    let d = ms / 1000
    second = Math.floor(d % 60)
    minute = Math.floor((d / 60) % 60)
    hour = Math.floor(d / 60 / 60)
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    const time = {
      hour,
      minute,
      second
    }
    return (time.hour ? `${time.hour}小时` : '') + (time.minute ? `${time.minute}分钟` : '') + `${time.second}秒`;
  } else {
    return ''
  }
}

/**
 * @description 时间戳 转为 标准格式时间
 * @param date
 * @return {Date}
 */
export const parserDate = date => {
  var t = Date.parse(date);
  if (!isNaN(t)) {
    return new Date(Date.parse(date.replace(/-/g, "/")));
  } else {
    return new Date();
  }
};


