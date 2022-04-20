import axios, { AxiosRequestConfig } from 'axios'
import type { ILoadingInstance } from 'element-plus'
import { ElLoading } from 'element-plus'
import { getCookie } from '@/common/utils'
import { errorMap } from '@/common/constant'

// axios 实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  responseType: 'json'
})

// loading
const loadingInstance = {
  target: null as null | ILoadingInstance,
  count: 0
}
/**
 * 打开Loading层实例
 * @param request
 */
const openLoading = (request: AxiosRequestConfig) => {
  if (request?.headers?.request_loading) {
    loadingInstance.count++
    if (loadingInstance.count === 1) {
      loadingInstance.target = ElLoading.service({
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.3)'
      })
    }
  }
}
/**
 * 关闭Loading层实例
 * @param request
 */
const closeLoading = (request: AxiosRequestConfig) => {
  // if (!request || request?.headers?.request_loading) { // 取消请求返回request不存在，count宁少不多 tip: 单次请求loading不统一会有问题
  if (request?.headers?.request_loading) {
    // 如果request不存在，则loading不会再消失，所以要处理所有request不存在情况
    if (loadingInstance.count > 0) loadingInstance.count--
    if (loadingInstance.count === 0) {
      loadingInstance.target!.close()
      loadingInstance.target = null
    }
  }
}

// 取消重复请求
const pendingMap = new Map<string, (message: string) => void>()
/**
 * 生成每个请求唯一的键
 * @param request
 * @returns string
 */
const getPendingKey = (request: AxiosRequestConfig) => {
  const { url, method, params } = request
  let { data } = request
  if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param request
 */
const addPending = (request: AxiosRequestConfig) => {
  if (request?.headers?.repeat_request_cancel) {
    const pendingKey = getPendingKey(request)
    request.cancelToken =
      // request.cancelToken || // 请求失败重新请求会携带
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
          pendingMap.set(pendingKey, (message: string) => {
            console.log('取消请求', message, request)
            closeLoading(request) // 取消时走error不存在request，所以只能在这执行
            // cancel 函数的参数会作为 promise 的 error 被捕获
            return cancel(message) // 可能是异步，请求结束后调用不走error
          })
        }
      })
  }
}
/**
 * 删除重复的请求
 * @param request
 */
const removePending = (request: AxiosRequestConfig, isReq?: boolean) => {
  if (request?.headers?.repeat_request_cancel) {
    const pendingKey = getPendingKey(request)
    if (pendingMap.has(pendingKey)) {
      if (isReq) {
        // 执行取消操作
        const cancelToken = pendingMap.get(pendingKey) as (message: string) => void
        if (import.meta.env.MODE === 'production') {
          cancelToken(`操作太频繁，请稍后再试!`)
        } else {
          cancelToken(`请求太频繁，请联系开发检查代码!!!`)
        }
      }
      pendingMap.delete(pendingKey)
    }
  }
}

// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    // console.log('request', request)
    removePending(request, true)
    addPending(request)

    openLoading(request)
    // 请求拦截，拦截成功后在请求头中设定token
    request.headers.Authorization = getCookie('token')
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // console.log('response.config', response.config)
    removePending(response.config)

    closeLoading(response.config)

    return response
  },
  (error) => {
    // console.log(axios.isCancel(error))
    // console.log('error: ', error)
    // console.log('error.message: ', error.message)
    // console.log('error.response: ', error.response)
    removePending(error.config) // 如果error.config为空，下一次相同请求会报重复(概率极低)
    closeLoading(error.config) // 如果error.config为空，loading不会执行，可能最后loading没消失
    const response = error.response
    let message = error.message
    if (response) {
      const status = response.status
      // 根据返回的http状态码做不同的处理
      switch (status) {
        // case 401:
        //   // token失效
        //   break
        default:
          message = errorMap[status]
          console.log('instance', message, response)
          break
      }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！'
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

    // 超时重新请求
    const config = error.config
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [3, 2000]

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message })
      }
      // 增加重试计数
      config.__retryCount++
      // 创造新的Promise来处理指数后退
      const backoff = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, RETRY_DELAY || 100)
      })
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config)
      })
    }
    return Promise.reject(response || { message })
  }
)

export default instance
