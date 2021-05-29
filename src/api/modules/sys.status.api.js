import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
        GET_STATUS(data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/status/getStatus',
          method: 'POST',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      }                                            
    })
    