<template>
  <div id="homelistview">
    <h1 class="title">{{listItem.title}}</h1>
    <ul class="content">
      <li @click="gotolink(item.coverImg,
      item.name,
      item.type,
      item.area,
      item.des,
      item.finish,
      item.lastUpdate)"
          v-for="(item ,index) in listItem.contentData"
          class="child clearfix">
        <div class="left">
          <img :src="item.coverImg" alt="" width="100%" height="100%">
        </div>
        <div class="right">
          <p class="name">
            <span class="tagname">{{item.name}}</span>
            <span v-show="item.finish" class="name-loge">{{item.finish?'完结':'未完结'}}</span>
          </p>
          <p class="type">类型：{{item.type}}</p>
          <p class="area">地区：{{item.area}}</p>
          <p class="lastupdate">更新：{{item.lastUpdate}}</p>
          <p class="des">描述：{{item.des}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../../../common/js/commonVue';
  export default{
    props: {
      listItem: {
        type: Object
      }
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
      }
    },
    watch: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
  #homelistview {
    background-color: #F5F5F5;
    margin-top: 45px;
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
            height: @subheight / 5;
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
            height: @subheight / 5;
          }
          .lastupdate {
            height: @subheight / 5;
          }
          .area {
            height: @subheight / 5;
          }
          .des {
            height: @subheight / 5;
            width: 70%;
            bottom: 10px;
            position: absolute;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
