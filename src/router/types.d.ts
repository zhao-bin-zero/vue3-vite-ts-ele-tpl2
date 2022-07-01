import { defineComponent } from 'vue'
import type { RouteRecordRaw, RouteMeta } from 'vue-router'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

/*
 * router-options
 */
// @ts-ignore
// export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
//   name: string
//   meta?: RouteMeta
//   component?: Component | string
//   components: Component
//   children?: AppRouteRecordRaw[]
//   props?: Recordable
//   fullPath?: string
// }
interface AppRouteMeta extends RouteMeta {
  sliderHidden?: boolean
  title?: string
  icon?: string
}
export interface AppRouteRecordRaw extends RouteRecordRaw {
  path: string
  name: string
  meta?: AppRouteMeta
  component?: Component | string
  children?: AppRouteRecordRaw[]
  redirect?: string
}
