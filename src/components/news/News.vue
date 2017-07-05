<template>
  <div id="new">
    <newstag :listItem="listItem"></newstag>
  </div>
</template>

<script type="text/ecmascript-6">
  import NewsTag from './NewsTag.vue';
  import {formatDate} from '../../common/js/getTime';
  export default{
    data() {
      return {
        listItem: {
          contentData: Array
        }
      }
    },
    mounted() {
      var _this = this;
      let date = new Date();
      this.$ajax({
        method: 'get',
        url: 'https://route.showapi.com/1061-1?' +
        'page=1&' +
        'showapi_appid=35775&' +//易源应用id
        'showapi_test_draft=false&' +
        'showapi_timestamp=' + formatDate(date, 'yyyyMMddhhmmss') + '&' +//当前时间
        'type=/category/weimanhua/kbmh&'+//需要type
        'showapi_sign=0620000dbc3e41dc8100928f82730782',//apikey
      }).then(function (res) {
        if (res.data.showapi_res_code === 0) {
          //漫画内容
          var _count = res.data.showapi_res_body.result
          _this.listItem.contentData = _count;
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
    },
    components: {
      newstag: NewsTag
    }
  }
</script>

<style lang="less">
  #new{
    height:100%;
    width: 100%;
  }
</style>
