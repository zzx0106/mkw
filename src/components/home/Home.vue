<template>
  <div id="home">
    <tabs :homelist="homelist" v-on:listenHomeindex="listenHomeindex"></tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tabs from './homecomponents/HomeTabs.vue'

  export default{
    data() {
      return {
        homelist:[],
        nowIndex: 0
      }
    },
    mounted() {
    },
    methods: {
      listenHomeindex(data) {


      }
    },
    components: {
      tabs: Tabs
    }
  }
</script>

<style lang="less">
  #home{
    height:100%;
  }
</style>
