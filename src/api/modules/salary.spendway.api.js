import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
       * 消息模块
       * @param {FormData} data 
       */
        GET_SPEND_WAY(data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/spendway/getSpendWay',
          method: 'GET',
          data
        })
      },
       SPENDWAY_LIST (data) {
            return request({
              url: process.env.VUE_APP_ADMIN+'/spendway/getAllSpendWay',
              method:'post',
              type:'application/x-www-form-urlencoded',
              data:Qs.stringify(data)
            })
          },
       UPDATE_SPENDWAY(data){
            return request({
              url: process.env.VUE_APP_ADMIN+'/spendway/updateSpendWay',
              method:'put',
              data
            })
            },
      DELETE_SPENDWAY(data){
              return request({
                url: process.env.VUE_APP_ADMIN+'/spendway/deleteSpendWay/'+data,
                method:'delete',
            })
            },  
       ADD_SPENDWAY(data){
              return request({
                url: process.env.VUE_APP_ADMIN+'/spendway/addSpendWay',
                method:'post',
                data
            })
            }                                            
    })
    