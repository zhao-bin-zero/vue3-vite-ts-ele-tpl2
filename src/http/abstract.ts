/**
 * axios基础构建
 */
import getUrl from './api'
import instance from './instance'
import { AxiosRequest, CustomResponse } from './types'
import { ElMessage } from 'element-plus'
import router from '@/router'
import store from '@/store'
import { codeErrorMap, errorMap } from '@/common/constant'

class Abstract {
  // 自定义header头
  protected headers: object = {
    repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
    loading: true // 是否开启loading层效果, 默认为true
  }

  private apiAxios({
    baseURL,
    headers,
    method,
    url,
    data,
    params,
    timeout,
    responseType
  }: AxiosRequest): Promise<CustomResponse<any>> {
    // url解析
    const _url = (url as string).split('.')
    url = getUrl(_url[0], _url[1])

    return new Promise((resolve, reject) => {
      // console.log(params)
      instance({
        baseURL,
        headers: { ...this.headers, ...headers },
        method,
        url,
        params,
        data,
        timeout,
        responseType
      })
        .then((res) => {
          // 服务端业务处理正常结束
          const { data } = res
          console.log(codeErrorMap[data.code])
          if (data.code === 10000) {
          } else {
            ElMessage({ type: 'error', message: data.message || codeErrorMap[data.code] })
            if (data.code === 20004 || data.code === 20005) {
              // token失效，需要登录
              store.dispatch('info/logout')
              router.replace('/login')
            }
          }
          resolve(data)
        })
        .catch((err) => {
          // 报错时返回类型不是CustomResponse
          // console.log('err', err)
          // 举例: 跳转页面时取消所有请求需额外处理报错
          // if (err.message === '') return reject(err)
          const message = errorMap[err.status] || err.statusText || err.message || url + '请求失败'
          ElMessage({ type: 'error', message })
          reject(err)
        })
    })
  }

  /**
   * GET类型的网络请求
   */
  public get({ baseURL, headers, url, params, timeout, responseType }: AxiosRequest) {
    return this.apiAxios({ baseURL, headers, method: 'GET', url, params, timeout, responseType })
  }

  /**
   * POST类型的网络请求
   */
  public post({ baseURL, headers, url, params, timeout, responseType }: AxiosRequest) {
    return this.apiAxios({ baseURL, headers, method: 'POST', url, data: params, timeout, responseType })
  }

  /**
   * PUT类型的网络请求
   */
  // public put({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
  //   return this.apiAxios({ baseURL, headers, method: 'PUT', url, data, params, responseType })
  // }

  /**
   * DELETE类型的网络请求
   */
  // public delete({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
  //   return this.apiAxios({ baseURL, headers, method: 'DELETE', url, data, params, responseType })
  // }
}

// export default Abstract
// 单列模式返回对象
const http = new Abstract()
export default http
