<template>
  <div id="homebanner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" ref="setImgHeight">
          <img src="../todayimgs/yqcr.jpg" alt="" width="100%" height="auto" @click="gotoDetail('一拳超人')">
          <span class="title">一拳超人</span>
        </div>
        <div class="swiper-slide" ref="setImgHeight">
          <img src="../todayimgs/yjdwb.jpg" alt="" width="100%" height="auto" @click="gotoDetail('妖精的尾巴')">
          <span class="title">妖精的尾巴</span>
        </div>
        <div class="swiper-slide" ref="setImgHeight">
          <img src="../todayimgs/tjzw.jpg" alt="" width="100%" height="auto" @click="gotoDetail('天降之物')">
          <span class="title">天降之物</span>
        </div>
        <div class="swiper-slide" ref="setImgHeight">
          <img src="../todayimgs/lnbfb.jpg" alt="" width="100%" height="auto" @click="gotoDetail('灵能百分百')">
          <span class="title">灵能百分百</span>
        </div>
        <div class="swiper-slide" ref="setImgHeight">
          <img src="../todayimgs/sjzl.jpg" alt="" width="100%" height="auto" @click="gotoDetail('食戟之灵')">
          <span class="title">食戟之灵</span>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" id="swiper-pagination"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from '../../../../static/swiper';
  import HomeListView from './HomeListView.vue';
  import bus from '../../../common/js/commonVue';
  export default{
    data() {
      return {}
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        paginationType: 'progress',//分页器类型
        pagination: '.swiper-pagination', // 如果需要分页器
        autoplay: 5000,//可选选项，自动滑动,
        loop: true//支持循环
      })
    },
    methods: {
      gotoDetail(name) {
        bus.$emit('TODY', name);
        this.$router.push('/home/todaylist');
      }
    },
    components: {
      homelistview: HomeListView
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../../static/swiper.css";

  .swiper-container {
    height: auto;
    .swiper-slide {
      position: relative;
      .title {
        display: block;
        color: #ffffff;
        height: 26px;
        width: 100%;
        text-align: center;
        background: rgba(69, 148, 246, 0.4);
        position: absolute;
        bottom: 3px;
      }
    }
  }
</style>
