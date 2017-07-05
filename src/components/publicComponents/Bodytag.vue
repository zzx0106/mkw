<template>
  <div id="body">
    <!--表格布局-->
    <div class="top clearfix">
      <div class="left-tag clearfix">
        <span class="left-icon"></span>
        <span class="title" v-html="itemTitle"></span>
      </div>
      <div class="right-tag clearfix">
        <span class="change-tag" @click="changeIndex">换一批</span>
        <span class="icon-loop2"></span>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li class="one-tag" v-for="item in getIndex" @click="gotolink(item.coverImg,
      item.name,
      item.type,
      item.area,
      item.des,
      item.finish,
      item.lastUpdate)">
          <div class="img-tag">
            <img :src="item.coverImg" alt="" width="100%" height="100%">
          </div>
          <span class="title">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Today from '../../components/home/data/Today.json'
  import GuoChan from '../../components/home/data/GuoChan.json'
  import bus from '../../common/js/commonVue'
  export default{
    props: {
      msgData: Array,
      itemTitle: ''
    },
    data() {
      return {
        nowIndex: 6
      }
    },
    computed: {
      getIndex() {
        var _arr = new Array();
        for (var i = this.nowIndex - 6; i < this.nowIndex; i++) {
          _arr[i - this.nowIndex + 6] = this.msgData[i];
        }
        return _arr;
      }
    },
    methods: {
      changeIndex() {
        if (this.nowIndex === this.msgData.length) {
          this.nowIndex = 6;
          return;
        }
        this.nowIndex += 6;
      },
      haveLove(comicCoverImg, callback) {
        var _this = this;
        this.$ajax.post(
          '/findlove',
          {
//          user: this.getUser(),
            comicCoverImg: comicCoverImg,
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
          callback(res);
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      },
      gotolink(coverImg, name, type, area, des, finish, lastUpdate) {
        var _this = this;
        var ifLove = true;
        var bodytagShowComent = false;
        this.haveLove(coverImg, function (res) {
          for (var i = 0; i < res.data.length; i++) {
            if (coverImg === res.data[i].comicCoverImg) {
              ifLove = false;
            }
          }
          _this.$ajax({
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
                comicIfLove: ifLove,
                comicList: res.data.result.chapterList,//得到集数数组
                bodytagShowComent :bodytagShowComent//用来每次切换都隐藏评论
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

          _this.$router.push('/home/detailpage');
        });

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #body {
    position: relative;
    /*width:96%;*/
    margin: 30px auto 10px auto;
    .top {
      width: 100%;
      height: 50px;
      line-height: 50px;
      box-sizing: border-box;
      background: #fff;
      margin: 0 auto;
      .left-tag {
        float: left;
        height: 50px;
        .title {
          font-size: 15px;
          vertical-align: top;
          margin-left: 6px;
          font-weight: bold;
        }
      }
      .right-tag {
        float: right;
        height: 50px;
        .change-tag {
          font-size: 10px;
          color: lightskyblue;
        }
        .icon-loop2 {
          font-size: 10px;
          color: lightskyblue;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 400px;;
      background-color: #F1F1F1;
      .one-tag {
        width: calc(~"33.33333333%");
        height: 200px;
        box-sizing: border-box;
        padding: 0 .1rem 1rem;
        border-radius: 5px;
        font-size: 13px;
        background: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px, rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;
        float: left;
        text-align: center;
        .img-tag {
          width: 100%;
          height: 150px;
          background: greenyellow;
        }
        .title {
          display: block;

        }
        .content {
          display: block;
          font-size: 12px;
        }

      }
    }
  }
</style>
