<template>
  <!-- destroy-on-close 控制是否在关闭 Drawer 之后将子元素全部销毁-->
  <div class="loyi__drawer">
    <el-drawer v-model="visible" direction="rtl" :destroy-on-close="true" :lock-scroll="true" @close="closeDrawerFunc">
      <template #title>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in titles" :key="item">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <slot></slot>
    </el-drawer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, provide, ref } from 'vue'
  export interface DrawerInstance {
    open: () => {}
    close: () => {}
  }
  export default defineComponent({
    name: 'LoyiDrawer',
    props: {
      titles: {
        type: Array,
        default: () => []
      },
      size: {
        type: String,
        default: '900px'
      }
    },
    emits: ['closeDrawerFunc'],
    setup(props, { emit }) {
      //弹框是否隐藏
      const visible = ref(false)
      const open = () => {
        visible.value = true
      }
      const close = () => {
        visible.value = false
      }
      provide('LoyiDialog', { close })
      const closeDrawerFunc = () => {
        emit('closeDrawerFunc')
      }
      return {
        visible,
        open,
        close,
        closeDrawerFunc
      }
    }
  })
</script>
<style lang="scss" scoped>
  .loyi__drawer {
    :deep(.el-drawer) {
      // width: 900px !important;
      .el-drawer__body {
        overflow: auto;
      }
    }
  }
</style>
