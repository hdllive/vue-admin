<template>
  <el-container class="container">
    <el-header class="header">
      <h1>后台管理系统</h1>
      <el-button class="btn" size="medium" @click="dialogVisible = true"
        >退出</el-button
      >
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>您确定退出登录吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="cearlFn">确 定</el-button>
        </span>
      </el-dialog>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '43px' : '200px'" class="left">
        <button class="btn" @click="fold">
          <i class="el-icon-s-operation icon-btn"></i>
        </button>

        <el-menu
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          mode="vertical"
          :collapse="isCollapse"
          router
          :default-active="this.$route.path"
        >
          <el-submenu index="1">
            <template #title
              ><i class="el-icon-user-solid"></i>用户管理</template
            >
            <el-menu-item index="/users"
              ><i class="el-icon-menu"></i>用户列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template #title><i class="el-icon-s-tools"></i>权限管理</template>
            <el-menu-item index="/roles"
              ><i class="el-icon-menu"></i>角色列表</el-menu-item
            >
            <el-menu-item index="/rights"
              ><i class="el-icon-menu"></i>权限列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template #title><i class="el-icon-s-goods"></i>商品管理</template>
            <el-menu-item index="3-1"
              ><i class="el-icon-menu"></i>商品列表</el-menu-item
            >
            <el-menu-item index="3-1"
              ><i class="el-icon-menu"></i>分类参数</el-menu-item
            >
            <el-menu-item index="3-1"
              ><i class="el-icon-menu"></i>商品分类</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template #title><i class="el-icon-s-order"></i>订单管理</template>
            <el-menu-item index="2-1"
              ><i class="el-icon-menu"></i>订单列表</el-menu-item
            > </el-submenu
          ><el-submenu index="5">
            <template #title><i class="el-icon-s-data"></i>数据统计</template>
            <el-menu-item index="2-1"
              ><i class="el-icon-menu"></i>数据报表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      dialogVisible: false,
      isCollapse: false
    }
  },
  methods: {
    handleClose () {
      this.$confirm()
        .then(_ => { })
        .catch(_ => { })
    },
    cearlFn () {
      this.dialogVisible = false
      this.$router.push('/login')
    },
    fold () {
      console.log(11)
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .left {
    .btn {
      width: 100%;
      height: 40px;
      .icon-btn {
        font-size: 22px;
      }
    }
  }
  .leftmin {
    width: 100px;
  }
}
.el-menu {
  border-right: none;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 22px;
    font-weight: 400;
    color: #fff;
  }
}
</style>
