<template>
  <div id="newdetail" :class="items">
    <iframe :src="url" frameborder="0"></iframe>
  </div>
</template>
<script type="text/ecmascript-6">
  import bus from '../../common/js/commonVue';
  export default{
    data() {
      return {
        geturl: '',
        url: items()
      }
    },
    computed: {
      items() {
        this.url = this.geturl;
        return this.url;
      }
    },
    mounted() {

      bus.$on('frameUrl', function (url) {
        this.geturl = url;
      }.bind(this))
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #newdetail {
    margin-top: 43px;
    height: 100%;
    width: 100%;
  }
</style>
