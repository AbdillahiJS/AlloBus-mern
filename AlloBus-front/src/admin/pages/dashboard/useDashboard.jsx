import { useSuspenseQuery } from "@tanstack/react-query"
import api from "../../../api/apiLayers"



let fetchDashboard=async()=>{
    try {
      let fetchDashbaord =await api.get('/admin/dashboard')
      return fetchDashbaord?.data
    } catch (error) {
      console.log(error)
    }
  }

const useDashboard = () => {

    
let {data} =useSuspenseQuery({
    queryKey:['dashboard'],
    queryFn:fetchDashboard
  })

  return data
}

export default useDashboard