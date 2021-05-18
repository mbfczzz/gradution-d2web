import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
      JOBTRANSFER_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/jobtransfer/getAllJobTransfer',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_JOBTRANSFER(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/jobtransfer/updateJobTransfer',
          method:'put',
          data
        })
        },
      DELETE_JOBTRANSFER(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/jobtransfer/deleteJobTransfer/'+data,
            method:'delete',
        })
        },  
      ADD_JOBTRANSFER(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/jobtransfer/addJobTransfer',
            method:'post',
            data
        })
        },                    
    })