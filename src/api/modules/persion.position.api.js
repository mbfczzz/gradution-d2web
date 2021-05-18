import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 用户登录
       * @param {FormData} data 
       */
       POSITION_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/position/getAllPosition',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_POSITION(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/position/updatePosition',
          method:'put',
          data
        })
        },
      DELETE_POSITION(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/position/deletePosition/'+data,
            method:'delete',
        })
        },  
      ADD_POSITION(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/position/addPosition',
            method:'post',
            data
        })
        },
     GET_POSITIONNAME(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/position/getPositionName',
            method:'get',
            data
        })
        },                           
    })