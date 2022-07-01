// 手机号验证回调
export const validateMobile = (rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (!value || value === '') {
    return callback(new Error('手机号不能为空～'))
  }
  // const RegMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  // if (!RegMobile.test(value)) {
  //   return callback(new Error('手机号格式错误～'))
  // }
  callback()
}
// 验证码验证回调
export const validateCode = (rule: any, value: string, callback: (arg0?: Error) => void) => {
  if (!value || value === '') {
    return callback(new Error('验证码不能为空～'))
  }
  if (value.length < 6) {
    return callback(new Error('请输入6位数验证码～'))
  }
  callback()
}
