<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_avatar">
        <img src="../assets/logo.png" alt />
      </div>
      <div id="form">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'zs',
        password: 123
      },
      // 登录调单校验规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '用户名为3-5位', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async flag => {
        console.log(flag)
        if (!flag) {
          return
        }
        let res = await this.$http.post('login', this.loginForm)
        if (res.data.meta.status == '200') {
          this.$message.success('登录成功')
          this.$storage.setSession('token', res.data.data.token)
          this.$router.push('/home')
        } else {
          this.$message.error('登录失败')
        }
        console.log(res)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login_container {
  height: 100%;
  background-color: rgb(142, 142, 201);
}
.login_box {
  width: 450px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 3px;
  .login_avatar {
    width: 150px;
    height: 150px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
