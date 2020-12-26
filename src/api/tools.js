import { Message } from 'element-ui'
import store from '@/store'
import util from '@/libs/util'
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
import  layoutHeaderAside from  '@/layout/header-aside/'
/**
 * @description 安全地解析 json 字符串
 * @param {String} jsonString 需要解析的 json 字符串
 * @param {String} defaultValue 默认值
 */
export function parse (jsonString = '{}', defaultValue = {}) {
  let result = defaultValue
  try {
    result = JSON.parse(jsonString)
  } catch (error) {
    console.log(error)
  }
  return result
}

export function addIndex(arr){
     arr.push({path:"/index",title:"首页"})
     return arr
}


export function createRoute(allmenu){
  let arr = []
  allmenu.forEach(s=>{
    let routeObj = {}
      routeObj.path = s.path,
      routeObj.name = s.name,
      routeObj.meta = {auth:true}
      routeObj.component = layoutHeaderAside
      routeObj.children = []
      s.children.forEach(k=>{
        if(k.children != [] && k.children != undefined){
          k.children.forEach(m=>{
            let tmp = {}
            tmp.path = m.path,
            tmp.name = m.name,
            tmp.meta = {auth:true}
            tmp.component = _import(m.component)
            routeObj.children.push(tmp)
          })
        }
      })
      arr.push(routeObj)
    }
    )
    return arr
}

export function getPermission(head,side){
        let newMemu = []
        head.forEach(s => {
          s.children = []
          side.forEach(k=>{
            if(k.parentId === s.parentId){
               s.children.push(k) 
            }
          })
          newMemu.push(s)
        });
        return newMemu;
}
/**
 * @description 接口请求返回
 * @param {Any} data 返回值
 * @param {String} msg 状态信息
 * @param {Number} code 状态码
 */
export function response (data = {}, msg = '', code = 0) {
  return [
    200,
    { code, msg, data }
  ]
}

/**
 * @description 接口请求返回 正确返回
 * @param {Any} data 返回值
 * @param {String} msg 状态信息
 */
export function responseSuccess (data = {}, msg = '成功') {
  return response(data, msg)
}

/**
 * @description 接口请求返回 错误返回
 * @param {Any} data 返回值
 * @param {String} msg 状态信息
 * @param {Number} code 状态码
 */
export function responseError (data = {}, msg = '请求失败', code = 500) {
  return response(data, msg, code)
}

/**
 * @description 记录和显示错误
 * @param {Error} error 错误对象
 */
export function errorLog (error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

/**
 * @description 创建一个错误
 * @param {String} msg 错误信息
 */
export function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}
