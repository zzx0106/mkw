<template>
  <div id="listview">
    <h1 class="title">{{listItem.title}}</h1>
    <ul class="content">
      <li @click="gotolink(item[0],item[3])" v-for="(item ,index) in listItem.contentData" class="child clearfix">
        <div class="left">
          <img :src="item[2]" alt="" width="100%" height="100%">
        </div>
        <div class="right">
          <p class="name">
            <span class="tagname">{{item[1]}}</span>
            <span v-show="listItem.hasend" class="name-loge">{{listItem.hasend}}</span>
          </p>
          <p class="type">标签分类：{{listItem.tag1}}</p>
          <p class="area">内容介绍：{{listItem.tag2?listItem.tag2:'暂无'}}</p>
          <p class="des">{{listItem.tag3}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../../common/js/commonVue';
  import {formatDate} from '../../common/js/getTime';
  export default{
    props: {
      listItem: {
        type: Object
      }
    },
    methods: {
      gotolink(id, type) {
        var _this = this;
        //发送监听并请求
        let date = new Date();

        /**
         * horror的图片请求
         */
        if (type === 'horror') {
          this.$ajax({
            method: 'get',
            url: 'https://route.showapi.com/958-2?' +
            'page=1&' +
            'id=' + id + '&' +
            'showapi_appid=35775&' +//易源应用id
            'showapi_test_draft=false&' +
            'showapi_timestamp=' + formatDate(date, 'yyyyMMddhhmmss') + '&' +//当前时间
            'showapi_sign=0620000dbc3e41dc8100928f82730782',//apikey
          }).then(function (res) {
            if (res.data.showapi_res_code === 0) {
              //内容图片
              var _imgList = res.data.showapi_res_body.item.imgList;//得到图片数组
              msglist(_imgList);
            } else if (res.data.showapi_res_code === -1) {
              console.log('系统调用错误')
            } else if (res.data.showapi_res_code === -2) {
              console.log('可调用次数或金额为0')
            } else if (res.data.showapi_res_code === -3) {
              console.log('读取超时')
            } else if (res.data.showapi_res_code === -1000) {
              console.log('系统维护')
            } else if (res.data.showapi_res_code === -1005) {
              console.log('showapi_timestamp无效')
            } else if (res.data.showapi_res_code === -4) {
              console.log('服务端返回数据解析错误')
            }
          }).catch(function (err) {
            if (err) {
              console.log(err)
            }
          })
        }

        function msglist(_imgList) {//传递图片数组
          bus.$emit('imglist', _imgList);
        }

        this.$router.push('/home/comicbrowsing');
      }
    },
    watch: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
  #listview {
    background-color: #F5F5F5;
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
            height: @subheight / 4;
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
            height: @subheight / 4;
          }
          .area {
            height: @subheight / 4;
          }
          .des {
            height: @subheight / 4;
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
