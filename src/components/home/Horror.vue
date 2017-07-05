<template>
  <listview :listItem="listItem"></listview>
</template>

<script type="text/ecmascript-6">
  import ListView from '../publicComponents/ListView.vue';
  import {formatDate} from '../../common/js/getTime';
  export default{
    data() {
      return {
        listItem: {
          title: '恐怖漫画',
          hasend: '完结',
          tag1: '鬼故事',
          contentData: Array
        }
      }
    },
    mounted() {
      var _this = this;
      var date = new Date();
      this.$ajax({
        method: 'get',
        url: 'https://route.showapi.com/958-1?' +
        'page=1&' +
        'showapi_appid=35775&' +//易源应用id
        'showapi_test_draft=false&' +
        'showapi_timestamp=' + formatDate(date, 'yyyyMMddhhmmss') + '&' +//当前时间
        'type=/category/weimanhua/kbmh&'+//需要type
        'showapi_sign=0620000dbc3e41dc8100928f82730782',//apikey
      }).then(function (res) {
        if (res.data.showapi_res_code === 0) {
          //漫画内容
          var _count = res.data.showapi_res_body.pagebean.contentlist
          //漫画条数
          var _length = res.data.showapi_res_body.pagebean.contentlist.length;
          var dataArr=new Array()
          for (var i = 0; i < _length; i++) {
            var _data=new Array()
            _data[0]=_count[i].id;
            //删除 《》
            _data[1]=_count[i].title.substring(_count[i].title.indexOf('《')+1, _count[i].title.indexOf('》') );
            _data[2]=_count[i].thumbnailList[0];
            _data[3]='horror';
            dataArr[i]=_data;
          }
          _this.listItem.contentData = dataArr;
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
      listview: ListView
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
