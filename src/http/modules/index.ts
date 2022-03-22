import http from '../abstract'
import { CustomResponse } from '../types'

/** 共用接口 */
/**
 * @desc 登录
 * @param {手机号}
 * @param {验证码}
 * @param {国家区号} 可不传，默认中国区号86
 */
// 传送数据
export interface LoginPostParams {
  country_code?: number
  phone: string
  sms_code: string
}
// 接收数据中data的类型
interface LoginResType {
  token: string
}
export const login = (params: LoginPostParams): Promise<CustomResponse<LoginResType>> =>
  http.post({ url: `Basic.loginApi`, params })

/**
 * @desc 登录短信
 * @param {手机号}
 * @param {国家区号} 可不传，默认中国区号86
 */
interface SendSmsPostParams {
  country_code?: number
  phone: string
}
export const sendSms = (params: SendSmsPostParams): Promise<CustomResponse<[]>> => http.post({ url: `Basic.sendSmsApi`, params })

/**
 * @desc 手机区号列表
 */
export const getAreaCode = () => http.get({ url: `Basic.getAreaCodeApi` })

/**
 * @desc 首页信息
 */
export interface UserInfoType {
  id: number // 用户ID
  name: string // 用户名
  country_code: string
  phone: string // 手机区号
  avatar?: string
  gender: number
  total_money: string
  remaining_money: string
  withdrawn_money: string
  frozen_money: string
  status: number
  create_time: string
  update_time?: string
}
interface UserInfoResType {
  user_info: UserInfoType
}
export const getUserInfo = (): Promise<CustomResponse<UserInfoResType>> => http.post({ url: `Basic.getUserInfoApi` })

/**
 * @desc 校验token
 */
// export const checkToken = (): Promise<CustomResponse<[]>> => http.post({ url: `Basic.checkTokenApi` })

/**
 * @desc 退出登录
 */
export const logout = (): Promise<CustomResponse<[]>> => http.post({ url: `Basic.logoutApi` })
// /**
//  * @desc 文件上传
//  */
// export const uploadFile = (params: FormData) =>
//   http.post({ url: `Basic.uploadFileApi`, params, timeout: 500000, headers: { 'content-type': 'multipart/form-data' } })

/**
 * @desc 学科分类列表
 * @method POST
 */
// export interface SubjectlistResType {
//   id: string // 学科ID
//   leave: string // 层级
//   name: string // 学科名称
//   childList?: SubjectlistResType[]
// }
// export const subjectlist = (): Promise<CustomResponse<SubjectlistResType[]>> => http.post({ url: `Basic.subjectlistApi` })
