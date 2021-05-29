import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
     ATTENDANCE_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/attendance/getAllAttendance',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_ATTENDANCE(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/attendance/updateAttendance',
          method:'put',
          data
        })
        },
      DELETE_ATTENDANCE(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/attendance/deleteAttendance/'+data,
            method:'delete',
        })
        },  
      ADD_ATTENDANCE(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/attendance/addAttendance',
            method:'post',
            data
        })
        } ,  
    })