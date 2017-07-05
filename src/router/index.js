import Vue from 'vue'
import Router from 'vue-router'

//chatroom路由
import Chatroom from '../components/chatroom/Chatroom.vue'

//person路由
import Person from '../components/person/Person.vue'
import Loginin from '../components/loginin/LoginIn.vue'
import Register from '../components/loginin/Register.vue'
import LoveList from '../components/person/LoveList.vue'
import ChangePws from '../components/loginin/ChangePws.vue'


//home路由
import Home from '../components/home/Home.vue'

//sidebar
import Soso from '../components/sidebar/Soso.vue';
//home子路由
import Today from '../components/home/Today.vue'
import YoungGirl from '../components/home/YoungGirl.vue'
import Horror from '../components/home/Horror.vue'
import Youngsters from '../components/home/Youngsters.vue'
import Detailpage from '../components/publicComponents/Detailpage.vue'
import comicbrowsing from '../components/publicComponents/ComicBrowsing.vue'
import TodayList from '../components/home/homecomponents/TodayList.vue'
//new路由
import News from '../components/news/News.vue'
//news子路由
import NewsDetail from '../components/news/NewsDetail.vue'

// video路由
import Videos from '../components/videos/Videos.vue'
//video




import Test from '../components/home/test.vue';
Vue.use(Router)

// 配置路由
var routes = [
  { path:'/home',
    component:Home,
    children:[
      {path:'/home/today',component:Today},
      {path:'/home/younggirl',component:YoungGirl},
      {path:'/home/horror',component:Horror},
      {path:'/home/youngsters',component:Youngsters},
      {path:'/home/detailpage',component:Detailpage},
      {path:'/home/comicbrowsing',component:comicbrowsing},
      {path:'/home/todaylist',component:TodayList}
    ]},
  {path:'/videos',component:Videos},

  {path:'/news',component:News},
  {path:'/news/newsdetail',component:NewsDetail},

  // {path:'/chatroom',component:Chatroom},
  {path:'/person',component:Person},
  {path:'/loginin',component:Loginin},
  {path:'/register',component:Register},
  {path:'/person/lovelist',component:LoveList},
  {path:'/person/changepwd',component:ChangePws},
  {path:'/soso',component:Soso},


  // 重定向
  {path:'*',redirect:'/home/today'}
]
// 传递路由实例
export default new Router({
  routes: routes,
  mode:'history',
  //设置跳到指定路由后回到顶端
  scrollBehavior:() => ({
    y:0
  })
})
