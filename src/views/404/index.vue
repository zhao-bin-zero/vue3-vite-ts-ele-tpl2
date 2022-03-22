<!-- 404 -->
<template>
  <div class="not-page flex-center">
    <div class="text-center">
      <div class="not-page_img">
        <img src="@assets/images/404.png" alt="" />
      </div>
      <p class="not-page_tip">神马情况... 居然来个404！！！</p>
      <!-- <ul class="not-page_solve">
        <li>1. 可能没有权限... 请联系产品添加权限！</li>
        <li>2. 可能链接不对... 请自检后联系开发检查链接！</li>
      </ul> -->
      <div class="not-page_btn">
        <!-- <router-link :to="{ name: 'login' }"><el-button class="btn btn-primary">重新登陆</el-button></router-link> -->
        <el-button class="btn btn-primary" @click="goLink">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'NotPage',
    setup() {
      const router = useRouter()
      const goLink = () => {
        router.go(-1)
      }
      return {
        goLink
      }
    }
  })
</script>
<style lang="scss" scoped>
  .not-page {
    min-height: 100vh;
    // background-color: #eee;
    .not-page_img {
      height: 300px;
    }
    .not-page_tip {
      color: $primaryColor;
      font-size: 20px;
      line-height: 28px;
    }
    .not-page_solve {
      margin-top: 25px;
      font-size: 14px;
      line-height: 26px;
      > li {
        &:nth-child(1) {
          color: $errorColor;
        }
        &:nth-child(2) {
          color: $infoColor;
        }
      }
    }
    .not-page_btn {
      margin-top: 30px;
    }
  }
</style>
