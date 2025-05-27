import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import TimePicker from 'react-time-picker';
import classNames from "react-day-picker/style.module.css";
import { Button } from "../../components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import api from "../../api/apiLayers";
import { getLocalStorage } from "../../helpers/setLocalStorage";
import useGetBooking from "../../hooks/useGetBooking";
import { useStore } from '@nanostores/react';
import { resterTime, tripTimeStore } from "../../helpers/countDown";
import { Link, useParams } from 'react-router-dom'


// import { io } from 'socket.io-client';
// import { useEffect } from "react"


// const socket = io('http://localhost:8888');




const DateAndTimePrise = ({prix}) => {
  
  const queryClient = useQueryClient();

    const [selectedDatePrise, setSelectedDatePrise] = useState();
    const [showCalendarPrise, setShowCalendarPrise] = useState(false);
    const [selectedDateRetour, setSelectedDateRetour] = useState();
    const [showCalendarRetour, setShowCalendarRetour] = useState(false);
   
    const {id} = useParams()
    
    let {getAllBooking,countD} = useGetBooking(id)
    
    // let {days,hours,minutes,seconds} = resterTime(booking?.datePrise,booking?.dateRetour)
    
    console.log({getAllBooking,countD})
    
    const formatter = new Intl.DateTimeFormat("fr-DJ", {
      dateStyle: 'full',       // or 'medium', 'short'
      timeStyle: 'short',      // includes hours and minutes
      timeZone: 'Africa/Djibouti' // force Djibouti local time
    });
    
  // console.log(formatter.format(new Date(getAllBooking?.datePrise)))
  // console.log(formatter.format(new Date(getAllBooking?.dateRetour)))

    const handleDateSelectPrise = (date) => {
        setSelectedDatePrise(date);
        setShowCalendarPrise(false);  
    };

    const handleDateSelectRetour = (date) => {
        setSelectedDateRetour(date);
        setShowCalendarRetour(false);  
    };

 

    const {mutate}=useMutation({
      mutationFn:async(timeDate)=>{
        try {
             let sendBookingReq = await api.post('/users/booking',timeDate,{
                headers:{
                  'Authorization':getLocalStorage('connexion')
                },
              })
              return sendBookingReq?.data
        } catch (error) {
          console.log(error);
        }
      },
      onSuccess:(data)=>{
        console.log(data)
        queryClient.invalidateQueries(['booking']);
      }
    })


  //   const handler = (id) => {
  //     console.log('getBooking ID from socket >', id)
  //     queryClient.invalidateQueries(['booking', id])
  //   }
    
  //   useEffect(() => {
  
  //     socket.on('getBooking', handler)
  
  //     return () => {
  //       socket.off('getBooking', handler)
  //     }
  //   }, [queryClient]) // ✅ now this is fine because it's stable
  // }




  return (
    <>
<div className="flex gap-x-4 ring-1 w-full mt-4 p-2 flex-col lg:flex-row">
     
        <div className="flex flex-col lg:flex-row w-full lg:w-1/2 ring-2 ring-blue-600 w-1/2 p-1 gap-x-4">  

        <div className="relative inline-block w-1/2 w-full lg:w-1/2">
        <Label className=' p-2'>Date de prise en charge</Label>
        <Button
        className="px-4 py-4 border rounded bg-white shadow ring-1 w-full"
        onClick={() => setShowCalendarPrise(!showCalendarPrise)}
        >
        

         { getAllBooking? getAllBooking.datePrise?.split('T')[0] :selectedDatePrise? selectedDatePrise.toLocaleDateString() :'Selectionnez Date Prise'}
      
     

        </Button>

        {showCalendarPrise && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow ">
            <DayPicker
            captionLayout="dropdown"
            mode="single"
            selected={selectedDatePrise}
            onSelect={handleDateSelectPrise}
            disabled={{before:new Date()}}
            />
        </div>
        )}

        </div>

    

        <div className="relative inline-block w-1/2 w-full lg:w-1/2">
        <Label className=' p-2'>Date de retour</Label>
        <Button
        className="px-4 py-4 border rounded bg-white shadow w-full"
        onClick={() => setShowCalendarRetour(!showCalendarRetour)}
        >

       {getAllBooking? getAllBooking?.dateRetour?.split('T')[0] :selectedDateRetour? selectedDateRetour.toLocaleDateString() :'Selectionnez Date Retour'} 
         
        </Button>

        {showCalendarRetour && (
        <div className="absolute z-10 mt-2 mb-8 bg-white border rounded shadow ">
            <DayPicker
            captionLayout="dropdown"
            mode="single"
            selected={selectedDateRetour}
            onSelect={handleDateSelectRetour}
            disabled={{before:new Date()}}
            />
        </div>
        )}
        </div>

      </div>
      <div className="flex flex-col gap-x-4 lg:w-1/2 ring-1 ring-yellow-600/70 my-1 ">

        <div className="p-1">
          <p className="">
            {
             getAllBooking?.totalPrix ? ( 
                <div>
                Total : <span className='font-medium'>
                   {getAllBooking?.totalPrix } * { getAllBooking?.daysRemaining } jours   
                    = {getAllBooking ?.totalPrix*getAllBooking?.daysRemaining} fr 
                  </span> 

                </div> 
                  ):''
            }
          
          </p>
          {/* <p className="">
            Jours : <span className='font-medium'>{getAllBooking?.daysRemaining} jours</span> 
          </p>  */}

        </div>

        <div className="flex gap-x-2 gap-y-2">
          <h1>Temps Restant :</h1>
          <p className=" font-medium">{countD?.days} Jours</p>
         <p className="font-medium">{countD?.hours} heure</p>
         <p className="font-medium">{countD?.minutes} minutes</p>
         {/* <p className="font-medium">{countD?.seconds } secondes</p>     */}

        </div>
       

      </div>

</div> 

<div className="ring-1 lg:w-1/2  w-full">

        <Button variant='outline' className="mt-4 w-full  rounded-sm bg-purple-500/80 hover:bg-purple-900/100  text-white text-lg"
         disabled={!!getAllBooking}

        onClick={()=>{

          mutate({
            prise: new Date(new Date(selectedDatePrise).getTime() + 8.5 * 60 * 60000),
            retour: new Date(new Date(selectedDateRetour).getTime() + 12 * 60 * 60000),
            voitureId:id,
            prixTotal:parseInt(prix) ,
            days:Math.floor(Math.abs(new Date(new Date(selectedDatePrise).getTime() + 8.5 * 60 * 60000)- new Date(new Date(selectedDateRetour).getTime() + 12 * 60 * 60000)) / (1000 * 60 * 60 * 24)) || 1
          });
           
        }}
        
        >Reservez</Button>
    </div>
    

    </>
  )
}

export default DateAndTimePrise