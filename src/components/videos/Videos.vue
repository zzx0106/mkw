<template>
  <div id="video">
    <classify :tagList="tagList">
    </classify>
  </div>
</template>

<script type="text/ecmascript-6">
  import Classify from './Classify.vue';
  export default{
    data() {
      return {
        tagList: []
      }
    },
    mounted() {
      var _this = this;
      this.$ajax({//分类列表请求
        method: 'get',
        url: '/pdc?' +
        'partnerId=056caebdfb4ba7f4706cae014380afcd&' +//端口商号
        'token=1cd54b3fdd8c5bac7d75121f314946da&' + //	接口验证密钥
        'apiId=188'//	接口id
      }).then(function (res) {
        if (res.status == 200) {
          var list = res.data.result.data.dataList
          _this.tagList = list;
        } else {
          console.log('分类请求失败！')
        }
      }).catch(function (err) {
        if (err) {
          console.log(err)
        }
      })
    },
    methods: {},
    components: {
      classify: Classify
    }
  }
</script>

<style lang="less">
  #video {
    margin-top: 45px;
    background-color: #F1F1F1;
    height:100%;
    width:100%;
  }
</style>
