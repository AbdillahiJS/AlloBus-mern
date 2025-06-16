import { useSuspenseQuery,useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../../api/apiLayers'
import Header from '../../components/Header'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { resterTime } from '../../helpers/countDown'
import { getLocalStorage } from '../../helpers/setLocalStorage'
import { CircleCheckBig } from 'lucide-react';
import { io } from 'socket.io-client';
import { useEffect } from "react"
import { Button } from '../../components/ui/button'



const socket = io('http://localhost:8888');

let fetchAllReservation=async()=>{
  try {
    let fetchCarReservation =await api.get('/users/myrervation')
    return fetchCarReservation?.data
  } catch (error) {
    console.log(error)

  }
}


const  MONRESERVEZ= () => {

  const queryClient = useQueryClient();

  let {data:{getAllMyReservation}} =useSuspenseQuery({
    queryKey:['monReservation'],
    queryFn:fetchAllReservation
  
  })
  

  useEffect(() => {

    socket.on('Rendu', (id) => {
      console.log('update booking>')
      queryClient.invalidateQueries(['userBookingId']);
      queryClient.invalidateQueries(['booking-ID']);
      
    });
   
    
  
    return () => {
      socket.off('Rendu');
    };
}, [queryClient]);


  return (
    <>
    <Header/>
    <div className="mx-[15%] mt-8 flex flex-col justify-between items-center p-2 ">
    <div className="flex justify-between w-full font-bold"><p>Mon Historique de Reservation {getAllMyReservation?.length ===0 ? " Vide" : null}</p></div>
    <div className=" w-full mt-4">
      {
        getAllMyReservation?.map(reservation=>{ 

          let {days,hours,minutes,seconds} = resterTime(reservation?.datePrise,reservation?.dateRetour)

        return <section key={reservation?._id} className='bg-white p-2 rounded shadow-sm shadow-[#f1dfcd] my-4'>
        <div  className="flex justify-between mb-4">
          <div className="flex gap-x-2">
          <p className='font-medium'>{reservation?.datePrise?.split('T')[0]}</p> /
          <p className='font-medium'>{reservation?.dateRetour?.split('T')[0]}</p>
          </div>

         

          <div className="flex ">
          <p className='font-medium'>{reservation?.reservateurId?.email}</p>
          
          </div>

        </div>
        <Card className='border-none '>
          {
           
            reservation?.rendu ? <div className='w-full flex gap-x-2 justify-center items-center'>
              <CircleCheckBig className="text-green-600"/>
              <span className="text-green-600 text-sm p-1 text-center font-medium">L'utilisateur a bien Rendu la voiture de location</span>
              </div> 
              
           :reservation?.completed ?
          <div className="bg-[#f4ece4] text-sm p-1 text-center font-medium text-red-600">
            Votre location de voiture est completement terminer vous devez rendre la voiture plus vite possible sinon tu prendras tout la responsible de cette voiture
          </div> :null
          
          }
          <CardHeader className=''>
          <div className="flex justify-between gap-x-2">
            <div className="flex justify-between  p-1 w-1/2">
              <div className="">
                  Temps Restant : 
                  <span className='font-medium mr-2  ml-1'>
                  {days} Jours
                  </span>

                  <span className='font-medium mr-2'>
                  { hours} Heure
                  </span>

                  <span className='font-medium'>
                  { minutes} min
                  </span>
              </div>


                <div className="ml-1 ">
                Total Prix : <span className='font-medium'>{reservation?.totalPrix} fr </span>
                </div>

            </div>

            <div className="">complete : {reservation?.completed? <span className='text-green-600'>Oui</span>:<span className='text-green-600'>pas encore</span>}</div>

          </div>
              
          </CardHeader>
          <Link to={`/voitures/${reservation?.voitureId?._id}`} className='hover:bg-[#fdf1e6] py-2 rounded hover:font-medium hover:cursor-pointer'>
          <CardContent className='flex justify-around items-center '>
            <div className="">
              {reservation?.voitureId?.titre}
            </div>
            <div className="">
              {reservation?.voitureId?.genre}
            </div>
            <div className="">
              {reservation?.voitureId?.passagers}
            </div>
            <div className="">
              {reservation?.voitureId?.boiteVitesse}
            </div>
            <div className="">
              {reservation?.voitureId?.climatisseur?'avec Climatisseur' :'pas de Climatisseur'}
            </div>
            
            <div className=" grid grid-cols-2 gap-2">
              {reservation?.voitureId?.busImage?.map(image=>{
                return <img  key={image} 
                src={image}
                alt={image}
                className="w-16 h-16 object-cover rounded shadow"/>
              })}
            </div>
          </CardContent>
          </Link>
        </Card>
       
        
        </section>
             
      })
      }
    </div>
      
    </div>
    </>
  )
}

export default MONRESERVEZ