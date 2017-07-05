<template>
  <div id="detailpage">
    <div class="back icon-arrow_lift" @click="goback"></div>
    <div class="title-box">
      <div class="top">
        <div class="left">
          <img :src="comicObject.comicCoverImg" alt="" width="100%" height="100%">
        </div>
        <div class="right">
          <p class="name">
            <span class="tagname">{{comicObject.comicName}}</span>
            <span v-show="comicObject.comicFinish" class="name-loge">{{comicObject.comicFinish?'完结':'未完结'}}</span>
          </p>
          <p class="type">类型：{{comicObject.comicType}}</p>
          <p class="area">地区：{{comicObject.comicArea}}</p>
          <p class="lastupdate">更新：{{comicObject.comicLastUpdate}}</p>
        </div>
      </div>
      <div class="detailContent">
        <p class="d-nowrap-show" :class="{'d-nowrap-hiden':isShow}">
          {{comicObject.comicDes}}
        </p>
        <span class="showicon" :class="{'icon-down':isShow,'icon-up':!isShow}" @click="showcontent"></span>
      </div>
    </div>
    <div class="toolbar">
      <el-button type="danger" class="leftbtn" @click="gotoComic(comicObject.comicName, comicObject.comicList[0].id)">
        阅读
      </el-button>
      <el-button type="info" class="rightbtn"
                 @click="gotoLove(
                 comicObject.comicCoverImg,
                 comicObject.comicName,
                 comicObject.comicType,
                 comicObject.comicArea,
                 comicObject.comicList[0].id)">
        {{flage?'收藏':'取消收藏'}}
      </el-button>
    </div>
    <commontab :comicObject="comicObject"></commontab>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../../common/js/commonVue';
  export default{
    data() {
      return {
        isShow: {
          type: Boolean,
          default: false
        },
        comicObject: {
          type: Object,
          default: {
            comicName: '漫画名',
            comicType: '热血骚年',
            comicArea: '地区',
            comicFinish: 'false',
            comicDes: '这里是描述',
            comicList: [1, 2, 3, 4]
          }
        },
        localstorage: window.localStorage,
        sessionstorage: window.sessionStorage,
        loveList: Array,
        flage: true,
      }
    },
    mounted() {
      bus.$on('ComicObj', function (comicObj) {
        this.comicObject = comicObj;
        this.flage = comicObj.comicIfLove;
      }.bind(this));
      var _this = this;
    },
    methods: {
      showcontent() {
        this.isShow = !this.isShow;
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
      gotoComic(name, id) {
        this.$ajax({
          method: 'get',
          url: '/comic/chapterContent?' +
          'comicName=' + name + '&' +
          'id=' + id + '&' +
          'key=76fc44f8859d2e43c67dd4454f0c0c56'//appkey
        }).then(function (res) {
          if (res.status == 200) {
            var _imgList = new Array();//组合单独的图片数组
            var imgArray = res.data.result.imageList;//获取的图片数组
            var length = imgArray.length;
            //内容图片
            for (var i = 0; i < length; i++) {
              _imgList[i] = imgArray[i].imageUrl;
            }
            msglist(_imgList);
          } else {
            console.log('漫画集数请求失败！')
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
        function msglist(_imgList) {//传递图片数组
          bus.$emit('imglist', _imgList);
        }

        this.$router.push('/home/comicbrowsing');
      },
      deleLove(comicCoverImg, comicName, comicType, comicArea, id) {
        if (this.getUser() === '请登录') {
          this.$message.error('请先登录在评论');
          return;
        }
        var params = {
          user: this.getUser(),
          comicCoverImg: comicCoverImg,
          comicName: this.comicObject.comicName,
          comicType: comicType,
          comicArea: comicArea,
        }
        this.$ajax.post(//用户注册
          '/removelove',
          params,
          {
            hander: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        ).then(function (res) {
          if (res.data.insertedCount === 1) {

          } else {

          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      },
      insertLove(comicCoverImg, comicName, comicType, comicArea, id) {
        if (this.getUser() === '请登录') {
          this.$message.error('请先登录在评论');
          return;
        }
        var params = {
          user: this.getUser(),
          comicCoverImg: comicCoverImg,
          comicName: this.comicObject.comicName,
          comicType: comicType,
          comicArea: comicArea,
        }
        this.$ajax.post(//用户注册
          '/insertlove',
          params,
          {
            hander: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        ).then(function (res) {
          if (res.data.insertedCount === 1) {

          } else {

          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      },
      gotoLove(comicCoverImg, comicName, comicType, comicArea, id) {
        if (this.flage) {
          this.insertLove(comicCoverImg, comicName, comicType, comicArea, id)
        } else {
          this.deleLove(comicCoverImg, comicName, comicType, comicArea, id)
        }
        this.flage = !this.flage;
      },
      goback() {
        this.$router.go(-1);
      }
    },
    computed: {},
    components: {
      commontab: require('../publicComponents/CommonTabs.vue')
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #detailpage {
    margin-bottom: 50px;
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
      z-index: 300;
    }
    .title-box {
      @subheight: 170px;
      .top {
        display: flex;
        flex-direction: row; //左右排列
        .left {
          flex: 0 0 130px;
          width: 130px;
          height: @subheight;
          background-color: greenyellow;
          margin-left: 10px;
          img {
            border-radius: 8px;
          }
        }
        .right {
          flex: 1;
          width: 70%;
          margin-left: 15px;
          height: @subheight;
          .name {
            height: @subheight / 4;
            line-height: @subheight / 4;
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
          p {
            height: @subheight / 4;
            line-height: @subheight / 4;
          }
        }
      }
      .detailContent {
        .d-nowrap-show {
          text-indent: 15px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          display: -moz-box;
          -webkit-box-orient: vertical;
        }
        .showicon {
          margin-top: 10px;
          display: block;
          text-align: center;
        }
        .d-nowrap-hiden {
          /*限制显示行数*/
          -webkit-line-clamp: 2;
        }
      }
    }
    .sorce {
      width: 90px;
      position: relative;
      .block {
        border: 1px solid #2dbcff;
        border-radius: 3px;
        width: 50px;
        text-align: center;
        margin: 10px auto;
        .top {
          background-color: #2dbcff;
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          height: 40px;
          line-height: 38px;
        }
      }
    }
    .toolbar {
      display: flex;
      height: 41px;
      padding: 10px;
      .leftbtn {
        flex: 1;
        height: 41px;
      }
      .rightbtn {
        flex: 1;
        height: 41px;
      }
    }
  }
</style>
