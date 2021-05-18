export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    GET_ROLENAMES(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/rule/getRulesMapName',
            method:'get',
            data
        })
        } ,  
    })