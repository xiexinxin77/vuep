<template>
  <div>
    <el-form ref="testFormRef" :model="testForm" label-width="80px">
      <el-form-item label="接口号">
        <el-input v-model="testForm.serviceCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onClear">清空</el-button>
      </el-form-item>
      <el-form-item label="接口入参">
        <el-input type="textarea" :rows="3" v-model="testForm.params"></el-input>
      </el-form-item>
      <el-form-item label="返回数据">
        <el-input type="textarea" :rows="6" v-model="resData"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      testForm: {
        serviceCode: 'Y0001',
        params: 'BUSI_CODE=V0001'
      },
      resData: ''
    }
  },
  methods: {
    async onSubmit() {
      let that = this
      let paramObj = {}
      try{
          that.testForm.params && that.testForm.params.split(';').each(value => {
              let paramArr = value.split("=");
              paramObj[paramArr[0]] = paramArr[1];
          })
      } catch{
          
      }
      let resData = await this.$sysConfig.K_Request(
        that.testForm.serviceCode,
        that.testForm.params
      )
      this.resData = resData
    },
    onClear() {
      this.$refs.testFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
</style>