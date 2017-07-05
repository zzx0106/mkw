<template>
  <homelistview :listItem="listItem"></homelistview>
</template>

<script type="text/ecmascript-6">
  import HomeListView from './homecomponents/HomeListView.vue';
  export default{
    data() {
      return {
        listItem: {
          title: '青年热血漫画',
          contentData: Array
        }
      }
    },
    mounted() {
      var _this = this;
      let date = new Date();
      this.$ajax({
        method: 'get',
        url: '/comic/book?' +
        'name=&' +
        'type=%E9%9D%92%E5%B9%B4%E6%BC%AB%E7%94%BB&' +//uncode 为青年漫画
        'skip=&finish=&key=76fc44f8859d2e43c67dd4454f0c0c56'//appkey
      }).then(function (res) {
        console.log(res);
        if (res.status == 200) {
          var bookList = res.data.result.bookList;
          _this.listItem.contentData = bookList;
        } else {
          console.log('青年漫画请求失败！')
        }
      }).catch(function (err) {
        if (err) {
          console.log(err)
        }
      })
    },
    components: {
      homelistview: HomeListView
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
