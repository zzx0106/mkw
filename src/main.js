// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'

import './common/style/icon-font.css';
import '../static/reset.css'
import '../node_modules/element-ui/lib/theme-default/index.css'
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

import axios from 'axios'
Vue.prototype.$ajax = axios;//全局网络请求用this.$ajax()

router.push('/home/today');//默认打开today
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
