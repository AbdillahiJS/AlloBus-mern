
import { useSuspenseQuery } from "@tanstack/react-query"
import api from "../../../api/apiLayers"




let fetchUsersDashboard=async()=>{
    try {
      let usersDashbaord =await api.get('/api/admin/usersDashboard')
      // console.log('usersDashbaord > ',usersDashbaord?.data)
      return usersDashbaord?.data
    } catch (error) {
      console.log(error)
    }
  }

const useUserSquare = () => {

    let {data} =useSuspenseQuery({
        queryKey:['usersDashboard'],
        queryFn:fetchUsersDashboard
      })
    
console.log('data >',data)

  return data
}

export default useUserSquare