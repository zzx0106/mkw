<template>
  <div id="today">
    <banner></banner>
    <bodytag :msgData="Today" :itemTitle="title.TodayTitle"></bodytag>
    <bodytag :msgData="GuoChan" :itemTitle="title.GuoChanTitle"></bodytag>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from './homecomponents/Homebanner.vue'
  import bodytag from '../publicComponents/Bodytag.vue'
  import Today from '../../components/home/data/Today.json'
  import GuoChan from '../../components/home/data/GuoChan.json'
  export default{
    data() {
      return {
        Today: Today,
        GuoChan: GuoChan,
        title: {
          TodayTitle:'今日推荐',
          GuoChanTitle:'国产热门'
        }
      }
    },
    mounted() {

    },
    components: {
      banner,
      bodytag
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #today {
    margin-bottom: 64px;
  }
</style>
