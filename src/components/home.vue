<template>
  <el-container class="home-container">
  <el-header>
      <div>
          <img src="../assets/logo.png" alt="">
          <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$storage.removeSession('token')
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  background-color: #3c3d41;
  justify-content: space-between;
  color: #fff;
  font-size: 20px;
  align-items: center;
  >div{
      display: flex;
      align-items: center;
      img{
          width: 40px;
          height: 40px;
      }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>