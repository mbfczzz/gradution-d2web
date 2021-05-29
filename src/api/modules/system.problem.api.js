import Qs from 'qs'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
     PROBLEM_LIST (data) {
        return request({
          url: process.env.VUE_APP_ADMIN+'/problem/getAllProblem',
          method:'post',
          type:'application/x-www-form-urlencoded',
          data:Qs.stringify(data)
        })
      },
      UPDATE_PROBLEM(data){
        return request({
          url: process.env.VUE_APP_ADMIN+'/problem/updateProblem',
          method:'put',
          data
        })
        },
      DELETE_PROBLEM(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/problem/deleteProblem/'+data,
            method:'delete',
        })
        },  
      ADD_PROBLEM(data){
          return request({
            url: process.env.VUE_APP_ADMIN+'/problem/addProblem',
            method:'post',
            data
        })
        } ,         
    })