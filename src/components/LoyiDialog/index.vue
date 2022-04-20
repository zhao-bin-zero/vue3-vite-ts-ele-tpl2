<!-- ele dialog -->
<template>
  <el-dialog
    custom-class="loyi__dialog"
    v-model="visible"
    :show-close="showClose"
    :destroy-on-close="true"
    :title="titles"
    :lock-scroll="true"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent, ref, provide } from 'vue'
  export interface DialogInstance {
    open: () => {}
    close: () => {}
  }
  export default defineComponent({
    name: 'LoyiDialog',
    props: {
      titles: {
        type: String
      },
      width: {
        type: String,
        default: '500px'
      },
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
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
      // border-bottom: 1px solid #eee;
      padding: 17px 20px 10px;
      .el-dialog__title {
        font-size: 20px;
        font-weight: 600;
        color: #333333;
        line-height: 28px;
      }
    }
    .el-dialog__body {
      padding: 20px;
    }
  }
</style>
