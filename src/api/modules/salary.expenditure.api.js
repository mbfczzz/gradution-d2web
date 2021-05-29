import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
     EXPENDITURE_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/expenditure/getAllExpenditure',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_EXPENDITURE(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/expenditure/updateExpenditure',
          method:'put',
          data
        })
        },
      DELETE_EXPENDITURE(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/expenditure/deleteExpenditure/'+data,
            method:'delete',
        })
        },  
      ADD_EXPENDITURE(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/expenditure/addExpenditure',
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