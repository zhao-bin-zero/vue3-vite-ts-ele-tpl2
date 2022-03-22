<!--  -->
<template>
  <el-dialog
    custom-class="loyi__dialog"
    v-model="visible"
    :show-close="false"
    :destroy-on-close="true"
    title="titles"
    :lock-scroll="true"
  >
    <slot></slot>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent, ref, provide } from 'vue'
  export default defineComponent({
    name: 'LoyiDialog',
    props: {
      titles: {
        type: String
      }
    },
    setup() {
      //弹框是否隐藏
      const visible = ref(false)
      const open = () => {
        visible.value = true
      }
      const close = () => {
        visible.value = false
      }
      provide('LoyiDialog', { close })
      return {
        visible,
        open,
        close
      }
    }
  })
</script>
<style lang="scss">
  .loyi__dialog {
    .el-dialog__header {
      border-bottom: 1px solid #eee;
      padding: 14px 20px;
      .el-dialog__title {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 24px;
      }
    }
    .el-dialog__body {
      padding: 24px 0;
    }
  }
</style>
