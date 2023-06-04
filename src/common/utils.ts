// 设置cookies

import { ElMessage } from 'element-plus'
import { isArray, isNumberNoNaN, isObject } from './is'

/**
 * @param
 *      name: 名字
 *      value:
 *      expires: 过期时间 单位天
 *      path
 */
declare interface SetCookArgs {
  name: string
  value: string
  expires?: number
  domain?: string
  path?: string
  secure?: boolean
}
export const setCookie = ({ name, value, expires = 30, domain = getDomain(), path = '/', secure }: SetCookArgs) => {
  let cookieText = ''
  cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value)

  // expires
  const oDate = new Date()
  oDate.setTime(oDate.getTime() + expires * 24 * 60 * 60 * 1000)
  cookieText += '; expires=' + oDate.toUTCString()

  // path
  cookieText += '; path=' + path
  cookieText += '; domain=' + domain
  if (secure) {
    cookieText += '; secure'
  }
  document.cookie = cookieText
}
// 获取cookies
export const getCookie = (name: string) => {
  const cookieName = encodeURIComponent(name) + '=',
    cookieStart = document.cookie.indexOf(cookieName)
  let cookieValue = ''
  if (cookieStart > -1) {
    let cookieEnd = document.cookie.indexOf(';', cookieStart)
    if (cookieEnd === -1) {
      cookieEnd = document.cookie.length
    }
    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
  }
  return cookieValue
}
declare interface DelCookArgs {
  name: string
  domain?: string
  path?: string
  secure?: boolean
}
// 删除cookie
export const delCookie = ({ name, domain = getDomain(), path = '/', secure }: DelCookArgs) => {
  const value = ''
  const expires = -1
  setCookie({ name, value, expires, domain, path, secure })
}

// 截取域名
// params
// p : 结果是否用于拼接
export const getDomain = () => {
  // p?: boolean
  const domain = location.hostname
  // let domain
  // if (location.hostname === 'localhost') {
  //   if (p) {
  //     domain = ''
  //   } else {
  //     domain = location.hostname
  //   }
  // } else {
  //   domain = '.' + location.hostname.split('.').slice(-2).join('.')
  // }
  // console.log(url.match(/\.\w+\.com/)[0]);
  return domain
}
export const isLocation = (prefix: string) => {
  const domain = getDomain()
  if (domain === 'localhost') {
    return prefix
  }
  return ''
}

// 上传图片base64
// 返回64位imgCode
export const fileImgUploadBase = (e: any) => {
  return new Promise((reslove) => {
    // 利用fileReader对象获取file
    const file = e.target.files[0]
    const filesize = file.size
    // let filename = file.name
    // 2,621,440   2M
    if (filesize > 2101440) {
      // 图片大于2MB
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
      const imgcode = (e.target as FileReader).result
      reslove(imgcode)
    }
  })
}
// 判断url是否含有参数
export const setUrlParam = (url: string) => {
  if (url.split('?').length === 1) {
    return url + '?'
  } else {
    return url + '&'
  }
}

/*获取Url查询字段 返回Object*/
export const getSearch = (loca: string, type: string) => {
  const search = () => (location.href.indexOf('?') === -1 ? '' : location.href.slice(location.href.indexOf('?')))
  const url = loca || location.search || search()
  if (type === 'string') {
    return url
  }
  /*获取url中"?"符后的字串*/
  const theRequest: { [key: string]: string } = {}
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1]
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      const strsArr = strs[i].split('=')
      theRequest[strsArr[0]] = strsArr[1]
    }
  }
  return theRequest
}

export const isAndriod = () => {
  const bIsAndroid = navigator.userAgent.toLowerCase().match(/android/i) !== null
  return bIsAndroid
}
export const isWindows = () => {
  const np = navigator.platform
  return np === 'Win32' || np === 'Windows'
}
export const isIOS = () => {
  return /like Mac OS X/.test(navigator.userAgent)
}
export const isWX = () => {
  const userAgent = navigator.userAgent
  return /MicroMessenger/gi.test(userAgent)
}

export const isMobile = () => {
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return true // 移动端
  } else {
    return false // PC端
  }
}

/******获取当前网络类型****/
export const getNetworkType = () => {
  let network
  const ua = navigator.userAgent.match(/NetType\/\w+/)
  let networkStr = ua ? ua[0] : 'NetType/other'
  networkStr = networkStr.toLowerCase().replace('nettype/', '')

  switch (networkStr) {
    case 'wifi':
      network = 'WIFI'
      break
    case '4g':
      network = '4G'
      break
    case '3g':
      network = '3G'
      break
    case '3gnet':
      network = '3G'
      break
    case '2g':
      network = '2G'
      break
    default:
      network = '其他'
  }
  return network
}

// 判断浏览器
export const browser = () => {
  //   let b_version = navigator.appVersion
  const userAgent = navigator.userAgent //取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf('Opera') > -1
  //判断是否Opera浏览器
  if (isOpera) {
    return 'Opera'
  }
  //判断是否Firefox浏览器
  else if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox'
  }
  //判断是否chorme浏览器
  else if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  //判断是否Safari浏览器
  else if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
  //判断是否IE浏览器
  else if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE'
  }
  //判断是否Edge浏览器
  else if (userAgent.indexOf('Trident') > -1) {
    return 'Edge'
  } else if (userAgent.indexOf('UCBrowser') > -1) {
    return 'uc'
  } else {
    return '暂无抓取'
  }
}

//js 加法计算
//调用：accAdd(arg1,arg2)
//返回值：arg1加arg2的精确结果
export const accAdd = (arg1: number, arg2: number) => {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))
  return +((arg1 * m + arg2 * m) / m).toFixed(Math.max(r1, r2))
}

//js 减法计算
//调用：subtr(arg1,arg2)
//返回值：arg1减arg2的精确结果
export const subtr = (arg1: number, arg2: number) => {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))
  //last modify by deeka
  //动态控制精度长度
  // n = r1 >= r2 ? r1 : r2
  return +((arg1 * m - arg2 * m) / m).toFixed(Math.max(r1, r2))
}

//js 乘法函数
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
export const accMul = (arg1: number, arg2: number) => {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}

//js 除法函数
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
export const accDiv = (arg1: number, arg2: number) => {
  let t1 = 0,
    t2 = 0
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  const r1 = Number(arg1.toString().replace('.', ''))
  const r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

//js 余数函数
//调用：accRem(arg1,arg2)
//返回值：arg1%arg2的精确结果
export const accRem = (arg1: number, arg2: number): number => {
  let t1 = 0,
    t2 = 0
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  const r1 = Number(arg1.toString().replace('.', ''))
  const r2 = Number(arg2.toString().replace('.', ''))
  return ((r1 * Math.pow(10, t2)) % (r2 * Math.pow(10, t1))) / Math.pow(10, t2 + t1)
}
//js 科学计数法显示为字符串
export const toNonExponential = (num: number, init = '0') => {
  // console.log(num, typeof num)
  if (isNaN(num)) return init
  const num2 = Number(num)
  const m: any = num2.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  return num2.toFixed(Math.max(0, (m[1] || '').length - m[2]))
}

export const zeroToFixed = (num: number, digits: number): string => {
  if (isNumberNoNaN(num)) {
    return num.toFixed(digits)
  } else {
    return '--'
  }
}
// 格式化时间
const padLeftZero = (str: string) => {
  return ('00' + str).substr(str.length)
}
export const formatDate = (date: Date, fmt = 'yyyy-MM-dd') => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o: { [key: string]: number } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

// 深拷贝
export const deepCopy: <T>(arg: T) => T = (obj) => {
  const result: any = isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isObject(obj[key]) || isArray(obj[key])) {
        result[key] = deepCopy(obj[key]) //递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
// 将对象中的Object改为json字符串 // 后台只接受json.string
export const objJsonStr = (params: any) => {
  // formData对象不处理
  if (!isObject(params)) return params
  const obj: { [key: string]: any } = {}
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (isObject(params[key]) || isArray(params[key])) {
        obj[key] = JSON.stringify(params[key])
      } else {
        obj[key] = params[key]
      }
    }
  }
  return obj
}

// 对象合并
// @params
// deep   是否深复制
// {}...    要被合并的对象
// export const extend = function (...args: any[]) {
//   let options, //目标对象，指向参数
//     name, //目标对象中的属性(键)
//     src, //源对象的属性值（值）
//     copy, //目标对象的属性值
//     copyIsArray, //判断属性值是否为数组（布尔值）
//     clone, //源对象的属性值（值）
//     target = args[0] || {}, //源对象
//     i = 1,
//     deep = false //是否深度合并，默认false

//   const length = args.length //参数数量
//   // 处理深拷贝
//   if (isBoolean(target)) {
//     deep = target

//     //源对象指向第二个参数， 遍历时跳过第一个参数
//     target = args[i] || {}
//     i++
//   }
//   // Handle case when target is a string or something (possible in deep copy)
//   // 当源对象为字符串或其他非基础数据类型时执行（此时可能在深拷贝过程中）
//   if (typeof target !== 'object' && Object.prototype.toString.call(target) !== '[object Function]') {
//     target = {}
//   }

//   // 如果只传递一个参数，则扩展到本身。此时为源对象
//   if (i === length) {
//     target = this
//     i--
//   }

//   for (; i < length; i++) {
//     // 程序不处理 null或undefined 参数
//     if ((options = args[i]) !== null) {
//       // 遍历目标对象
//       for (name in options) {
//         src = target[name]
//         copy = options[name]

//         // 防止无限循环
//         if (target === copy) {
//           continue
//         }

//         // 目标对象的属性值若为 Object 或 Array ，进行递归
//         if (deep && copy && (Object.prototype.toString.call(copy) === '[object Object]' || (copyIsArray = Array.isArray(copy)))) {
//           if (copyIsArray) {
//             copyIsArray = false
//             clone = src && Array.isArray(src) ? src : []
//           } else {
//             clone = src && Object.prototype.toString.call(src) === '[object Object]' ? src : {}
//           }

//           // 递归遍历
//           target[name] = extend(deep, clone, copy)

//           // 若为基础数据类型且不为undefined,赋值即可
//         } else if (copy !== undefined) {
//           target[name] = copy
//         }
//       }
//     }
//   }

//   // 返回修改后的源对象，若不想修改传入的对象，可以把 {} 作为源对象传入
//   return target
// }

//检测 Demo or Live
export const isLive = () => {
  if (/localhost|dev|demo|test/gi.test(location.hostname)) {
    return false
  } else {
    return true
  }
}

export const debounce = (fn: any, delay: number) => {
  // 记录上一次的延时器
  let timeout: number | undefined = undefined // 创建一个标记用来存放定时器的返回值
  return function (...args: any[]) {
    clearTimeout(timeout) // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => {
      // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn(...args)
    }, delay)
  }
}

// 复制text到剪切板
export const copyText = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.background = 'transparent'
  textArea.style.boxShadow = 'none'
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  document.body.appendChild(textArea)
  textArea.select()
  try {
    const successful = document.execCommand('copy')
    const msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板'
    console.log(msg)
    ElMessage({
      showClose: true,
      message: msg,
      type: 'success'
    })
  } catch (err) {
    console.log('该浏览器不支持点击复制到剪贴板,请手动复制')
  }

  document.body.removeChild(textArea)
}
