export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
     USER_LOGIN (data) {
      return request({
        url: process.env.VUE_APP_ADMIN+'/login',
        method: 'post',
        data
      })
    }
  })
  