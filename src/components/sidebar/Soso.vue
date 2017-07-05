<template>
  <homelistview :listItem="listItem"></homelistview>
</template>

<script type="text/ecmascript-6">
  import HomeListView from '../home/homecomponents/HomeListView.vue';
  import bus from '../../common/js/commonVue';
  export default{
    data() {
      return {
        listItem: {
          title: '搜索结果',
          contentData: Array
        }
      }
    },
    mounted() {
      this.getSosoDate(this.$route.query.text);//初始化时传入第一次搜索的参数
      bus.$on('soso', function (text) {
        console.log(text)
        this.getSosoDate(text);//
      }.bind(this))
    },
    methods: {
      getSosoDate(name) {
        var _this = this;
        let date = new Date();
        this.$ajax({
          method: 'get',
          url: '/comic/book?' +
          'name=' + name + '&' +
          'type=&' +
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
      }
    },
    components: {
      homelistview: HomeListView
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
