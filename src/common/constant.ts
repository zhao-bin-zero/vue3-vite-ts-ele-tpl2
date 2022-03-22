interface ErrorMap {
  [key: number]: string
}
export const errorMap: ErrorMap = {
  200: '服务器成功返回请求的数据',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)'
}
export const codeErrorMap: ErrorMap = {
  10000: '成功',
  10001: '系统异常',
  20000: '缺少参数',
  20001: '参数错误',
  20002: '已存在',
  20003: '没有找到相关数据',
  20004: 'token过期-请重新登录',
  20005: '请传递token',
  30100: '验证码错误',
  30101: '员工账户不存在',
  30102: '审核意见不同为空',
  30103: '当前作者已经授权',
  30104: '当前作者不存在授权',
  30105: '发布作者不存在',
  30106: '作者与员工不存在绑定关系',
  30107: '文章不存在',
  30108: '仅允许草稿文章删除',
  30109: '用户审核记录不存在',
  30110: '用户审核记录已审核'
}
