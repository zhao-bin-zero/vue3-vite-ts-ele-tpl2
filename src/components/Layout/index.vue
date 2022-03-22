<template>
  <el-container class="layout__container" direction="vertical">
    <layout-header />
    <div class="layout__container-con">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
    <layout-footer />
  </el-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useActions } from '@/store/use'
  import LayoutHeader from '@/components/Layout/Header.vue'
  import LayoutFooter from '@/components/Layout/Footer.vue'

  export default defineComponent({
    components: {
      LayoutHeader,
      LayoutFooter
    },
    setup() {
      console.log('layout')
      const storeActions = useActions('info', ['getUser'])
      const init = async () => {
        storeActions.getUser()
      }
      init()

      return {}
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
