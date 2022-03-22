import { isEmptyObj } from '~/src/common/is'
<!-- 登录校验 适用于登录前与登录后样式一致的情况-->
<template>
  <div class="inline-block login__check">
    <div class="login__check-go cursor-pointer" v-if="isEmptyObj(storeGetters.user.value)" @click.stop="goLogin"> </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useGetters } from '@/store/use'
  import { isEmptyObj } from '@/common/is'
  export default defineComponent({
    name: 'LoyiLoginCheck',
    props: {
      to: {
        type: Object
      }
    },
    setup() {
      const storeGetters = useGetters('info', ['user']) // 用户信息
      const goLogin = () => {
        // 登录
        console.log('登录', storeGetters.user.value)
        // router.replace('/login')
      }
      return {
        storeGetters,
        goLogin,
        isEmptyObj
      }
    }
  })
</script>
<style lang="scss" scoped>
  .login__check {
    position: relative;
    .login__check-go {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
  }
</style>
