
import {Card, CardContent, CardFooter, CardHeader} from '../../components/ui/card'
import { User } from 'lucide-react';
import { SunSnow } from 'lucide-react';
import Boite from '../../assets/boite.svg';
import { Link } from "react-router-dom";
import { useQuery,useSuspenseQuery,useQueryClient } from '@tanstack/react-query'
import api from "../../api/apiLayers";
import { io } from 'socket.io-client';
import { useEffect } from "react";


const socket = io('http://localhost:8888');

let fetchAllData=async()=>{
  try {
    let fetchCar =await api.get('/api/admin/')
    return fetchCar?.data
  } catch (error) {
    throw new Error(error.response?.data?.message || " Une erreur s’est produite lors de la récupération des données admin");
  }
}


const VoituresSection = () => {
  const queryClient = useQueryClient();
  
let {data:{getAllVoiture}} =useSuspenseQuery({
  queryKey:['allCar'],
  queryFn:fetchAllData

})

useEffect(() => {
  socket.on('item_created', () => {
    queryClient.invalidateQueries(['allCar']);
  });
 
  

  return () => {
    socket.off('item_created');
  };
   
   
}, [queryClient]);


  return (
    <>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-6">
        
         {
          getAllVoiture?.map(voiture=>{
            const {_id,busImage,titre,passagers,climatisseur,boiteVitesse,prix,categorie }=voiture
            return <Card key={_id} className='ring-1 ring-slate-400 border-none w-full shadow-md shadow-[#f5ddc6] p-2
             bg-white hover:border-4 hover:p-1 hover:border-[#f5ddc6] hover:border-solid  '>
              <Link to={`${_id}`}>
                          <CardHeader className=' '>
                          <img  src={busImage[0]} alt={busImage}
                          className='w-full h-36'
                          />
                        </CardHeader>
                        <CardContent className=" ">
                              <h1 className='text-md font-medium my-2 px-2 '>{titre}</h1>
                                <div className="pt-2 px-1">
                                  <div className='flex  justify-between w-full '>

                                      <div className="flex items-center  p-1 ">
                                        <User color='#6D6D6D' size={20}/> 
                                        <span className='text-sm text-[#6D6D6D] ml-1'>{passagers} passagers</span>
                                      </div>

                                      <div className="flex items-center  p-1 ">
                                        <img src={Boite} className='text-[#6D6D6D]'/> 
                                        <span className='text-sm text-[#6D6D6D] ml-1'>{boiteVitesse}</span>
                                      </div>
                                      </div>
                                      <div className="flex items-center mt-2 gap-2 p-1 ">
                                        <SunSnow color='#6D6D6D' size={20}/> 
                                        <span className='text-sm text-[#6D6D6D] '>{climatisseur}</span>
                                      </div>
                                </div>
                               
                        </CardContent>
                      <CardFooter className='flex flex-col my-4'>
                          <hr className='text-slate-500 w-full'/>
                          <div className="flex justify-between items-center w-full mt-3">
                            <span> Prix</span>
                            <p className='text-[#6D6D6D] text-sm'><span className='text-black font-medium'>{prix} </span>DJF /par jour</p>
                          </div>
                      </CardFooter>
                      </Link>
                </Card>
            })
        }
                                
</div>

    </>
  )
}

export default VoituresSection