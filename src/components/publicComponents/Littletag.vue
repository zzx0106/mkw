<template>
  <div :class="{'no-bottom-border':tagMessage.noBottom,'littletag':!tagMessage.noBottom}">
    <span class="icon " :class="tagMessage.svgIcon"></span>
    <span class="title">{{tagMessage.title}}</span>
    <span class="icon-keyboard_arrow_right goicon"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      tagMessage: {
        type: Object
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @height: 35px;
  .littletag {
    margin: 0 auto;
    width: 96%;
    height: @height;
    border-top: 0.5px solid #F5F5F5;
    border-bottom: 0.5px solid #F5F5F5;
    .icon {
      float: left;
      display: inline-block;
      height: @height;
      line-height: @height;
    }
    .title {
      float: left;
      display: inline-block;
      height: @height;
      line-height: @height;
      margin-left: 8px;
    }
    .goicon {
      float: right;
      display: inline-block;
      font-size: 25px;
      height: @height;
      line-height: @height;
      align-items: center;
    }
  }

  .no-bottom-border {
    margin: 0 auto;
    width: 96%;
    height: @height;
    border-top: 0.5px solid #F5F5F5;
    border-bottom: 0px solid #F5F5F5;
    .icon {
      float: left;
      display: inline-block;
      height: @height;
      line-height: @height;
    }
    .title {
      float: left;
      display: inline-block;
      height: @height;
      line-height: @height;
      margin-left: 8px;
    }
    .goicon {
      float: right;
      display: inline-block;
      font-size: 25px;
      height: @height;
      line-height: @height;
      align-items: center;
    }
  }
</style>
