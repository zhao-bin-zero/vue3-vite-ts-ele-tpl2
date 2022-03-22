import { useStore, mapState, mapGetters, mapActions, createNamespacedHelpers } from 'vuex'
import { computed, ComputedRef } from 'vue'
import { is } from '@/common/is'

function useStateMapper(mapper: any, mapFn: any) {
  const store = useStore()

  const storeStateFns = mapFn(mapper)

  const storeState: { [key: string]: ComputedRef } = {}
  Object.keys(storeStateFns).forEach((fnKey) => {
    // vuex源码中mapState和mapGetters的方法中使用的是this.$store,所以更改this绑定
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = computed(fn)
  })

  return storeState
}

function useActionMapper(mapper: any, mapFn: any) {
  const store = useStore()

  const storeActionsFns = mapFn(mapper)

  const storeAction: { [key: string]: any } = {}

  Object.keys(storeActionsFns).forEach((fnKey) => {
    storeAction[fnKey] = storeActionsFns[fnKey].bind({ $store: store })
  })

  return storeAction
}
/**
 *
 * @param {*} moduleName 模块名称
 * @param {*} mapper state属性集合 ['name', 'age']
 * @returns
 */
export function useState(moduleName: any, mapper: any) {
  let mapperFn = mapState

  // 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapState方法
  if (is(moduleName, 'String') && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  } else {
    mapper = moduleName
  }

  return useStateMapper(mapper, mapperFn)
}
/**
 *
 * @param {*} moduleName 模块名称
 * @param {*} mapper getters属性集合 ['name', 'age']
 * @returns
 */
export function useGetters(moduleName: any, mapper: any) {
  let mapperFn = mapGetters

  // 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapGetters方法
  if (is(moduleName, 'String') && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  } else {
    mapper = moduleName
  }

  return useStateMapper(mapper, mapperFn)
}
/**
 *
 * @param {*} moduleName 模块名称
 * @param {*} mapper 方法名集合 ['fn1', 'fn2']
 * @returns
 */
export function useActions(moduleName: any, mapper: any) {
  let mapperFn = mapActions

  // 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapActions方法
  if (is(moduleName, 'String') && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapActions
  } else {
    mapper = moduleName
  }

  return useActionMapper(mapper, mapperFn)
}
