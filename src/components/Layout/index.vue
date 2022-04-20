<template>
  <el-container class="layout__container" direction="vertical">
    <layout-header />
    <div class="layout__container-con">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
    <layout-footer />
    <loyi-dialog ref="loginFormDialog" :showClose="true" :closeOnClickModal="false">
      <loyi-login-form />
    </loyi-dialog>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useActions } from '@/store/use'
  import LayoutHeader from '@/components/Layout/Header.vue'
  import LayoutFooter from '@/components/Layout/Footer.vue'
  import LoyiDialog, { DialogInstance } from '@/components/LoyiDialog/index.vue'
  import LoyiLoginForm from '@/components/LoyiLoginForm/index.vue'
  import eventBus from '@/common/eventBus'

  export default defineComponent({
    components: {
      LayoutHeader,
      LayoutFooter,
      LoyiDialog,
      LoyiLoginForm
    },
    setup() {
      console.log('layout')
      const storeActions = useActions('info', ['getUser'])
      const init = async () => {
        storeActions.getUser()
      }
      init()
      const loginFormDialog = ref<DialogInstance>(null as unknown as DialogInstance)
      eventBus.on('loginModelStatus', (status) => {
        if (status) {
          loginFormDialog.value.open()
        } else {
          loginFormDialog.value.close()
        }
      })
      return {
        loginFormDialog
      }
    }
  })
</script>

<style lang="scss" scoped>
  .layout__container {
    width: 100%;
    // height: 100vh;
    color: #333;
    .layout__container-con {
      background-color: $webbg;
    }
  }
</style>
