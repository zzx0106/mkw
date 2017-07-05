<template>
  <div id="app">
    <el-row  id="header">
      <el-col :span="4" @click.native="showSidebar"><i class="icon-list"></i></el-col>
      <el-col :span="16"><h1 @click="gotoAdmin">漫客屋</h1></el-col>
      <el-col :span="4"><i class="icon-share  -mob-share-open"></i></el-col>
    </el-row>
    <sidebar v-show="isshow"></sidebar>
    <div v-show="isshow" class="shade" @click="hidenShade"></div>
    <div class="router-list">
      <router-link to="/home" class="home" @click.native="defaultRouter">
        <i class="icon-fire"></i>
        <span>主页</span>
      </router-link>
      <router-link to="/videos" class="videos">
        <i class="icon-film"></i>
        <span>视频</span>
      </router-link>
      <router-link to="/news" class="news">
        <i class="icon-file-text"></i>
        <span>快讯</span>
      </router-link>
      <!--<router-link to="/chatroom" class="chatroom">-->
      <!--<i class="icon-chat2"></i>-->
      <!--<span>聊天室</span>-->
      <!--</router-link>-->
      <router-link to="/person" class="person">
        <i class="icon-user"></i>
        <span>个人</span>
      </router-link>
    </div>

    <!--shareSDK分享功能-->
    <div class="-mob-share-ui" style="display: none">
      <ul class="-mob-share-list">
        <li class="-mob-share-weibo"><p>新浪微博</p></li>
        <li class="-mob-share-tencentweibo"><p>腾讯微博</p></li>
        <li class="-mob-share-qzone"><p>QQ空间</p></li>
        <li class="-mob-share-qq"><p>QQ好友</p></li>
        <li class="-mob-share-renren"><p>人人网</p></li>
        <li class="-mob-share-kaixin"><p>开心网</p></li>
        <li class="-mob-share-douban"><p>豆瓣</p></li>
        <li class="-mob-share-facebook"><p>Facebook</p></li>
        <li class="-mob-share-twitter"><p>Twitter</p></li>
      </ul>
      <div class="-mob-share-close">取消</div>
    </div>
    <div class="-mob-share-ui-bg"></div>
    <!--shareSDK分享功能-->

    <!--路由渲染-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import sidebar from './components/sidebar/SideBar.vue'
  import bus from './common/js/commonVue'
  export default {
    name: 'app',
    data() {
      return {
        flag: 0,
        isshow: this.isshowing
      }
    },
    mounted() {
      bus.$on('showSidebar', function (isshow) {
        this.isshow = isshow;
      }.bind(this))
      bus.$on('isshowing', function (s) {
        this.isshow = s//从sidebar传来的是否关闭遮罩层
      }.bind(this));
    },
    methods: {
      hidenShade() {//隐藏遮罩层
        this.isshow = !this.isshow;
      },
      defaultRouter() {
//      点击主页默认跳转到today
        this.$router.push('/home/today')
      },
      changec(num) {
        this.flag = num;
      },
      showSidebar() {//遮罩层显示控制
        bus.$emit('showSidebar',true);
      },
      gotoAdmin() {
          window.open('/admin0106')
      }
    },
    components: {
      sidebar
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #app {
    height: 100%;
    #header {
      position: fixed;
      top:0;
      width: 100%;
      background: #ffffff;
      padding: 10px 0;
      text-align: center;
      z-index:100;
      color: rgba(0,0,0,.7);
    }
    .shade {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 200;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
    .router-list {
      height: 3rem;
      width: 100%;
      display: flex;
      position: fixed;
      bottom: 0px;
      z-index: 100;
      background-color: #fff;
      box-shadow: 0px -1px 8px #888888;
      a {
        display: inline-block;
        height: 3em;
        flex: 1;
        line-height: 3em;
        text-align: center;
        background-color: #fff;
        i {
          margin-top: .5em;
          display: block;
          font-size: 20px;
        }
        span {
          margin-top: -1.2em;
          display: block;
          font-size: 10px;
        }
      }
      .router-link-active {
        background: red;
        color: #ffffff;
      }
    }
  }

</style>
