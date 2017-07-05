<template>
  <transition name="transx">
    <div id="sidebar" v-show="hidensidebar">
      <div class="login">
        <span class="icon-tv login-icon"></span>
        <p class="title">{{getUser}}</p>
      </div>
      <form class="form-box">
        <input class="sou" v-model="soso.text" type="text" placeholder="搜一搜">
        <input class="submit" type="submit" value="提交" @click.prevent="toSosuo(soso.text)">
      </form>
      <div class="item-icon" @click="gotoLoveList">
        <span class="icon icon-yelp"></span>
        <span class="title">漫画订阅</span>
      </div>
      <div class="item-icon" @click="changePassword">
        <span class="icon icon-foursquare"></span>
        <span class="title">修改密码</span>
      </div>
      <!--<div class="item-icon">-->
      <!--<span class="icon icon-dribbble"></span>-->
      <!--<span class="title">漫画下载</span>-->
      <!--</div>-->
      <div class="item-icon" @click="aboutUs">
        <span class="icon icon-svg"></span>
        <span class="title">关于我们</span>
      </div>
      <div class="foot">
        <div class="f1">
          <span class="icon-moon"></span>
          <p>夜间</p>
        </div>
        <div class="f1">
          <span class="icon-shezhi"></span>
          <p>设置</p>
        </div>
        <div class="f1">
          <span class="icon-exit"></span>
          <p>退出</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import bus from '../../common/js/commonVue'
  export default{
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        soso: {
          text: ''
        },
        hidensidebar: true,
        localstorage: window.localStorage,
        sessionstorage: window.sessionStorage
      }
    },
    methods: {
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
      gotoLoveList() {
        if (this.getUserM() === '请登录') {
          this.$message.error('请先登录才能查看收藏');
          return;
        }
        bus.$emit('isshowing', false);
        this.$router.push('/person/lovelist');
      },
      changePassword() {
        bus.$emit('isshowing', false);
        this.$router.push('/person/changepwd');
      },
      aboutUs() {
        bus.$emit('isshowing', false);
        const h = this.$createElement;
        this.$notify({
          title: '关于我们',
          message: h('i', {style: 'color: teal'}, 'qq:1148218318 ( ˇˍˇ ) \n 支持我吧！'),
          offset: 38
        });
      },
      toSosuo(text) {
        var textObj = {
          path: '/soso',
          query: {
            text: text
          }
        };
        bus.$emit('isshowing', false);
        bus.$emit('soso', text);
        this.$router.push(textObj);
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
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #sidebar {
    transition: 1s ease;
    transform: translate3d(0%, 0, 0);
    &.transx-enter, &.transx-leave-to {
      transform: translate3d(-100%, 0, 0);
    }
    position: fixed;
    top: 0;
    height: 100%;
    width: 70%;
    background-color: #ffffff;
    z-index: 300;
    .login {
      height: 160px;
      text-align: center;
      background: url("./sidebarimg/bg3.jpg");
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
        background-color: rgba(0, 0, 0, 0.3);
        margin: 0 auto 10px auto;
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
    .form-box {
      display: flex;
      height: 35px;
      width: 100%;
      .sou {
        flex: 1;
        border: 0;
        padding-left: 10px;
        outline: none;
      }
      .submit {
        background: #2dbcff;
        border: 0;
        flex: 0 0 40px;
      }
    }
    @height: 35px;
    .item-icon {
      margin: 0 auto;
      width: 100%;
      height: @height;
      .icon {
        float: left;
        display: inline-block;
        margin-left: 10px;
        height: @height;
        line-height: @height + 4;
      }
      .title {
        float: left;
        display: inline-block;
        font-size: 13px;
        height: @height;
        line-height: @height;
        margin-left: 8px;
      }
    }
    .foot {
      display: flex;
      position: absolute;
      width: 100%;
      padding-top: 10px;
      bottom: 10px;
      border-top: 0.1px solid #cccccc;
      font-size: 13px;
      .f1 {
        flex: 1;
        margin-left: 10px;
        p {
          display: inline-block;
        }
      }
      .f2 {
        flex: 2;
        p {
          display: inline-block;
        }
      }
      .f3 {
        flex: 3;
        p {
          display: inline-block;
        }
      }
    }
  }
</style>
