import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import elemetPlusDirectives from '@/plugins/element-plus-directive'
import '@/assets/styles/index.scss' // global css

const app = createApp(App)

elemetPlusDirectives(app)

// 1、挂载vuex
app.use(store)

// 2、挂载路由
app.use(router)
router.isReady().then(() => app.mount('#app'))

// app.mount('#app')
