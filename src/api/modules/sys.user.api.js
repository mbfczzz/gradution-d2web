import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
     USER_SEARCH (data) {
      return request({
        url:process.env.VUE_APP_ADMIN+'/user/getAllUser',
        method: 'post',
        type:'application/x-www-form-urlencoded',
        data:Qs.stringify(data)
      })
    },

    UPDATE_USER (data){
      return request({
        url:process.env.VUE_APP_ADMIN+'/user/updateUser',
        method: 'PUT',
        data
      })
    },

    ADD_USER (data){
      return request({
        url:process.env.VUE_APP_ADMIN+'/user/addUser',
        method: 'POST',
        data
      })
    },
    DELETE_USER(data){
     return request({
        url:process.env.VUE_APP_ADMIN+'/user/deleteUser/'+data,
        method: 'DELETE',
      })
    },
    UPDATE_USER_BYISVALID(data){
      return request({
         url:process.env.VUE_APP_ADMIN+'/user/updateUserByIsValid',
         method: 'PUT',
         data
       })
     },
  })
  