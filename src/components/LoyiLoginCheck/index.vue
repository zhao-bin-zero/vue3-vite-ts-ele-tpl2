<!-- 登录校验 适用于登录前与登录后样式一致的情况-->
<template>
  <div class="inline-block login__check">
    <div class="login__check-go cursor-pointer" v-if="!storeGetters.isLogin.value" @click.stop="goLogin"> </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useGetters } from '@/store/use'
  import eventBus from '@/common/eventBus'
  export default defineComponent({
    name: 'LoyiLoginCheck',
    setup() {
      const storeGetters = useGetters('info', ['isLogin']) // 是否登录
      const goLogin = () => {
        // 登录
        console.log('登录', storeGetters.isLogin.value)
        eventBus.emit('loginModelStatus', true)
        // router.replace('/login')
      }
      return {
        storeGetters,
        goLogin
      }
    }
  })
</script>
<style lang="scss" scoped>
  .login__check {
    position: relative;
    overflow: hidden;
    .login__check-go {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0%;
      top: 0%;
      z-index: 2;
    }
  }
</style>
