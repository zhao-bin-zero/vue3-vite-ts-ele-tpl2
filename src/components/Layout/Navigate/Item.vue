<template>
  <template v-if="!item.children || item.children.length === 0">
    <el-menu-item v-show="!item.meta?.sliderHidden" :index="item.name" @click="menuItemLink(item.name)">
      <!-- <i :class="item.meta.icon" v-if="item.meta.icon"></i> -->
      {{ item.meta.title }}
    </el-menu-item>
  </template>
  <el-sub-menu popper-class="header__sub-menu" :index="item.name" v-else>
    <template #title>
      <!-- <i :class="item.meta.icon" v-if="item.meta.icon"></i> -->
      {{ item.meta.title }}
    </template>
    <navigate-item v-for="child in item.children" :key="child.name" :item="child" />
  </el-sub-menu>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'NavigateItem',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    setup() {
      const router = useRouter()
      const menuItemLink = (name: string) => {
        // console.log(name)
        router.push({ name })
      }
      return {
        menuItemLink
      }
    }
  })
</script>
<style lang="scss" scoped></style>
