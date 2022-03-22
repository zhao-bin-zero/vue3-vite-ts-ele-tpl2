<template>
  <el-header class="layout__header">
    <div class="item-center web-width">
      <div class="header__logo">
        <!-- <img src="@assets/images/logo.png" alt="" /> -->
        LOGO
      </div>
      <div class="flex1">
        <layout-header-navigate />
      </div>
      <div class="header__info">
        <el-dropdown @command="handleCommand" class="header__dropdown">
          <el-avatar class="header__info-avatar" icon="el-icon-user-solid" />
          <!-- <img src="@assets/images/avatar.png" alt="" class="header__info-avatar" /> -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="storeGetters.user.value.id" class="header__dropdown-menu" command="loginout">
                退出登录
              </el-dropdown-item>
              <el-dropdown-item v-else class="header__dropdown-menu" command="login"> 登录/注册 </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useGetters, useActions } from '@/store/use'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { logout } from '@/http/modules/index'
  import { useRouter } from 'vue-router'
  import LayoutHeaderNavigate from '@/components/Layout/Navigate/index.vue'
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      LayoutHeaderNavigate
    },
    setup() {
      const storeGetters = useGetters('info', ['user'])
      const storeActions = useActions('info', ['logout'])
      const router = useRouter()

      const handleCommand = (command: string) => {
        console.log(command)
        if (command === 'login') {
          router.push({ path: '/login' })
        } else if (command === 'loginout') {
          ElMessageBox.confirm('确定要退出吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              logout().then((res) => {
                console.log(res)
                if (res.code === 10000) {
                  storeActions.logout()
                  ElMessage({ type: 'success', message: '退出成功' })
                  router.replace('/login')
                }
              })
            })
            .catch(() => {})
        }
      }
      return {
        storeGetters,
        handleCommand
      }
    }
  })
</script>
<style lang="scss" scoped>
  .layout__header {
    height: $headerHeight;
    box-shadow: 0px 0px 15px 0px #eceeed;
    z-index: 1;
    .header__logo {
      margin: 0 100px;
      height: 40px;
      line-height: 40px;
      font-size: 28px;
      color: $primaryColor;
    }
    .header__info {
      margin: 0 100px;
      .header__info-avatar {
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 28px;
      }
    }
  }
  :deep(.header__dropdown-menu) {
    &.el-dropdown-menu__item {
      &:hover,
      &:focus {
        color: $primaryColor;
        background-color: transparent;
      }
    }
  }
</style>
