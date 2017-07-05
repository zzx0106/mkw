<template>
  <div id="newtag" ref="newtag">
    <div class="back icon-arrow_lift" @click="goback" v-show="!isshow"></div>
    <ul class="content" v-show="isshow">
      <li @click="gotonewdetail(item.url)"
          v-for="(item ,index) in listItem.contentData"
          class="child clearfix">
        <div class="top">
          <p class="name">
            <span class="tagname">{{item.title}}</span>
          </p>
        </div>
        <div class="imgbox">
          <img :src="item.cover"
               alt="" width="100%" height="auto"/>
        </div>
        <div class="bottom">
          <p class="des">发布时间：{{item.time}}</p>
          <p class="area">简要：{{item.content}}</p>
        </div>
      </li>
    </ul>
    <iframe :src="gotourl" frameborder="0" width="100%" height="95%" v-show="!isshow"></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../../common/js/commonVue';
  export default{
    props: {
      listItem: {
        type: Object
      }
    },
    data() {
      return {
        gotourl: '',
        isshow: true
      }
    },
    beforeMount() {
//      bus.$emit('frameUrl', this.listItem);
    },
    mounted() {

    },
    update() {

    },
    methods: {
      gotonewdetail(url) {
        this.$refs.newtag.style.marginTop = '-16px';
        this.gotourl = url;
        this.isshow = !this.isshow;
      },
      goback() {
        this.isshow = !this.isshow;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #newtag {
    margin-top: 44px;
    background-color: #F5F5F5;
    height: 100%;
    width: 100%;
    .back{
      position: fixed;
      top: 45px;
      left: 5px;
      width: 40px;
      height: 40px;
      background: rgba(0,0,0,0.3);
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      color: #fff;
    }
    .content {
      position: relative;
      .child {
        background: #ffffff;
        margin: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px, rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;
        .top {
          font-weight: 800;
          font-size: 17px;
          padding-bottom: 5px;
        }
        .imgbox {
          width: 100%;
          img {
            border-radius: 8px;
          }
        }
        .bottom {
          padding-top: 5px;
          .des {
            font-size: 13px;
            color: #ccc;
            margin-bottom: 5px;
          }
          .area {
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
