import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link, Navigate, useParams,useLocation } from 'react-router-dom'
import api from '../api/apiLayers'
import Header from './Header'
import { Button } from './ui/button'


const confirmationEmail = () => {
  const {confirmationId } =useParams()
  const {pathname} = useLocation()
  console.log(pathname.startsWith('/confirmation'));
  const {data,isSuccess,isError} = useQuery({
    query:['confirmation'],
    queryFn:async()=>{
      try {
       let confirme  = await api.get(`/users/confirmation/${confirmationId}`)
       return confirme?.data
        
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <>
    <Header/>
    <div className="mx-[15%] mt-8  flex flex-col items-center">
      {
        isSuccess ?<div className='bg-green-300 p-2 rounded-md font-medium text-blue-600 my-8'>{data?.message}</div>:null
      }
     
      {
        isError ?<div className='bg-red-300 p-2 rounded-md font-medium text-blue-600 my-8'>{data?.message}</div>:null
      }


    </div>
    
    
    </>
  )
  
}

export default confirmationEmail