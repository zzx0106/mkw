// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 10086,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    proxyTable: {
      '/comic': {
        target: 'http://japi.juhe.cn/comic',
        changeOrigin: true,
        pathRewrite: {
          '^/comic': ''
        }
      },
      '/pdc': {
        target: 'http://dy.api.duominuo.com/pdc',
        changeOrigin: true,
        pathRewrite: {
          '^/pdc': ''
        }
      },
      '/insert': {//注册用户
        target: 'http://localhost:10086/insert',
        changeOrigin: true,
        pathRewrite: {
          '^/insert': ''
        }
      },
      '/find': {//注册用户
        target: 'http://localhost:10086/find',
        changeOrigin: true,
        pathRewrite: {
          '^/find': ''
        }
      },
      '/findcontent': {//查找评论
        target: 'http://localhost:10086/findcontent',
        changeOrigin: true,
        pathRewrite: {
          '^/findcontent': ''
        }
      },
      '/update': {//更新评论
        target: 'http://localhost:10086/update',
        changeOrigin: true,
        pathRewrite: {
          '^/update': ''
        }
      },
      '/insertlove': {//更新评论
        target: 'http://localhost:10086/insertlove',
        changeOrigin: true,
        pathRewrite: {
          '^/insertlove': ''
        }
      },
      '/removelove': {//更新评论
        target: 'http://localhost:10086/removelove',
        changeOrigin: true,
        pathRewrite: {
          '^/removelove': ''
        }
      },
      '/changepwd': {//修改密码
        target: 'http://localhost:10086/changepwd',
        changeOrigin: true,
        pathRewrite: {
          '^/changepwd': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
