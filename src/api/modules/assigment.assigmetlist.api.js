import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
        ASSIGMENT_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/assigment/getAllAssigment',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_ASSIGMENT(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/assigment/updateAssigment',
          method:'put',
          data
        })
        },
      DELETE_ASSIGMENT(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/assigment/deleteAssigment/'+data,
            method:'delete',
        })
        },  
      ADD_ASSIGMENT(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/assigment/addAssigment',
            method:'post',
            data
        })
        },                    
    })