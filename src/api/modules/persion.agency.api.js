import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
       AGENCY_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/agency/getAllAgency',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_AGENCY(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/agency/updateAgency',
          method:'put',
          data
        })
        },
      DELETE_AGENCY(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/agency/deleteAgency/'+data,
            method:'delete',
        })
        },  
      ADD_AGENCY(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/agency/addAgency',
            method:'post',
            data
        })
        },
        GET_AGENCY_MAP(data) {
          return request({
            url: process.env.VUE_APP_ADMIN+'/agency/getAgencyByMap',
            method: 'GET',
            data
          })
        },
    })