/**
 * Created by 子贤
 * 数据库连接
 */

const MongoClient = require('mongodb').MongoClient;
function _connectDB(callback) {
  const url = 'mongodb://localhost:27017/mkwDB';
  MongoClient.connect(url, function (err, db) {
    callback(err, db);
  });
}
exports.insert = function (collectionName, json, callback) {
  _connectDB(function (err, db) {
    db.collection(collectionName).insert(json, function (err, result) {
      callback(err, result);
      db.close();
    })
  });
}
exports.insertlove = function (collectionName, json, callback) {
  _connectDB(function (err, db) {
    db.collection(collectionName).insert(json, function (err, result) {
      callback(err, result);
      db.close();
    })
  });
}
exports.removelove = function (collectionName, json, callback) {
  _connectDB(function (err, db) {
    db.collection(collectionName).remove(json, function (err, result) {
      callback(err, result);
      db.close();
    })
  });
}
exports.find = function (collectionName, json, callback) {
  _connectDB(function (err, db) {
    db.collection(collectionName).find(json).toArray(function (err, result) {
      callback(err, result);
      db.close();
    });
  });
}

exports.findcontent = function (collectionName, title, callback) {
  _connectDB(function (err, db) {
    console.log(title)
    db.collection(collectionName).find({}, title).toArray(function (err, result) {
      callback(err, result);
      db.close();
    });
  });
}

exports.update = function (collectionName, find, set, callback) {
  _connectDB(function (err, db) {
    db.collection(collectionName).update(find, set, function (err, result) {
      callback(err, result);
      db.close();
    });
  });
}
