<template>
  <div class="login flex-center">
    <div class="login__left">
      <!-- <img src="@assets/images/login/login-left.png" alt="" /> -->
    </div>
    <div class="login__right">
      <loyi-login-form />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import LoyiLoginForm from '@/components/LoyiLoginForm/index.vue'

  export default defineComponent({
    components: {
      LoyiLoginForm
    },
    setup() {
      return {}
    }
  })
</script>
<style lang="scss" scoped>
  .login {
    min-height: calc(100vh - $headerHeight);
    background-color: #fff;
    .login__left {
      width: 508px;
      margin: 10px 35px;
    }
    .login__right {
      width: 550px;
      box-shadow: 15px 15px 48px -16px #51685f;
      border-radius: 10px;
      // border-top-left-radius: $siderRestrain;
      // border-bottom-left-radius: $siderRestrain;
      padding: 40px 50px;
      margin: 10px 35px;
    }
  }
</style>
