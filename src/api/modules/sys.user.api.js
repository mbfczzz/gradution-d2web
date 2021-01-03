import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
     * 用户登录
     * @param {FormData} data 
     */
     USER_SEARCH (data) {
      return request({
        url: '/user/getAllUser',
        method: 'post',
        type:'application/x-www-form-urlencoded',
        data:Qs.stringify(data)
      })
    },

    UPDATE_USER (data){
      return request({
        url: '/user/updateUser',
        method: 'PUT',
        data
      })
    },

    ADD_USER (data){
      return request({
        url: '/user/addUser',
        method: 'POST',
        data
      })
    },

    DELETE_USER(data){
      console.log(data);
     return request({
        url: '/user/deleteUser/'+data,
        method: 'DELETE',
      })
    }
  })
  