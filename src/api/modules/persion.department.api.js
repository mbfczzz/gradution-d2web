import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
        DEPARTMENT_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/department/getAllDepartment',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_DEPARTMENT(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/department/updateDepartment',
          method:'put',
          data
        })
        },
      DELETE_DEPARTMENT(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/department/deleteDepartment/'+data,
            method:'delete',
        })
        },  
      ADD_DEPARTMENT(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/department/addDepartment',
            method:'post',
            data
        })
        },       
      GET_DEPARTMENTNAME(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/department/getDepartmentName',
            method:'get',
            data
        })
        },                    
    })