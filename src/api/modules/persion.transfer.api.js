import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
        TRANSFER_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/transfer/getAllTransfer',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_TRANSFER(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/transfer/updateTransfer',
          method:'put',
          data
        })
        },
      DELETE_TRANSFER(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/transfer/deleteTransfer/'+data,
            method:'delete',
        })
        },  
      ADD_TRANSFER(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/transfer/addTransfer',
            method:'post',
            data
        })
        }                   
    })