<template>
  <div id="TodayList">
    <homelistview :listItem="listItem"></homelistview>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeListView from './HomeListView.vue';
  import bus from '../../../common/js/commonVue';
  export default{
    data() {
      return {
        listItem: {
          title: '今日推荐',
          contentData: Array
        }
      }
    },
    mounted() {
      bus.$on('TODY', function (name) {
        var _this = this;
        this.$ajax({
          method: 'get',
          url: '/comic/book?' +
          'name=' + name + '&' +//查询的漫画名称
          'type=&' +
          'skip=&finish=&key=76fc44f8859d2e43c67dd4454f0c0c56'//appkey
        }).then(function (res) {
          console.log(res);
          if (res.status == 200) {
            var bookList = res.data.result.bookList;
            _this.listItem.contentData = bookList;
          } else {
            console.log('漫画请求失败！')
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
      }.bind(this));

    },
    components: {
      homelistview: HomeListView
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
