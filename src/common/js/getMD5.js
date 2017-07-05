/**
 * Created by 子贤 on 2017/5/2.
 * 提供md5加密
 */
var crypto = require('crypto');
export function getMD5(date) {
  var md5 = crypto.createHash('md5');//md5加密req.body.comicName+''+req.body.comicLastUpdate+''
  var title = md5.update(date).digest('base64');
  return title;
};
