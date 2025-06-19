import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { Button } from "../../components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import api, { getAccessToken } from "../../api/apiLayers";
import { getLocalStorage } from "../../helpers/setLocalStorage";
import useGetBooking from "../../hooks/useGetBooking";
import { useStore } from '@nanostores/react';
import { resterTime, tripTimeStore } from "../../helpers/countDown";
import { Link, useParams,useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { OctagonAlert } from 'lucide-react';




const DateAndTimePrise = ({prix}) => {
  
  const queryClient = useQueryClient();

    const [selectedDatePrise, setSelectedDatePrise] = useState();
    const [showCalendarPrise, setShowCalendarPrise] = useState(false);
    const [selectedDateRetour, setSelectedDateRetour] = useState();
    const [showCalendarRetour, setShowCalendarRetour] = useState(false);
   
    const {id} = useParams()
    
    let {getAllBooking} = useGetBooking(id)
   let navigate = useNavigate()
   
 
    
    const formatter = new Intl.DateTimeFormat("fr-DJ", {
      dateStyle: 'full',      
      timeStyle: 'short',      
      timeZone: 'Africa/Djibouti'
    });
    
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
             let sendBookingReq = await api.post('/api/users/booking',timeDate)
              return sendBookingReq?.data
        } catch (error) {
          console.log(error);
          throw new Error(error.response?.data?.message || "Une erreur s’est produite lors de l'envoyer des données ");
        }
      },
      onSuccess:(data)=>{
        queryClient.invalidateQueries(['booking'])
      }
    })



  return (
    <>
    <Toaster position="top-right"/>
<div className="flex gap-x-4  mt-4 p-2 flex-col lg:flex-row">
     
        <div className="flex flex-col  lg:flex-row w-full   w-1/2 p-1 gap-x-4">  

        <div className="relative inline-block w-1/2 w-full lg:w-1/2">
        <Label className=' p-2'>Date de prise en charge</Label>
        <Button
        className="px-4 py-4 border rounded bg-white shadow ring-1 w-full"
        onClick={() => setShowCalendarPrise(!showCalendarPrise)}
        >
        
 { getAllBooking?.completed ? selectedDatePrise? selectedDatePrise?.toLocaleDateString() :'Selectionnez Date Prise' :getAllBooking?.datePrise?.split('T')[0] }  
      
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

 { getAllBooking?.completed ? selectedDateRetour? selectedDateRetour?.toLocaleDateString() :'Selectionnez Date Retour' : getAllBooking?.dateRetour?.split('T')[0]}  

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
      

</div> 

<div className="  w-full">

        <Button variant='outline' className="mt-4 w-full  rounded-sm bg-purple-900/100 hover:bg-purple-600/80  text-white text-lg"
        



        onClick={()=>{
          if (getAccessToken() && selectedDatePrise==='' && selectedDateRetour==='') {
            
                      mutate({
                        prise: new Date(new Date(selectedDatePrise).getTime() + 8.5 * 60 * 60000),
                        retour: new Date(new Date(selectedDateRetour).getTime() + 12 * 60 * 60000),
                        voitureId:id,
                        prixTotal:parseInt(prix) ,
                        days:Math.floor(Math.abs(new Date(new Date(selectedDatePrise).getTime() + 8.5 * 60 * 60000)- new Date(new Date(selectedDateRetour).getTime() + 12 * 60 * 60000)) / (1000 * 60 * 60 * 24)) || 1
                      });
                      navigate('/reservez')
          }else{

          toast.custom(<div className="flex gap-x-4  bg-white p-2 text-orange-600 rounded shadow-sm shadow-black">
            <OctagonAlert/>
            <p>Vous devez de se connecter pour le Reservation et Remplir le 2 champs</p>
          </div>)

          }
          
        
           
        }}
        
        >Reservez</Button>
    </div>
    

    </>
  )
}

export default DateAndTimePrise