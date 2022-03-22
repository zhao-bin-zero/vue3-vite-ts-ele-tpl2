import { createStore, useStore as vuexUseStore } from 'vuex'
// import type { ModuleTree } from 'vuex'
import info, { InfoState, InfoStore } from './modules/info'
// vite读取文件
// const files = import.meta.globEager('./modules/*.ts')
// const modules: ModuleTree<{}> = {}
// for (const key in files) {
//   modules[key.replace(/(\.\/modules\/|\.ts)/g, '')] = files[key].default
// }

// Object.keys(modules).forEach((item) => {
//   modules[item].namespaced = true
// })
export interface IRootState {
  info: InfoState
}

const modules = {
  info
}
export default createStore<IRootState>({
  modules
})

// 因有辅助函数,优先使用辅助函数
export const useStore = () => {
  return vuexUseStore<IRootState>()
}

// 用于this.$store时,目前不建议用
export type IRootStore = InfoStore<Pick<IRootState, 'info'>>
