<template>
  <div id="commontabs">
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="话" name="first" class="tab">
        <div id="tablelist">
          <ul class="table hide">
            <li v-for="(item,index) in reverseOrder" class="list">
              <a @click="gotoComic(comicObject.comicName, item.id)">{{item.name}}</a>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评论" name="third" class="tab" >
        <commenttag :comicObject="comicObject" :ifs="false"></commenttag>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  import bus from '../../common/js/commonVue';
  export default {
    props: {
      comicObject: Object
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    mounted() {

//      checkcontent() {
//
//      }
    },
    methods: {
      gotoComic(name, id) {
        this.$ajax({
          method: 'get',
          url: '/comic/chapterContent?' +
          'comicName=' + name + '&' +
          'id=' + id + '&' +
          'key=76fc44f8859d2e43c67dd4454f0c0c56'//appkey
        }).then(function (res) {
          if (res.status == 200) {
            var _imgList = new Array();//组合单独的图片数组
            var imgArray = res.data.result.imageList;//获取的图片数组
            var length = imgArray.length;
            //内容图片
            for (var i = 0; i < length; i++) {
              _imgList[i] = imgArray[i].imageUrl;
            }
            msglist(_imgList);
          } else {
            console.log('漫画集数请求失败！')
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
        function msglist(_imgList) {//传递图片数组
          bus.$emit('imglist', _imgList);
        }
        this.$router.push('/home/comicbrowsing');
      }
    },
    computed: {
      reverseOrder() {
        return this.comicObject.comicList;//正常返回1 2 3 4 5
      }
    },
    components: {
      commenttag: require('../publicComponents/CommentTag.vue')
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  #commontabs {
    margin-top: 100px;
    .tabs {
      width: 100%;
      text-align: center;
      .el-tabs__nav {
        width: 100%;
      }
      .el-tabs__item {
        width: 50%;
      }
      .is-active {
        color: #5B5B5B;
      }
      .el-tabs__active-bar {
        background: #5B5B5B;
      }
    }
  }

  #tablelist {
    .hide {
      max-height: 215px;
      overflow: hidden;
    }
    .table {
      padding: 10px;
      padding-bottom: 0;
      .list {
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
