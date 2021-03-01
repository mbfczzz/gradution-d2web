export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
     * 用户登录
     * @param {FormData} data 
     */
     USER_LOGIN (data) {
      return request({
        url: process.env.VUE_APP_ADMIN+'/login',
        method: 'post',
        data
      })
    }
  })
  