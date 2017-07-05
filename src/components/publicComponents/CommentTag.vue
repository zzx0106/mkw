<template>
  <div id="commenttag">
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="评论一个？"
      v-model="textarea">
    </el-input>
    <div class="bottom-btn">
      <div class="submit" @click="textSubmit">发送</div>
    </div>
    <div class="showcontent" @click="checkcontent">
      展开评论
    </div>
    <ul class="list" v-show="comicObject.bodytagShowComent">
      <li class="d-item" v-for="(item,index) in newtitlearr.length" :class="{'hiden-item':!newtitlearr[index]}">
        <img class="avatar" src="http://js16.tel.cdndm.com/v201704191940/blue/images/mrtx.gif"/>
        <div class="top-border d-item-content">
          <p class="title">
            <span class="d-nowrap n">
            {{conentList[index]?conentList[index].user:""}}
            </span>
            <span class="d-fr">
              <a href="javascript:window.location.href='/login/';" pid="4789683">
                <span class="icon-chat3"></span>
                回复
              </a>
              <a href="javascript:window.location.href='/login/';" id="support_4789683">
                <span class="icon-zan"></span>
                <span>0</span>
              </a>
            </span>
          </p>
          <p class="subtime">{{newtitlearr[index]?newtitlearr[index][1]:""}}</p>
          <p class="content">{{newtitlearr[index]?newtitlearr[index][0]:""}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/getTime';
  import {getMD5} from '../../common/js/getMD5';
  export default{
    props: {
      comicObject: Object,
      ifs: Boolean
    },
    data() {
      return {
        textarea: '',
        isshow: false,
        localstorage: window.localStorage,
        sessionstorage: window.sessionStorage,
        conentList: Array,
        newtitlearr: Array
      }
    },
    mounted() {
    },
    methods: {
      getUser() {
        var userlocal = this.localstorage.getItem('user');
        var usersession = this.sessionstorage.getItem('user');
        //登录验证
        if (userlocal) {
          return userlocal;
        } else if (usersession) {
          return usersession;
        } else {
          return '请登录';
        }
      },
      textSubmit() {
        if (this.getUser() === '请登录') {
          this.$message.error('请先登录在评论');
          return;
        }
        var date = new Date();
        var params = {
          user: this.getUser(),
          comicName: this.comicObject.comicName,
          comicLastUpdate: this.comicObject.comicLastUpdate,
          content: this.textarea,
          dateTime: formatDate(date, 'yyyyMMdd')
        }
        this.$ajax.post(//用户注册
          '/update',
          params,
          {
            hander: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        ).then(function (res) {
          if (res.data.insertedCount === 1) {

          } else {

          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      },
      checkcontent() {
        this.comicObject.bodytagShowComent = !this.comicObject.bodytagShowComent;
        var _this = this;
        var params = {
          comicName: this.comicObject.comicName,
          comicLastUpdate: this.comicObject.comicLastUpdate
        };
        var title = getMD5(params.comicName + "" + params.comicLastUpdate + "");
        this.$ajax.post(//查看用户评论
          '/findcontent',
          params,
          {
            hander: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        ).then(function (res) {
          if (res.data.length > 0) {
            _this.conentList = res.data;//评论数组
            var cont = res.data[0][title];//获取单个评论可以用13579来代表评论2468代表时间
            var newtitlearr = new Array();
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i][title]) {
                newtitlearr[i] = res.data[i][title];
              }
            }
            _this.newtitlearr = newtitlearr;
          } else {

          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #commenttag {
    text-align: left;
    .el-textarea__inner {
      height: 80px !important;
    }
    .hiden-item {
      display: none !important;
    }
    .bottom-btn {
      height: 30px;
      position: relative;
      .submit {
        width: 95px;
        border-radius: 3px;
        height: 35px;
        position: absolute;
        background: rgb(32, 160, 255);
        right: 0;
        color: #ffffff;
        text-align: center;
        line-height: 35px;
      }
    }
    .showcontent {
      text-align: center;
      background: rgba(0, 0, 0, .1);
      display: block;
      height: 30px;
      line-height: 30px;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .list {
      margin: 0;
      padding: 0;
      padding-top: 5px;
      .d-item {
        display: flex;
        padding: 5px 10px;
        .avatar {
          box-sizing: border-box;
          vertical-align: middle;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          margin-right: 10px;
          margin-top: 10px;

        }
        .d-item-content {
          flex: 1;
          padding-top: 5px;
          border-top: none;
          padding-top: 5px;
          border-top: 1px solid rgb(218, 218, 218);
          .title {
            color: #444;
            font-size: 15px;
            .n {
              box-sizing: border-box;
              display: inline-block;
              width: 50%;
            }
            .d-fr {
              float: right;
              a {
                color: #767676;
                font-size: 13px;
                margin-left: 10px;
                .icon-zan {
                  font-size: 15px;
                }
              }
            }
          }
          .subtime {
            color: #bababa;
            font-size: 13px;
          }
          .content {
            color: #767676;
            font-size: 13px;
            line-height: 18px;
            padding-top: 5px;
          }
        }
      }
    }
    .d-nowrap {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
