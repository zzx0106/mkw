require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var bodyParser = require('body-parser')
var crypto = require('crypto');
var dbManger = require('../src/common/Dao/db')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.post('/insert', function (req, res) {
  dbManger.insert('user', {//增加用户
    "user": req.body.user,
    "username": req.body.username,
    "password": req.body.password
  }, function (err, result) {
    res.send(result)
  })
});
app.post('/find', function (req, res) {
  dbManger.find('user', req.body, function (err, result) {
    res.send(result)
  })
});
app.post('/findlove', function (req, res) {
  console.log(req.body)
  dbManger.find('loves', req.body, function (err, result) {
    res.send(result)
  })
});
app.post('/update', function (req, res) {//工作原理，将json字符串转换为对象然后传过去
  var md5 = crypto.createHash('md5');//md5加密
  var title = md5.update(req.body.comicName + '' + req.body.comicLastUpdate + '').digest('base64');
  dbManger.update('user',
    eval('(' + '{"user":"' + req.body.user + '"}' + ')'), //find
    eval('(' + '{$set : {"' + title + '": ["' + req.body.content + '","'+req.body.dateTime+'"]}}' + ')'), //set
    function (err, result) {
      res.send(result)
    })
});
app.post('/changepwd', function (req, res) {//工作原理，将json字符串转换为对象然后传过去
  dbManger.update('user',
    eval('(' + '{"user":"' + req.body.user + '"}' + ')'), //find
    eval('(' + '{$set : {"password": "'+req.body.pwd+'"}}' + ')'), //set
    function (err, result) {
      res.send(result)
    })
});
app.post('/insertlove', function (req, res) {//工作原理，将json字符串转换为对象然后传过去
  dbManger.insertlove('loves',
    eval('(' + '{"user":"' + req.body.user + '","comicCoverImg":"' + req.body.comicCoverImg + '","comicName":"' + req.body.comicName + '","comicType":"' + req.body.comicType + '","comicArea":"' + req.body.comicArea + '"}' + ')'),
    function (err, result) {
      res.send(result)
    })
});
app.post('/removelove', function (req, res) {
  dbManger.removelove('loves',
    eval('(' + '{"user":"' + req.body.user + '","comicCoverImg":"' + req.body.comicCoverImg + '","comicName":"' + req.body.comicName + '","comicType":"' + req.body.comicType + '","comicArea":"' + req.body.comicArea + '"}' + ')'),
    function (err, result) {
    res.send(result)
  })
});
app.post('/findcontent', function (req, res) {
  var md5 = crypto.createHash('md5');//md5加密
  var title = md5.update(req.body.comicName + '' + req.body.comicLastUpdate + '').digest('base64');
  var findcontentstr = '{"' + title + '":1,"_id":0,"user":1}';
  dbManger.findcontent('user', eval('(' + findcontentstr + ')'), function (err, result) {
    res.send(result)
  })
});

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
