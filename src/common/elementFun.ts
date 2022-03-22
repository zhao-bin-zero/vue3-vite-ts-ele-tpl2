import { formatDate } from './utils'

export const formatTable = (row: any, column: any, cellValue: any) => {
  return cellValue || '-'
  // if (!cellValue) {
  //   return '-'
  // } else {
  //   return cellValue
  // }
}

/** Date相关 */
// date-picker使用，主要为禁用一些时间
export const reducedDate = (time: Date | string, time2: Date | string) => {
  return new Date(time).getTime() < new Date(time2).getTime()
}
// 获得当前日期
export const getNowDay = () => {
  return formatDate(new Date())
}
// 获得昨天日期
export const getYesterDay = () => {
  return formatDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000))
}
// 获得本周的开始时间
export const getStartDayOfWeek = () => {
  const day = new Date().getDay() || 7
  return formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1 - day))
}
// 获得本周的结束时间
// export const getEndDayOfWeek = () => {
//   const day = new Date().getDay() || 7
//   return formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7 - day))
// }
// 获得本月的开始时间
export const getStartDayOfMonth = () => {
  const monthStartDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  return formatDate(monthStartDate)
}
// 获得本年的开始时间
export const getStartDayOfYear = () => {
  const monthStartDate = new Date(new Date().getFullYear(), 0, 1)
  return formatDate(monthStartDate)
}
// 获得本月天数
// export const getMonthDays = () => {
//   const monthStartDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime()
//   const monthEndDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime()
//   const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
//   return days
// }
// 获得本月的结束时间
// export const getEndDayOfMonth = () => {
//   const monthEndDate = new Date(new Date().getFullYear(), new Date().getMonth(), getMonthDays())
//   return formatDate(monthEndDate)
// }
