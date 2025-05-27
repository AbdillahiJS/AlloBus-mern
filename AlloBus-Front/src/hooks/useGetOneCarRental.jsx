import {  useSuspenseQuery } from "@tanstack/react-query"
import api from "../api/apiLayers"


const useGetOneCarRental = (id) => {

    
  const {data:{getOneCarRental}} = useSuspenseQuery({
    queryKey:[id],
    queryFn:async()=>{
        try {
           let getOne = await api.get(`/admin/${id}`)
           return getOne?.data
        } catch (error) {
            console.log(error)
        }
    }
 })
 
 console.log(getOneCarRental)
  return getOneCarRental
}

export default useGetOneCarRental