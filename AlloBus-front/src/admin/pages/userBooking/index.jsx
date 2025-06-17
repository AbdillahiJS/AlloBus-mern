import { useSuspenseQuery,useQueryClient } from '@tanstack/react-query'
import { Link,useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import api from '../../../api/apiLayers'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query"
import toast, { Toaster } from 'react-hot-toast';
import { CircleCheckBig } from 'lucide-react';
import { MoveLeft } from 'lucide-react';
import { io } from 'socket.io-client';
import { useEffect } from "react"

const socket = io('http://localhost:8888');




let bookingSchema = yup.object({

  voitureRendu: yup.boolean()
  .required('Veuillez indiquer si la voiture a été rendue.')
  .typeError('Veuillez sélectionner Oui ou Non'),

});

  


const UserBooking = () => {
  
 let {userBookingId} = useParams()

//  console.log(useParams())
const queryClient = useQueryClient();

  
  let fetchSingleUserReservation=async()=>{
    try {
      let singleUserReservation =await api.get(`/admin/userBooking/${userBookingId}`)
      return singleUserReservation?.data
    } catch (error) {
      console.log(error)
    }
  }

  let {data:{SingleUserReservation,countD}} =useSuspenseQuery({
    queryKey:['userBookingId'],
    queryFn:fetchSingleUserReservation
  })

console.log(SingleUserReservation)

const { control, handleSubmit, formState:{ errors } } = useForm({
  resolver: yupResolver(bookingSchema)
});


const {mutateAsync} =useMutation({

  mutationFn:async(updateData)=>{
    try {
          let  addCarReq= await api.put(`/admin/userBooking/${userBookingId}`,updateData)
          return addCarReq.data
    } catch (error) {
     console.log(error)
    }
}

})

const onSubmit =async(data) => {
console.log('voitureRendu > ',data)

toast.promise(
  mutateAsync(data),
  {
    loading: 'Sauvegarde...',
    success: (data) =>data.message ,
    error: (error) => error.response?.data?.message || 'Erreur',
  }
)



}



useEffect(() => {

      socket.on('Rendu', (id) => {
        console.log('update booking>')
        queryClient.invalidateQueries(['userBookingId']);
      });
     
      socket.on('booking-ID', (id) => {
        console.log('update booking>')
        queryClient.invalidateQueries(['booking-Id']);
      });
     
      
    
      return () => {
        socket.off('Rendu');
        socket.off('booking-ID');
      };
}, [queryClient]);



  return (
    <>
    <Toaster position="top-right"/>
    <div className="flex mt-2 w-full">
        <div className="hover:bg-slate-300/40 w-10 h-10 rounded-full flex justify-center items-center">
        <Link to='/admin/booking'>
        <MoveLeft/>
        </Link>
        </div>
      </div>
    <div className="mx-[15%] mt-8 flex flex-col justify-between items-center p-2 ">
      
  
    <div className=" w-full ">
    
         

        <section  className='bg-white p-2 rounded shadow-sm shadow-[#f1dfcd]'>
        <div  className="flex justify-between mb-4">
          <div className="flex gap-x-2">
          <p className='font-medium'>{SingleUserReservation?.datePrise?.split('T')[0]}</p> /
          <p className='font-medium'>{SingleUserReservation?.dateRetour?.split('T')[0]}</p> 
          </div>
          <div className="flex ">
          <p className='font-medium'>{SingleUserReservation?.reservateurId?.email}</p>
          
          </div>

        </div>
        <Card className='border-none '>
          {
            SingleUserReservation?.rendu ? <div className='w-full flex gap-x-2 justify-center items-center'>
              <CircleCheckBig className="text-green-600"/>
              <span className="text-green-600 text-sm p-1 text-center font-medium">L'utilisateur a bien Rendu la voiture de location</span>
              </div> 
              
           :SingleUserReservation?.completed ?
          <div className="bg-[#f4ece4] text-sm p-1 text-center font-medium text-red-600">
            Votre location de voiture est completement terminer vous devez rendre la voiture plus vite possible sinon tu prendras tout la responsible de cette voiture
          </div> :null
          }
          {/*  */}
          <CardHeader className=''>
          <div className="flex justify-between">
            <div className="flex justify-between p-1 w-[70%] ">
              <div className="gap-x-2">
                  Temps Restant : 
                  <span className='font-medium'>
                  {countD?.days} Jours 
                  </span>

                  <span className='font-medium ml-1'>
                  { countD?.hours} heures 
                  </span>

                  <span className='font-medium ml-1'>
                  { countD?.minutes} minutes
                  </span>
              </div>


                <div className="">
                Total Prix : 
                <span className='font-medium'>{SingleUserReservation?.totalPrix} fr </span>
                </div>

            </div>

          <div className="">complete : {SingleUserReservation?.completed? <span className='text-green-600 font-bold'>Oui</span>:<span className='text-green-600 font-bold'>pas encore</span>}</div>

          </div>
              
          </CardHeader>
          {/* <Link to={`/voitures/${reservation?.voitureId?._id}`} className='hover:bg-[#fdf1e6] py-2 rounded hover:font-medium hover:cursor-pointer'> */}
          <CardContent className='flex justify-around items-center '>
            <div className="">
               {SingleUserReservation?.voitureId?.titre} 
            </div>
            <div className="">
               {SingleUserReservation?.voitureId?.genre} 
            </div>
            <div className="">
               {SingleUserReservation?.voitureId?.passagers} 
            </div>
            <div className="">
              {SingleUserReservation?.voitureId?.boiteVitesse} 
            </div>
            <div className="">
               {SingleUserReservation?.voitureId?.climatisseur?'avec Climatisseur' :'pas de Climatisseur'} 
            </div>
            
            <div className=" grid grid-cols-2 gap-2">
              { 
              SingleUserReservation?.voitureId?.busImage?.map(image=>{
                return <img  key={image} 
                src={image}
                alt={image}
                className="w-16 h-16 object-cover rounded shadow"/>
              })}
            </div> 
          </CardContent>
          
        </Card>
       
        
        <div className="">

        
        
<form onSubmit={handleSubmit(onSubmit)} className='ring-1 w-full flex items-center'>
          
  <div className="grid grid-cols-4 items-center gap-4 my-2 p-1">

<Label className='col-span-2 '> Voiture Rendu </Label>

<Controller
name="voitureRendu"
control={control}
render={({ field}) => (

  <div className="flex flex-col w-full col-span-2"> 

    <RadioGroup  className="col-span-2 flex"
    { ...field }
    onValueChange={(val) => field.onChange(val === "true")}
    value={field.value?.toString()}
    >

   <div className="flex items-center space-x-2">
    <RadioGroupItem  value="true" id="oui" 
     className="h-5 w-5 border-2 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
    />
    <Label htmlFor="oui">Oui</Label>
   </div>

<div className="flex items-center space-x-2">
    <RadioGroupItem  value="false" id="non"
     className="h-5 w-5 border-2 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
    />
    <Label htmlFor="non">Non</Label>
</div>

</RadioGroup>


{errors?.voitureRendu && (
      <p className="text-sm text-red-500 mt-2  col-span-3">{errors?.voitureRendu?.message}</p>
    )}


 
</div>
)}
/>

</div>


 <div className="w-1/3  flex justify-center">
      <Button variant='outline' type='submit' size='sm'
      className='bg-green-500 tracking-wider ml-4 font-medium text-white w-1/3 hover:bg-green-700 cursor-pointer'
      disabled={!SingleUserReservation?.completed || SingleUserReservation?.rendu}
      >
      Edit
      </Button>
  </div>
     
      
      
       

</form>


        </div>
        </section>
             
      
    </div>
      
    </div>
    
    </>
  )
}

export default UserBooking