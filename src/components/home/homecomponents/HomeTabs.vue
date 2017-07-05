<template>
  <div id="tabs">
    <div class="nav-tabs">
      <div class="home-router-list">
        <router-link to="/home/today" @click.native="changeindex(0)">今日推荐</router-link>
        <router-link to="/home/youngsters" @click.native="changeindex(1)">热血青年</router-link>
        <router-link to="/home/younggirl" @click.native="changeindex(2)">少女漫画</router-link>
        <router-link to="/home/horror" @click.native="changeindex(3)">恐怖漫画</router-link>
      </div>
      <div class="home-router-indexline">
        <a :class="{'router-line-active':isindex == 0}"></a>
        <a :class="{'router-line-active':isindex == 1}"></a>
        <a :class="{'router-line-active':isindex == 2}"></a>
        <a :class="{'router-line-active':isindex == 3}"></a>
      </div>
    </div>
    <div class="viewport">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isindex: 0
      };
    },
    mounted() {

    },
    methods: {
      changeindex(index) {
        this.isindex = index
      }
    },
    computed: {},
    components: {}
  };
</script>

<style lang="less" rel="stylesheet/less">
  #tabs {
    height: 100%;
    .nav-tabs {
      position: fixed;
      top: 35px;
      width: 100%;
      background-color: #fff;
      z-index: 100;
      .home-router-list {
        width: 100%;
        height: 30px;
        display: flex;
        text-align: center;
        a {
          height: 30px;;
          flex: 1;
        }
      }
      .home-router-indexline {
        height: 2px;
        display: flex;
        margin-bottom: 10px;
        a {
          flex: 1;
          padding: 0 5px;
          box-sizing: border-box;
          display: inline-block;
          height: 2px;
        }
        .router-line-active {
          background: blue;
        }
      }
    }
    .viewport {
      margin-top: 82px;
      height: 100%;
    }
  }


</style>
