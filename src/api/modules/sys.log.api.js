import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
        LOG_LIST (data) {
        return request({
          url: process.env.ADMIN_SERVICE+'/log/searchAllLog',
          method: 'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      }
    })
    