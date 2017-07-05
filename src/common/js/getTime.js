/**
 * Created by 子贤 on 2017/4/22.
 */
// function getNowFormatDate() {
//   var date = new Date();
//   var seperator1 = "";//中间格式xxxx-xxxx-xxxx
//   var seperator2 = "";//中间格式hh:mm:ss
//   var month = date.getMonth() + 1;
//   var strDate = date.getDate();
//   if (month >= 1 && month <= 9) {
//     month = "0" + month;
//   }
//   if (strDate >= 0 && strDate <= 9) {
//     strDate = "0" + strDate;
//   }
//   var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
//     + "" + date.getHours() + seperator2 + date.getMinutes()
//     + seperator2 + date.getSeconds();
//   return currentdate;
// }
// export default getNowFormatDate;

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str :addLeftZero(str))
    }
  }
  return fmt;
};
function addLeftZero(str) {
  return ('00' + str).substr(str.length);
}
