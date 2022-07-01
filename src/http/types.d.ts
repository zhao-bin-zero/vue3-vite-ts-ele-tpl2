export type Method = 'GET' | 'POST'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequest {
  baseURL?: string
  url: string
  data?: any
  params?: any
  method?: Method
  headers?: object
  timeout?: number
  responseType?: ResponseType
}

export interface AxiosResponse {
  data: any
  headers: object
  request?: any
  status: number
  statusText: string
  config: AxiosRequest
}

export interface CustomResponse<T> {
  readonly code: number
  readonly message: string
  readonly data: T
}

// 分页参数
// php
export interface ListPageGetParams {
  page?: number
  page_size?: number
}
// java
export interface ListPageJavaGetParams {
  page?: number
  pageSize?: number
}

// 分页列表返回参数
export interface ListPageRes<T> {
  total: number // 总数量
  items: T[]
}
