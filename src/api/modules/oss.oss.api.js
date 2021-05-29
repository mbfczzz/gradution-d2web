export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
    OSS_POLICY (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/oss/policy',
          method:'get',
          data
      })
    },
    OSS_CALLBACK(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/oss/callback',
          method:'post',
          data
        })
        }          
    })