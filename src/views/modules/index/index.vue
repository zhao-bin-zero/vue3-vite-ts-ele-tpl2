<!-- 首页 -->
<template>
  <div>
    <loyi-login-check>
      <router-link :to="{ name: 'login' }">登录</router-link>
    </loyi-login-check>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LoyiLoginCheck from '@/components/LoyiLoginCheck/index.vue'
  export default defineComponent({
    name: 'Index',
    components: {
      LoyiLoginCheck
    },
    setup() {
      return {}
    }
  })
</script>
<style lang="scss" scoped></style>
