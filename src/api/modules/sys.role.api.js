import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
       USER_ROLE (data) {
        if(data!=""){
            data = "/"+data
        }
        return request({
          url: '/user/getUserRole'+data,
          method: 'get',
        })
      },
      GET_ALL_ROLE(data){
        return request({
          url: '/user/getAllRole',
          method: 'get',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_ROLE (data){
        return request({
          url: '/user/updateRole',
          method: 'PUT',
          data
        })
      },
      ADD_ROLE (data){
        return request({
          url: '/user/addRole',
          method: 'POST',
          data
        })
      },
      DELETE_ROLE(data){
        console.log(data);
       return request({
          url: '/user/deleteRole/'+data,
          method: 'DELETE',
        })
      }
    })


    