<template>
  <div id="tablelist">
    <ul class="table hide">
      <li v-for="(item,index) in comicList" class="list">
        <a>{{item}}</a>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      comicList:Array
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #tablelist{
    .hide {
      max-height: 215px;
      overflow: hidden;
    }
    .table{
      padding: 10px;
      padding-bottom: 0;
      .list{
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
</style>
