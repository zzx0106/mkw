<template>
  <div id="classify">
    <ul class="clearfix" v-show="!isShowItemList">
      <li v-for="(item,index) in tagList" class="itemstyle" @click="gotoDetail(item)">
        {{item}}
      </li>
    </ul>
    <div class="back icon-arrow_lift" @click="goback" v-show="isShowItemList"></div>
    <div class="videolist" v-show="isShowItemList">
      <ul class="content">
        <li v-for="(item ,index) in itemList"
            class="child clearfix">
          <div class="top">
            <div class="left">
              <img :src="item.picUrl" alt="" width="100%" height="100%">
            </div>
            <div class="right">
              <p class="name">
                <span class="tagname">{{item.name}}</span>
                <span v-show="item.finish" class="name-loge">{{item.finish?'完结':'未完结'}}</span>
              </p>
              <p class="type">作者：{{item.author}}</p>
              <p class="num">更新至{{item.num}}集</p>
              <p class="type" v-html="item.type"></p>
              <p class="area">地区：{{item.area}}</p>
              <p class="update">更新：{{item.premiere}}</p>
            </div>
          </div>
          <div class="bottom">
            <span class="icon-open" @click='showItemContent(index)' :class="{'rotate':isShowItemContent}"></span>
          </div>
          <transition name="videolist">
            <videocommontabs :videolist="[item.detail,item.intro]"
                             :class="item.b258_updateTime+''"
                             ref="commontabs">

            </videocommontabs>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../../common/js/commonVue';
  import VideoCommonTabs from './VideoCommonTabs.vue';
  export default{
    props: {
      tagList: Array
    },
    data() {
      return {
        itemList: Array,
        isShowItemList: false,
        isShowItemContent: false,
        flage: false,
        oldIndex: 1000
      }
    },
    methods: {
      gotoDetail(item) {
        var _this = this;
        this.$ajax({//分类列表请求
          method: 'get',
          url: '/pdc?' +
          'partnerId=056caebdfb4ba7f4706cae014380afcd' +
          '&token=1cd54b3fdd8c5bac7d75121f314946da&' +
          'apiId=186&' +
          'name=&updateTime=&' +
          'type=' + item + '&' +
          'pn=0&' +
          'rn=20'
        }).then(function (res) {
          if (res.status == 200) {
            var list = res.data.result.data.dataList
            _this.itemList = list;
            _this.isShowItemList = true;
          } else {
            console.log('分类请求失败！')
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
      },
      showItemContent(index) {
        if (this.oldIndex === 1000) {//关闭上一次打开的
          this.$refs.commontabs[index].$el.style.display = 'block';//设置为显示
        } else {
          this.$refs.commontabs[this.oldIndex].$el.style.display = 'none';//设置为隐藏
          this.$refs.commontabs[index].$el.style.display = 'block';//设置为显示
        }
        this.oldIndex = index;
      },
      goback() {
        this.isShowItemList = !this.isShowItemList;
      }
    },
    components: {
      videocommontabs: VideoCommonTabs
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #classify {
    background: #F5F5F5;
    margin-bottom: 50px;
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
      z-index:100;
    }
    .itemstyle {
      float: left;
      height: 35px;
      border-radius: 4px;
      width: calc(~"25% - 6px");
      box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px, rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;
      margin: 3px;
      text-align: center;
      line-height: 35px;
      font-size: 15px;
      background: #ffffff;
    }
    .videolist {
      transition: 1s ease;
      transform: translateX(0, 100%, 0);
      &.videolist-enter, &.videolist-leave-to {
        transform: translateX(0, 0, 0);
      }
      .content {
        @subheight: 170px;
        margin-bottom: 48px; /*避免底端菜单栏阻挡*/
        .child {
          position: relative;
          background-color: #fff;
          margin: 10px;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          border-radius: 5px;
          box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px, rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;
          overflow: hidden;
          flex-direction: column; //上下排列
          .top {
            display: flex;
            flex-direction: row; //左右排列
            .left {
              flex: 0 0 130px;
              width: 130px;
              height: 170px;
              background-color: greenyellow;
              img {
                border-radius: 8px;
              }
            }
            .right {
              flex: 1;
              width: 70%;
              margin-left: 5px;
              .name {
                height: @subheight / 6;
                line-height: @subheight / 6;
                .tagname {
                  display: inline-block;
                  float: left;
                  font-size: 18px;
                  font-weight: bold;
                  max-width: 170px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .name-loge {

                }
              }
              p {
                height: @subheight / 6;
                line-height: @subheight / 6;
              }
            }
          }
          .bottom {
            width: 100%;
            height: 35px;
            border-radius: 5px;
            background-color: rgb(19, 206, 102);
            text-align: center;
            span {
              display: block;
              color: #ffffff;
              line-height: 35px;
            }
            .rotate {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
</style>
