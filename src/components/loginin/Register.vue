<template>
  <div id="register">
    <div class="head">
      <el-row id="header">
        <el-col :span="4"><i class="icon-arrow_lift" @click="goBack()"></i></el-col>
        <el-col :span="16"><h1>账号注册</h1></el-col>
        <el-col :span="4" class="toregist"></el-col>
      </el-row>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" id="body">
        <el-form-item prop="user">
          <el-input v-model="ruleForm2.user" auto-complete="off" placeholder="昵称" ></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="ruleForm2.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model.number="ruleForm2.password" placeholder="密码/必须以英文开头和数字组合"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input type="password" v-model.number="ruleForm2.repassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button class="reset" @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'));
        }
        setTimeout(() => {
          var _this = this;
          //延迟查询昵称重复
          this.$ajax.post(
            '/find',
            {user: value},
            {
              hander: {
                'Content-Type': 'application/x-www-form-urlencoded',
              }
            }
          ).then((res) => {
            if (res.status === 200) {
              if (res.data.length != 0) {
                return callback(new Error('该昵称已被注册'));
              } else {
                return callback();
              }
            } else {
              return callback(new Error('请求错误'));
            }
          }).catch(function (err) {
            if (err) {
              console.log(err)
              return callback();
            }
          });
        }, 1000);
      };
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          //延迟查询账号重复
          this.$ajax.post(
            '/find',
            {username: value},
            {
              hander: {
                'Content-Type': 'application/x-www-form-urlencoded',
              }
            }
          ).then(function (res) {
            if (res.status === 200) {
              if (res.data.length != 0) {
                return callback(new Error('该账号已被注册'));
              } else {
                return callback();
              }
            } else {
              return callback(new Error('请求错误'));
            }
          }).catch(function (err) {
            if (err) {
              console.log(err)
              return callback();
            }
          });
        }, 1000);
      };
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
      var checkRepassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          user: '',
          username: '',
          password: '',
          repassword: ''
        },
        rules2: {
          user: [
            {validator: checkUser, trigger: 'blur'}
          ],
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          password: [
            {validator: checkPassword, trigger: 'blur'}
          ],
          repassword: [
            {validator: checkRepassword, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              user: _this.ruleForm2.user,
              username: _this.ruleForm2.username,
              password: _this.ruleForm2.password,
            }
            this.$ajax.post(//用户注册
              '/insert',
              params,
              {
                hander: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
              }
            ).then(function (res) {
              if (res.data.insertedCount === 1) {
                _this.$message({
                  message: '恭喜你，注册成功',
                  type: 'success'
                });
                _this.$router.go(-1);//跳回登录界面
              } else {
                _this.$message.error('注册失败了老哥');
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
