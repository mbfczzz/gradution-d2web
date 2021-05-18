import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
     RECRUIT_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/recruit/getAllRecruit',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_RECRUIT(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/recruit/updateRecruit',
          method:'put',
          data
        })
        },
      DELETE_RECRUIT(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/recruit/deleteRecruit/'+data,
            method:'delete',
        })
        },  
      ADD_RECRUIT(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/recruit/addRecruit',
            method:'post',
            data
        })
        } ,  
    })