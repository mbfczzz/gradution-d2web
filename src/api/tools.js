const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
import layoutHeaderAside from '@/layout/header-aside'
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
     arr.push({path:"/index",title:"首页",icon: 'indent'})
     return arr
}


export function createRoute(allmenu){
  let arr = []
  allmenu.forEach(s=>{
    let routeObj = {}
      routeObj.path = s.path,
      routeObj.name = s.name,
      routeObj.meta = {auth:true,title:s.title}
      routeObj.icon = s.icon
      routeObj.redirect =  { name: s.component },
      routeObj.component = layoutHeaderAside
      routeObj.children = []
      s.children.forEach(k=>{
        if(k.children == null && k.type==="page"){
          let tmp = {}
          tmp.path = k.path,
          tmp.name = k.name,
          tmp.icon = k.icon
          tmp.meta = {auth:true,title:k.title}
          tmp.component = _import(k.component)
          routeObj.children.push(tmp)
        }
        if(k.children != [] && k.children != undefined){
          k.children.forEach(m=>{
            let tmp = {}
            tmp.path = m.path,
            tmp.name = m.name,
            tmp.icon = m.icon
            tmp.meta = {auth:true,title:m.title}
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