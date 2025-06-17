import React from 'react'
import { Outlet } from 'react-router-dom'
import Left from './Left'
import Right from './Right'


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"



const SplitScreen = ({children}) => {

    // let [Left,Right] = children
    // console.log(children);

  return (
    <>
    

     
    <div className="flex w-full bg-[#FDF2E7]">

      <div className=" lg:flex lg:flex-1 md:flex  hidden">
      <Left/>
      </div>

      <div className=" flex-6">
        <Right/>
      </div>
       
        </div>
   
      
        
        
     
        
      
        

    </>
  )
}

export default SplitScreen



