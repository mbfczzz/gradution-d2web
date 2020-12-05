export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
     * 用户登录
     * @param {FormData} data 
     */
     USER_LOGIN (data) {
      return request({
        url: '/login',
        method: 'post',
        data
      })
    }
  })
  