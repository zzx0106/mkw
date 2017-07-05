<template>
  <div id="loginin">
    <div class="head">
      <el-row id="header">
        <el-col :span="4"><i class="icon-arrow_lift" @click="goBack()"></i></el-col>
        <el-col :span="16"><h1>账号登录</h1></el-col>
        <el-col :span="4" class="toregist" @click.native="gotoregist">注册</el-col>
      </el-row>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" id="body">
        <el-form-item prop="username">
          <el-input v-model.number="ruleForm2.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model.number="ruleForm2.password" placeholder="密码/必须以英文开头和数字组合"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="checkbox">默认登录</el-checkbox>
        <el-form-item>
          <el-button class="submit" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button class="reset" @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
      <div id="footer">
        <div class="prompt">
          <span class="line"></span>
          <span>使用第三方账号登录</span>
          <span class="line"></span>
        </div>
        <div class="other-login">
          <span class="icon-qq"></span>
          <span class="icon-weixin"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error('账号不能为空'));
        } else {
          callback();
        }
      };
      var checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        checked: true,
        localstorage: window.localStorage,
        sessionstorage: window.sessionStorage,
        ruleForm2: {
          username: '',
          password: '',
        },
        rules2: {
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          password: [
            {validator: checkPassword, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      gotoregist() {
        this.$router.push('/register');
      },
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              username: _this.ruleForm2.username+"",
              password: _this.ruleForm2.password,
            }
            this.$ajax.post(//用户注册
              '/find',
              params,
              {
                hander: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
              }
            ).then(function (res) {
              if (res.data.length != 0) {
                _this.$message({
                  message: '恭喜你，登录成功3秒后刷新页面',
                  type: 'success'
                });
                if (_this.checked) {//如果默认登录的话就用localstroage
                  _this.localstorage.setItem('user',res.data[0].user);//存储
                }else{
                  _this.sessionstorage.setItem('user',res.data[0].user);//存储
                }
                _this.$router.go(-1);//跳回登录界面
                setTimeout(function () {//三秒后刷新页面，就会有localstorage
                  _this.$router.go(0);
                },3000)
              } else {
                _this.$message.error('检查下账号和密码老哥！');
              }
            }).catch(function (err) {
              if (err) {
                console.log(err)
              }
            });
          } else {
            console.log('提交有误');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #loginin {
    .toregist {
      color: #20a0ff;
    }
    #body {
      margin-top: 50px;
      .submit, .reset {
        float: left;
        margin: 5px;
        width: calc(~"50% - 10px");
      }
      .checkbox {
        margin-left: 5px;
      }
      .el-form-item__content {
        margin-left: 5px;
        margin-right: 5px;
      }

    }
    #footer {
      .prompt {
        text-align: center;
        font-size: 15px;
        .line {
          display: inline-block;
          width: 20%;
          background: #cccccc;
          height: 1px;
          margin-bottom: 3px;
        }
      }
      .other-login {
        margin: 20px auto;
        text-align: center;
        span {
          display: inline-block;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          text-align: center;
          line-height: 45px;
          color: #ffffff;
        }
        .icon-qq {
          font-size: 33px;
          margin-right: 5px;
          background-color: #A8DC32;
        }
        .icon-weixin {
          font-size: 33px;
          margin-left: 5px;
          background-color: #4C8BF5;
        }
      }
    }
  }
</style>
