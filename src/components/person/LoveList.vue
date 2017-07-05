<template>
  <div id="lovelist">
    <!--<h1 class="title">{{comicList[0].user}}的漫画收藏</h1>-->
    <ul class="content">
      <div class="back icon-arrow_lift" @click="goback"></div>
      <li @click="gotolink(item.comicCoverImg,
          item.comicName,
          item.comicType,
          item.comicArea,
          '',
          false,
          '')"
          v-for="(item ,index) in comicList"
          class="child clearfix">
        <div class="left">
          <img :src="item.comicCoverImg" alt="" width="100%" height="100%">
        </div>
        <div class="right">
          <p class="name">
            <span class="tagname">{{item.comicName}}</span>
          </p>
          <p class="type">类型：{{item.comicType}}</p>
          <p class="area">地区：{{item.comicArea}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../../common/js/commonVue';
  export default{
    data() {
      return {
        comicList: Array,
        localstorage: window.localStorage,
        sessionstorage: window.sessionStorage
      }
    },
    mounted() {
      var _this = this;
      this.getLoveDate(_this);
      bus.$on('loves', function (res) {
        this.getLoveDate(_this);
      }.bind(this));
    },
    methods: {
      gotolink(coverImg, name, type, area, des, finish, lastUpdate) {
        var _this = this;
        this.$ajax({
          method: 'get',
          url: '/comic/chapter?' +
          'comicName=' + name + '&' +
          'skip=&' +//跳过页数
          'key=76fc44f8859d2e43c67dd4454f0c0c56'//appkey
        }).then(function (res) {
          if (res.status == 200) {
            //内容图片
            var _comicObj = {
              comicCoverImg: coverImg,
              comicName: name,
              comicType: type,
              comicArea: area,
              comicDes: des,
              comicFinish: finish,
              comicLastUpdate: lastUpdate,
              comicList: res.data.result.chapterList,//得到集数数组
            }
            msglist(_comicObj);
          } else {
            console.log('漫画集数请求失败！')
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
        function msglist(_comicObj) {//传递图片数组
          bus.$emit('ComicObj', _comicObj);
        }

        this.$router.push('/home/detailpage');
      },
      getLoveDate(_this) {
        this.$ajax.post(
          '/findlove',
          {
            user: _this.getUser(),
//          comicCoverImg: comicCoverImg,
//          comicName: this.comicObject.comicName,
//          comicType: this.comicObject.comicType,
//          comicArea: this.comicObject.comicArea,
          },
          {
            hander: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        ).then(function (res) {
          if (res.data.length > 0) {
            _this.comicList = res.data;
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      },
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
      },
      goback() {
        this.$router.go(-1);
      }
    },
    watch: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
  #lovelist {
    background-color: #F5F5F5;
    margin-top: 45px;
    .back {
      position: fixed;
      top: 80px;
      left: 5px;
      width: 40px;
      height: 40px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      color: #fff;
      z-index: 100;
    }
    .title {
      font-size: 20px;
      padding-left: 10px;
      background: #cccccc;
      color: #000;
      height: 30px;
      line-height: 30px;
    }
    .content {
      @subheight: 134px;
      margin-bottom: 48px; /*避免底端菜单栏阻挡*/
      .child {
        position: relative;
        background-color: #fff;
        margin: 10px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px, rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;
        overflow: hidden;
        .left {
          flex: 0 0 100px;
          float: left;
          width: 100px;
          height: @subheight;
          background-color: greenyellow;
        }
        .right {
          float: left;
          flex: 1;
          width: 70%;
          margin-left: 5px;
          .name {
            height: @subheight / 3;
            line-height: @subheight / 3;
            .tagname {
              display: inline-block;
              float: left;
              font-size: 18px;
              font-weight: bold;
              max-width: 170px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .name-loge {

            }
          }
          .type {
            height: @subheight / 3;
            line-height: @subheight / 3;
          }
          .area {
            height: @subheight / 3;
            line-height: @subheight / 3;
          }
        }
      }
    }
  }
</style>
