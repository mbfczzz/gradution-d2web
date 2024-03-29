import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
       USER_ROLE (data) {
        if(data!=""){
            data = "/"+data
        }
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/getUserRole'+data,
          method: 'get',
        })
      },
      GET_ALL_ROLE(data){
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/getAllRole',
          method: 'GET',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_ROLE (data){
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/updateRole',
          method: 'PUT',
          data
        })
      },
      UPDATE_TREE_PERMISSION (data){
        return request({
          url:process.env.VUE_APP_ADMIN+'/user/updateTreePermission',
          method: 'put',
          data
        })
      },
      DELETE_ROLE(data){
        console.log(data);
       return request({
          url:process.env.VUE_APP_ADMIN+'/user/deleteRole/'+data,
          method: 'DELETE',
        })
      }
    })


    