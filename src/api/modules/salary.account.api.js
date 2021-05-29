import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
       ACCOUNT_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/account/getAllAccount',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_ACCOUNT(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/account/updateAccount',
          method:'put',
          data
        })
        },
      DELETE_ACCOUNT(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/account/deleteAccount/'+data,
            method:'delete',
        })
        },  
      ADD_ACCOUNT(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/account/addAccount',
            method:'post',
            data
        })
        },
        GET_ACCOUNT_MAP(data) {
          return request({
            url: process.env.VUE_APP_ADMIN+'/account/getAccountByMap',
            method: 'GET',
            data
          })
        },
    })