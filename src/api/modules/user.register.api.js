export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    USER_REGISTER (data) {
     return request({
       url: process.env.VUE_APP_ADMIN+'/register',
       method: 'post',
       data
     })
   }
 })
 