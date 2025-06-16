import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../api/apiLayers'
import toast from 'react-hot-toast';

const useProfile = () => {


    let {data:{userInfo,userInfoReservation,information}} = useSuspenseQuery({
        queryKey:['userProfile'],
        queryFn:async()=>{
          try {
            let userProfile =await api.get(`/users/profile`)
            return userProfile?.data
          } catch (error) {
            throw new Error(error.response?.data?.message || " Une erreur s’est produite lors de la récupération des données profile");
          }
        }
      
      })




  return {userInfo,userInfoReservation,information}
}

export default useProfile