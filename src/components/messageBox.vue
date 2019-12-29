<template><div></div></template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.show()
  },
  props: ['messageBoxProps'],
  methods: {
    show() {
      let that = this
      console.log('this')
      this.$confirm(that.messageBoxProps.message, that.messageBoxProps.title, {
        distinguishCancelAndClose: true,
        confirmButtonText: that.messageBoxProps.confirmTxt,
        cancelButtonText: that.messageBoxProps.cancelTxt
      })
        .then(() => {
          that.messageBoxProps.confirmAction()
        })
        .catch(action => {
          that.messageBoxProps.cancelAction()
        })
    }
  }
}
</script>
<style lang="less" scoped>
</style>