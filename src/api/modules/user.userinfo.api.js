export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
       USER_USERINFO (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/getUserInfo',
          method:'get',
          data,
        })
      }
    })
    