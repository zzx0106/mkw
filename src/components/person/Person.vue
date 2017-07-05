<template>
  <div id="person">
    <div class="login">
      <span class="icon-tv login-icon" @click="gotoLogin"></span>
      <p class="title" @click="gotoLogin">{{getUser}}</p>
      <p v-show="getUser === '请登录'" class="remind">登录后可以使用漫画订阅，发表品论等功能</p>
      <p v-show="getUser !== '请登录'" class="remind">欢迎你{{getUser}}</p>
    </div>
    <littletag :tagMessage="tag1" class="havemargintop" @click.native="gotoLoveList"></littletag>
    <littletag :tagMessage="tag2" @click.native="changePassword"></littletag>
    <!--<littletag :tagMessage="tag3"></littletag>-->
    <littletag :tagMessage="tag4" class="havemargintop" @click.native="aboutUs"></littletag>
    <div v-show="getUser === '请登录'" class="regist" @click="gotoLogin">登陆/注册</div>
    <div v-show="getUser !== '请登录'" class="exit" @click="gotoExit">注销</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import littletag from '../publicComponents/Littletag.vue'
  import bus from '../../common/js/commonVue'
  export default{
    data() {
      return {
        tag1: {
          title: '漫画订阅',
          svgIcon: 'icon-yelp',//图标
          noBottom: true//是否有底边框
        },
        tag2: {
          title: '密码修改',
          svgIcon: 'icon-foursquare',
          noBottom: true
        },
//        tag3: {
//          title: '漫画下载',
//          svgIcon: 'icon-dribbble',
//          noBottom: false
//        },
        tag4: {
          title: '关于我们',
          svgIcon: 'icon-svg',
          noBottom: false
        },
        localstorage: window.localStorage,
        sessionstorage: window.sessionStorage
      }
    },
    mounted() {
    },
    methods: {
      gotoLogin() {
        if (this.getUserM() === '请登录') {
          this.$router.push('/loginin')
        } else {
          return;
        }
      },
      getUserM() {
        var userlocal = this.localstorage.getItem('user');
        var usersession = this.sessionstorage.getItem('user');
        if (userlocal) {
          return userlocal;
        } else if (usersession) {
          return usersession;
        } else {
          return '请登录';
        }
      },
      gotoExit() {//注销时清空缓存
        this.localstorage.clear();
        this.sessionstorage.clear();
        this.$router.go(0);//刷新页面
      },
      gotoLoveList() {
        if (this.getUserM() === '请登录') {
          this.$message.error('请先登录才能查看收藏');
          return;
        }
        bus.$emit('loves', 1);
        this.$router.push('/person/lovelist')
      },
      changePassword() {
        this.$router.push('/person/changepwd');
      },
      aboutUs() {
        const h = this.$createElement;
        this.$notify({
          title: '关于我们',
          message: h('i', {style: 'color: teal'}, 'qq:1148218318 ( ˇˍˇ ) \n 支持我吧！'),
          offset: 38
        });
      }
    },
    computed: {
      getUser() {
        var userlocal = this.localstorage.getItem('user');
        var usersession = this.sessionstorage.getItem('user');
        if (userlocal) {
          return userlocal;
        } else if (usersession) {
          return usersession;
        } else {
          return '请登录';
        }
      }
    },
    components: {
      littletag
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #person {
    /*避免heard阻挡*/
    margin-top: 45px;
    .login {
      height: 200px;
      text-align: center;
      background: url("./personimg/bg2.jpg");
      position: relative;
      color: #ffffff;
      .login-icon {
        display: block;
        position: absolute;
        font-size: 40px;
        width: 70px;
        height: 70px;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        line-height: 70px;
        color: #cccccc;
        background: rgba(137, 172, 212, 0.2);
        margin: 0 auto 10px auto;
        border: 8px solid rgba(143, 175, 213, 0.5);
        border-radius: 50%;
      }
      .title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 120px;
        font-size: 18px;
      }
      .remind {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10px;
        font-size: 12px;
      }
    }
    .havemargintop {
      margin-top: 10px;
    }
    .regist {
      width: 96%;
      color: #fff;
      margin: 10px auto;
      background-color: #20a0ff;
      border-color: #20a0ff;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      border: 1px solid #bfcbd9;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      padding: 10px 15px;
      font-size: 14px;
      border-radius: 4px;
    }
    .exit {
      width: 96%;
      color: #fff;
      margin: 10px auto;
      background-color: #ff4949;
      border-color: #ff4949;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      border: 1px solid #bfcbd9;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      padding: 10px 15px;
      font-size: 14px;
      border-radius: 4px;
    }
  }
</style>
