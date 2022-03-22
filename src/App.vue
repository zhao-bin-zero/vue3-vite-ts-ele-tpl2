<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </el-config-provider>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  // 中文包
  import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
  export default defineComponent({
    name: 'App',
    setup() {
      // 切换为中文
      const locale = computed(() => {
        // const storeGetters = useGetters('info', ['lang'])
        // const local = storeGetters.lang === '/zh-CN' ? zhLocale : enLocale
        // return local
        return zhLocale
      })
      return {
        locale
      }
    }
  })
</script>
<style lang="scss" scoped></style>
