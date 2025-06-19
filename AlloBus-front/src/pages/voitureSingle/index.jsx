
import Header from '../../components/Header'
import useGetOneCarRental from '../../hooks/useGetOneCarRental'
import Caresoul from './Caresoul'
import { Link, useParams } from 'react-router-dom'
import { User } from 'lucide-react';
import { SunSnow } from 'lucide-react';
import { MoveLeft } from 'lucide-react';
import Boite from '../../assets/boite.svg'
import { Button } from '../../components/ui/button'
import DateAndTimePrise from './DateAndTimePrise'
import {  useSuspenseQuery,useQueryClient } from "@tanstack/react-query"
import { io } from 'socket.io-client';
import { useEffect } from "react"

const socket = io('http://localhost:8888');


const index = () => {

  const queryClient = useQueryClient();

  const {id} = useParams()
 
 let  getOneCarRental = useGetOneCarRental(id)


  return (
    <>
    <Header/>
    <div className="mx-[15%] mt-6 mb-4 flex  items-center  gap-x-2">
      <Link to='/voitures'>
        <MoveLeft/>
      </Link>
     
    </div>
    <div className=" flex mx-[15%]  justify-between p-4  bg-white shadow-xs shadow-[#f5ddc6]">
    
    <Caresoul/>
    <div className=" w-1/3 ml-4 flex flex-col items-center">
      <div className="flex items-center justify-center w-full font-bold tracking-wider ">{getOneCarRental?.titre}</div><br/>
         <div className="w-full flex flex-col gap-4">
              <div className="flex p-1 ">
                <User color='#6D6D6D' size={20}/> 
                <span className='text-sm text-[#6D6D6D] ml-1'>{getOneCarRental?.passagers} passagers</span>
              </div> 
              <div className="flex p-1 w-full">
                <SunSnow color='#6D6D6D' size={20}/> 
                <span className='text-sm text-[#6D6D6D] ml-1'>{getOneCarRental?.climatisseur==='oui'?' avec ':' sans '} climatisseur</span>
              </div> 
              <div className="flex  p-1  w-full  p-1 ">
                <img src={Boite} className='text-[#6D6D6D] w-6 h-6'/> 
                <span className='text-sm text-[#6D6D6D] ml-1'>{getOneCarRental?.boiteVitesse}</span>
              </div>
              <div className="flex  w-full justify-between border-t-1 border-solid border-slate-400 p-1">
                    <span> Prix</span>
                    <p className='text-[#6D6D6D] text-sm'><span className='text-black font-medium'>{getOneCarRental?.prix} </span>DJF /par jour</p>
              </div>

        </div>
      
    </div>


     
    </div>


      <div className="mx-[15%] mt-6 mb-4 flex flex-col bg-white gap-x-2 p-4 ">

        <h1 className='text-lg font-medium tracking-wider'>Reservation de Voiture de l'occassion </h1>
      <DateAndTimePrise {...getOneCarRental}/>
   
    </div>
    
    </>
  )
}

export default index