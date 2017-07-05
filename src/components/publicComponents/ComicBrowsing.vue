<template>
  <div id="comicbrowsing">
    <div class="back icon-arrow_lift" @click="goback"></div>
    <!--<div class="changeview" @click="changeview()" v-show="!showThing">-->
      <!--向下翻页观看-->
    <!--</div>-->
    <div class="comic-swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in items" ref="setImgHeight">
          <img width="100%" height="auto" ref="getImgHeight"
               :src="item"
               class="swiper-lazy">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" id="comic-swiper-pagination"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from '../../../static/swiper'
  import bus from '../../common/js/commonVue';
  import jq from '../../../static/jquery-3.1.1.min';
  export default{
    data() {
      return {
        showThing: false,
        itemArray: [],
        showImgList: [],
        mSwiper: Object
      }
    },
    computed: {
      items() {
        this.showImgList = this.itemArray;
        return this.showImgList;
      }
    },
    mounted() {
      var _this = this;
      var i = 0;
      bus.$on('imglist', function (arraymsg) {
        this.showThing = false;
        this.itemArray = arraymsg;
      }.bind(this));
//        翻页
      var mySwiper = new Swiper('.comic-swiper-container', {
//        图片延迟加载后调用改变视口大小
        onLazyImageLoad: function(swiper, slide, image){
          _this.changeview(_this);
        },
        direction: 'vertical',//垂直翻页
        paginationType: 'fraction',//分页器类型
        pagination: '.swiper-pagination', // 如果需要分页器
        freeMode: true,//关闭惯性贴合
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        freeModeMomentumBounce: false,//动量反弹。false时禁用free模式下的动量反弹，slides通过惯性滑动到边缘时，无法反弹。注意与resistance（手动抵抗）区分。
        slidesPerView: 'auto',//auto'则自动根据slides的宽度来设定数量
        //延迟加载部分
        lazyLoading: true,//开启延迟加载
        lazyLoadingInPrevNext: true,//将延迟加载离slider最近的前一个和后一个，类似fragment
        lazyLoadingInPrevNextAmount: 3,//设置延迟加载几张图片（3张）
        lazyLoadingOnTransitionStart: true//设置在过度时就加载图片
      });
      this.mSwiper = mySwiper;
    },
    methods: {
      changeview(_this) {
        //给img外层div设置高度
        console.log('in')
        _this.showThing = !_this.showThing;
        var childHeight = (_this.$refs.getImgHeight[1].height - 2) + 'px';//计算高度
        for (var i = 0; i < _this.$refs.setImgHeight.length; i++) {
          _this.$refs.setImgHeight[i].style.height = childHeight
        }
        _this.mSwiper.update();//更新swiper
      },
      goback() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../static/swiper.css";

  #comicbrowsing {
    height: 100%;
    margin-top: 45px;
    margin-bottom: 500px;
    .back {
      position: fixed;
      top: 100px;
      left: 5px;
      width: 40px;
      height: 40px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      z-index: 200;
      color: #fff;
    }
    .changeview {
      position: fixed;
      top: 10%;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .4);
      z-index: 199;
      color: #fff;
      text-align: center;
      line-height: 15;
      font-size: 33px;
    }
    .comic-swiper-container {
      position: relative;
      width: 100%;
      height: 100%;
      .swiper-slide {
        /*position: relative;*/
        /*img {*/
          /*display: block;*/
          /*position: absolute;*/
          /*top: 50%;*/
          /*transform: translateY(-60%);*/

        /*}*/
      }
      #comic-swiper-pagination {
        position: fixed;
        right: 0;
        top: 40%;
        width: 17px;
        height: 60px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.4);
        color: #ffffff;
      }
    }
  }
</style>
