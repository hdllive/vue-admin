<template>
  <div>
    <div class="login-container">
      <div class="form-box">
        <div class="title"><h1>后台管理系统</h1></div>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              @keyup.native.enter="login"
            ></el-input>
          </el-form-item>
          <el-form-item class="btn-item">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', tirgger: 'blur' },
          { min: 3, max: 8, message: '长度为3-8位之间', tirgger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', tirgger: 'blur' },
          { min: 3, max: 8, message: '长度为3-8位之间', tirgger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    async login () {
      // 二次校验，手动校验
      try {
        await this.$refs.loginFormRef.validate()
        try {
          const res = await login(this.loginForm)
          console.log(res)
          // tokon数据持久化
          if (res.data.meta.msg === '用户名不存在') {
            this.$message.error('用户名不存在，请重试')
          } else if (res.data.meta.msg === '密码错误') {
            this.$message.error('密码错误，请重试')
          } else {
            this.$message({
              message: '登录成功！',
              type: 'success'
            })
            this.$store.commit('setToken', res.data.data.token)
            this.$store.commit('setTime')
            this.$router.push('/home')
          }
        } catch (err) {
          console.log(err)
        }
        console.log('校验成功')
      } catch (err) {
        this.$message.error('校验失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 450px;
    height: 240px;
    background-color: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
  .title {
    text-align: center;
    margin-bottom: 8px;
    h1 {
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
