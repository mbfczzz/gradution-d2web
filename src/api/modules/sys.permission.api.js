import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
       ROLE_PERMISSION (data) {
        if(data!=""){
            data = "/"+data
        }
        return request({
          url: '/user/getUserRole'+data,
          method: 'get',
        })
      },
      TREE_PERMISSION (data) {
        return request({
          url: '/user/getTreePermission',
          method: 'get',
        })
      },
    })
    