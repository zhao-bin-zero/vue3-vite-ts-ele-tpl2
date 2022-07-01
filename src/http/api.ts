/**
 * API URL Dict api 字典
 */

interface UrlDict {
  [key: string]: {
    [key: string]: string
  }
}

const urlDict: UrlDict = {
  Basic: {
    loginApi: '/translate/login', // 登录
    sendSmsApi: '/translate/send_sms', // 发送验证码
    getUserInfoApi: '/translate/userinfo', // 用户信息
    // uploadFileApi: '/public/upload/file', // 上传文件
    logoutApi: '/translate/logout' //退出登录
    // checkTokenApi: '/translate/check_token',
    // subjectlistApi: '/translate/subjectlist' //学科领域列表
  }
}

const getUrl = (url: string): string => {
  const _url = url.split('.')
  const biz = _url[0]
  const UrlName = _url[1]
  try {
    const bizKeys = Object.keys(urlDict)
    if (bizKeys.indexOf(biz) < 0) {
      throw new Error(`${biz} biz not in Dict`)
    }
    let hostname = urlDict[biz][UrlName]
    if (!hostname) {
      throw new Error(`${UrlName} url not in Dict`)
    }
    if (hostname.substr(0, 1) === '/') {
      hostname = hostname.substr(1)
    }
    return hostname
  } catch (err) {
    console.error(err)
    return ''
  }
}

export default getUrl
