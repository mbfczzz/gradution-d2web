import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
     MONEY_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/money/getAllMoney',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_MONEY(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/money/updateMoney',
          method:'put',
          data
        })
        },
      DELETE_MONEY(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/money/deleteMoney/'+data,
            method:'delete',
        })
        },  
      ADD_MONEY(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/money/addMoney',
            method:'post',
            data
        })
        } ,  
    //   GET_SPEND_ITEM(data){
    //     return request({
    //         url: process.env.VUE_APP_ADMIN+'/expenditure/getSpendItem',
    //         method:'GET',
    //         data
    //     }) 
    //   }               
    })