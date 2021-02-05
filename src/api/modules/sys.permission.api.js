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
          url: process.env.ADMIN_SERVICE+'/user/getUserRole'+data,
          method: 'get',
        })
      },
      TREE_PERMISSION (data) {
        return request({
          url: process.env.ADMIN_SERVICE+'/user/getTreePermission',
          method: 'get',
        })
      },
      GET_ALL_PERMISSION (data) {
        return request({
          url: process.env.ADMIN_SERVICE+'/user/getAllPermission',
          method: 'POST',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      GET_PERMISSIONTYPE (data) {
        return request({
          url: process.env.ADMIN_SERVICE+'/user/getPermissionType',
          method: 'GET',
        })
      },
      GET_HIERARCHY (data) {
        return request({
          url: process.env.ADMIN_SERVICE+'/user/getHierarchy',
          method: 'GET',
        })
      },
      UPDATE_PERMISSION (data) {
        return request({
          url: process.env.ADMIN_SERVICE+'/user/updatePermission',
          method: 'POST',
          data
        })
      },
      ADD_PERMISSION (data) {
        return request({
          url: process.env.ADMIN_SERVICE+'/user/addPermission',
          method: 'POST',
          data
        })
      }
    })
    