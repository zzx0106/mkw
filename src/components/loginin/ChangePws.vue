<template>
  <div id="register">
    <div class="head">
      <el-row id="header">
        <el-col :span="4"><i class="icon-arrow_lift" @click="goBack()"></i></el-col>
        <el-col :span="16"><h1>密码修改</h1></el-col>
        <el-col :span="4" class="toregist"></el-col>
      </el-row>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" id="body">
        <el-form-item prop="password">
          <el-input type="password" v-model.number="ruleForm2.password" placeholder="密码/必须以英文开头和数字组合"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button class="reset" @click="goBack()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      var checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/.test(value)) {//判断必须是英文和数字组合
          callback(new Error('密码必须是英文开头和数字组合'));
        } else if (value.split('').length < 6) {
          callback(new Error('密码必须长度大于6个字'));
        } else {
          callback();
        }
      };
      return {
        localstorage: window.localStorage,
        sessionstorage: window.sessionStorage,
        ruleForm2: {
          password: ''
        },
        rules2: {
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
      getUser() {
        var userlocal = this.localstorage.getItem('user');
        var usersession = this.sessionstorage.getItem('user');
        if (userlocal) {
          return userlocal;
        } else if (usersession) {
          return usersession;
        } else {
          return '请登录';
        }
      },
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              user: _this.getUser(),
              pwd: _this.ruleForm2.password,
            }
            this.$ajax.post(//用户注册
              '/changepwd',
              params,
              {
                hander: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
              }
            ).then(function (res) {
              if (res.data.nModified === 1) {
                _this.$message({
                  message: '恭喜你，修改成功',
                  type: 'success'
                });
                _this.$router.go(-1);//跳回登录界面
              } else {
                _this.$message.error('修改失败了老哥');
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
  #register {
    margin-top: 45px;
    .el-form-item__content {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
</style>
