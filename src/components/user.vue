<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">用户管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              v-model="queryParams.query"
              class="input-with-select"
              clearable
              @clear="getUserList"
            >
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
          </el-col>
        </el-row>
        <el-table :data="userList" style="width: 100%" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="mg_status" label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state" @change="userStatusChange(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-button :id="scope.id" type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="deleteUser(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 5, 10, 400]"
          :page-size="queryParams.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addDialogClose">
      <el-form
        ref="addUserFormRef"
        :model="addUserForm"
        :rules="addUserFormRule"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <messageBox v-if="isShowBox" :messageBoxProps="messageBoxProps"></messageBox>
  </div>
</template>
<script>
import messageBox from './messageBox'
export default {
  created() {
    this.getUserList()
  },
  components: { messageBox },
  data() {
    const emailValidator = (rule, value, callBack) => {
      let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (pattern.test(value)) {
        return callBack()
      } else {
        return callBack(new Error('请输入正确的邮箱'))
      }
    }
    return {
      isShowBox: false,
      messageBoxProps: {},
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: '',
      userList: [],
      addDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        emial: '',
        mobile: ''
      },
      addUserFormRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '请输入3-5位的用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '请输入6-15位的密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: emailValidator }
        ],
        mobile: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryParams
      })
      console.log(res)
      this.total = res.data.users.length
      this.userList = res.data.users
    },
    handleSizeChange(pagesize) {
      this.queryParams.pagesize = pagesize
      this.getUserList()
    },
    handleCurrentChange(pagenum) {
      this.queryParams.pagenum = pagenum
      this.getUserList()
    },
    async userStatusChange(user) {
      const { data: res } = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      )
      if (res.meta.status != 200) {
        user.mg_state = !user.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    addDialogClose() {
      this.$refs.addUserFormRef.resetFields()
    },
    addUser() {
      this.$refs.addUserFormRef.validate(async flag => {
        if (!flag) {
        } else {
          const { data: res } = await this.$http.post('users', this.addUserForm)
          if (res.meta.status != 201) {
            this.$message.error('添加用户失败')
          } else {
            this.$message.success('添加用户成功')
            this.addDialogVisible = false
            this.getUserList()
          }
        }
      })
    },
    deleteUser(id) {
      let that = this
      this.isShowBox = true
      this.messageBoxProps = {
        message: '是否删除该用户',
        title: '删除用户',
        confirmTxt: '确定',
        cancelTxt: '取消',
        confirmAction: function() {
          that.$message.success('success')
          that.isShowBox = false
        },
        cancelAction: function() {
          that.$message.error('error')
          that.isShowBox = false
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>