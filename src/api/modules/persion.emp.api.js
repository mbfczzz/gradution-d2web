import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
       EMP_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/emp/getAllEmp',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_EMP(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/emp/updateEmp',
          method:'put',
          data
        })
        },
      DELETE_EMP(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/emp/deleteEmp/'+data,
            method:'delete',
        })
        },  
      ADD_EMP(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/emp/addEmp',
            method:'post',
            data
        })
        },  
        GET_MAPEMP_LIST (data) {
          return request({
            url: process.env.VUE_APP_ADMIN+'/emp/getEmpByName/'+data,
            method:'GET',
            data
          })
        },  
        GET_EMP_BYNAME (data) {
          return request({
            url: process.env.VUE_APP_ADMIN+'/emp/getOneEmpById/'+data,
            method:'GET',
            data
          })
        },                      
    })