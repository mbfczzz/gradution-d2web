import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
       ROLE_PERMISSION (data) {
        if(data!=""){
            data = "/"+data
        }
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/getUserRole'+data,
          method: 'get',
        })
      },
      TREE_PERMISSION (data) {
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/getTreePermission',
          method: 'get',
        })
      },
      GET_ALL_PERMISSION (data) {
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/getAllPermission',
          method: 'POST',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      GET_PERMISSIONTYPE (data) {
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/getPermissionType',
          method: 'GET',
        })
      },
      GET_HIERARCHY (data) {
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/getHierarchy',
          method: 'GET',
        })
      },
      UPDATE_PERMISSION (data) {
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/updatePermission',
          method: 'POST',
          data
        })
      },
      ADD_PERMISSION (data) {
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/addPermission',
          method: 'POST',
          data
        })
      }
    })
    