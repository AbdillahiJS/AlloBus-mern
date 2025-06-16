import {  useSuspenseQuery } from "@tanstack/react-query"
import api from "../api/apiLayers"
import { resterTime,tripTimeStore } from "../helpers/countDown"
import { getLocalStorage } from "../helpers/setLocalStorage"
// import { bookingStore } from "../store/booking"
import { useState } from "react";


const useGetBooking = (id) => {
 

  const {data:{getAllBooking,countD}} = useSuspenseQuery({
    queryKey:['booking-ID'],
    queryFn:async()=>{
        try {
           let getBooking = await api.get(`/users/booking/${id}`)
           return getBooking?.data
          } catch (error) {
           
            throw new Error(error.response?.data?.message ||'Une erreur s’est produite lors de la récupération des données bookings')
          }
        },
        
      })
      
    

  return {getAllBooking,countD}
}

export default useGetBooking