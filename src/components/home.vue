<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollpase ? '64px' : '200px'">
        <div class="toggle_button" @click="toggle">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollpase" router>
          <el-submenu :index="menuItem.id" v-for="menuItem in menuList" :key="menuItem.id">
            <template slot="title">
              <i :class="iconObj[menuItem.id]"></i>
              <span>{{menuItem.authName}}</span>
            </template>
            <el-menu-item :index="'/' + subMenuItem.path" v-for="subMenuItem in menuItem.children" :key='subMenuItem.id'>
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subMenuItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  mounted() {
    this.getMenuList()
  },
  data() {
    return {
      menuList: [],
      iconObj: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollpase: false
    }
  },
  methods: {
    logout() {
      this.$storage.removeSession('token')
    },
    async getMenuList() {
      let res = await this.$http.get('menus')
      if (res.status != '200') {
        return this.$message('error')
      }
      this.menuList = res.data.data
      console.log(this.menuList)
    },
    toggle() {
      this.isCollpase = !this.isCollpase;
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
  > div {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  padding-right:10px;
}
.toggle_button{
  background-color: #4A5064;
  font-size: 10px;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
}
</style>