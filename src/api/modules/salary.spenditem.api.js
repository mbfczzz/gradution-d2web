export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
     GET_SPEND_ITEM(data){
        return request({
            url: process.env.VUE_APP_ADMIN+'/spenditem/getSpendItem',
            method:'GET',
            data
        }) 
      }                                      
    })    