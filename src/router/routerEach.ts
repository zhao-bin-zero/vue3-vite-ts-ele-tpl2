import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export const beforEachFunc = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  console.log(from, to)
  // 默认重定向到第一个子路由to.matched.length===0为404;children.length > 0表示有下一级路由
  if (to.matched.length > 0 && to.matched[to.matched.length - 1].children.length > 0) {
    next({ name: to.matched[to.matched.length - 1].children[0].name })
  } else {
    next()
  }
}

export const afterEachFunc = () => {
  // do ...
}
