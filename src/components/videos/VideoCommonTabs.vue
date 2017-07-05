<template>
  <div id="videocommontabs">
    <p class="title1">内容简介：</p>
    <p class="d-nowrap-show" v-html="videolist[1]">
    </p>
    <p class="title2">视频章节：</p>
    <div id="tablelist">
      <ul class="table">
        <li v-for="(item,index) in items" class="list">
          <a @click="gotoVideo(urls[index])">{{item}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../../common/js/commonVue';
  export default{
    props: {
      videolist: Array
    },
    data() {
      return {
        items: [],
        urls: []
      }
    },
    mounted() {
      //解析视频资源字符串
      var list = this.videolist[0].split('#@@#');
      var jishu = new Array();
      var url = new Array();
      list.forEach(function (item, index) {
        jishu[index] = item.split('|--|')[0];
        url[index] = item.split('|--|')[1];
      })
      this.items = jishu;
      this.urls = url;
    },
    methods: {
      gotoVideo(url) {
        this.getDate(url)
      },
      getDate(url) {//得到video的url
        var newTab = window.open('about:blank');//打开空页面
        var _this = this;
        this.$ajax({//分类列表请求
          method: 'get',
          url: '/pdc?' +
          'partnerId=056caebdfb4ba7f4706cae014380afcd&' +
          'token=1cd54b3fdd8c5bac7d75121f314946da&' +
          'apiId=187&' +
          'id=' + url
        }).then(function (res) {
          if (res.status == 200) {
            var _url = res.data.result.data.url
            newTab.location.href = _url + '';//将空页面加载
          } else {
            console.log('分类请求失败！')
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #videocommontabs {
    display: none;
    .title1, .title2 {
      font-size: 20px;
      font-weight: bold;
    }
    .d-nowrap-show {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    #tablelist {
      .hide {
        max-height: 215px;
        overflow: hidden;
      }
      .table {
        padding: 10px;
        padding-bottom: 0;
        .list {
          width: 25%;
          display: block;
          height: auto;
          float: left;
          box-sizing: border-box;
          text-align: center;
          font-size: 13px;
          padding: 5px;
          a {
            color: #444;
            border: 1px solid #eee;
            display: block;
            height: 30px;
            line-height: 30px;
            padding: 0 5px;
            border-radius: 3px;
          }
        }
      }
    }
  }
</style>
