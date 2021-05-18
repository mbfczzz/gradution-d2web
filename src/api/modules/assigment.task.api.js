import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
        TASK_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/task/getAllTask',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_TASK(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/task/updateTask',
          method:'put',
          data
        })
        },
      DELETE_TASK(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/task/deleteTask/'+data,
            method:'delete',
        })
        },  
      ADD_TASK(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/task/addTask',
            method:'post',
            data
        })
        } ,
      GET_TASK_ITEM(data){
         return request({
            url: process.env.VUE_APP_ADMIN+'/task/getTaskMap',
            method:'get',
            data
        })
      }           
    })