import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
        REWARDS_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/rewards/getAllRewards',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_REWARDS(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/rewards/updateRewards',
          method:'put',
          data
        })
        },
      DELETE_REWARDS(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/rewards/deleteRewards/'+data,
            method:'delete',
        })
        },  
      ADD_REWARDS(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/rewards/addRewards',
            method:'post',
            data
        })
        } ,               
    })