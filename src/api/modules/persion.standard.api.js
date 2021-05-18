import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
        STANDARD_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/standard/getAllStandard',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_STANDARD(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/standard/updateStandard',
          method:'put',
          data
        })
        },
      DELETE_STANDARD(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/standard/deleteStandard/'+data,
            method:'delete',
        })
        },  
      ADD_STANDARD(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/standard/addStandard',
            method:'post',
            data
        })
        } ,
      GET_STANDARD_TYPE(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/standard/getStandardType',
          method:'get',
          data
      })
      } ,     
      GET_STANDARD_DESCRIBE(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/standard/getStandardDescribe',
          method:'get',
          data
      })
      } ,   
      GET_STANDARD_NAME(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/standard/getStandardName',
          method:'get',
          data
      })
      } ,     
      GET_STANDARDBYNAME(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/standard/getStandardByStandardId/'+data,
          method:'get',
          data
      })
      }                   
    })