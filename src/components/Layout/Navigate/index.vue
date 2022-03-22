<template>
  <el-aside class="layout__sidebar">
    <el-menu :default-active="activeIndex" class="header__menu flex1" mode="horizontal">
      <navigate-item v-for="item in menuList" :key="item.name" :item="item" />
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import NavigateItem from '@/components/Layout/Navigate/Item.vue'
  import { useRoute } from 'vue-router'
  export default defineComponent({
    name: 'LayoutNavigate',
    components: {
      NavigateItem
    },
    setup() {
      console.log('Navigate')
      const route = useRoute()
      const activeIndex = computed(() => route.name)
      const menuList = [
        {
          path: '',
          name: 'index',
          meta: {
            title: '首页'
          }
        }
      ]
      return { activeIndex, menuList }
    }
  })
</script>

<style lang="scss" scoped>
  .layout__sidebar {
    width: 100%;
    .header__menu {
      &.el-menu--horizontal {
        justify-content: flex-end;
        border-bottom-width: 0;
        .el-menu-item {
          height: $headerHeight;
          font-size: 18px;
          margin: 0 40px;
          padding: 0;
          &:not(.is-disabled) {
            &:focus,
            &:hover {
              background-color: transparent;
              border-color: $primaryColor;
              color: $primaryColor;
            }
          }
        }
        :deep(.el-sub-menu) {
          .el-sub-menu__title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: $headerHeight;
            font-size: 18px;
            margin: 0 40px;
            padding: 0;
          }
          .el-sub-menu__icon-arrow {
            margin-top: 0;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .header__sub-menu.el-popper.is-pure {
    border-width: 0;
    .el-menu--horizontal {
      .el-menu.el-menu--popup {
        padding: 0;
        .el-menu-item {
          &:not(.is-disabled) {
            &:focus,
            &:hover {
              color: $primaryColor;
              background-color: $primaryColor;
            }
          }
          &.is-active {
            background-color: $primaryColor;
          }
        }
      }
    }
  }
</style>
