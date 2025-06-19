import {  useSuspenseQuery } from "@tanstack/react-query"
import api from "../api/apiLayers"


const useGetOneCarRental = (id) => {

    
  const {data:{getOneCarRental}} = useSuspenseQuery({
    queryKey:[id],
    queryFn:async()=>{
        try {
           let getOne = await api.get(`/api/admin/${id}`)
           return getOne?.data
        } catch (error) {
            throw new Error(error.response?.data?.message || "Erreur serveur");

        }
    }
 })
 
 console.log(getOneCarRental)
  return getOneCarRental
}

export default useGetOneCarRental