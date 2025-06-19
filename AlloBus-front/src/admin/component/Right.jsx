import React from 'react'
import {Outlet} from 'react-router-dom'
import AdminHeader from './AdminHeader'



const Right = () => {
  


  return (
    <>
    <div className="">
        <AdminHeader/>
        <div className="p-2 h-screen">
           <Outlet/> 
        </div>
    </div>
    
    </>
  )
}

export default Right