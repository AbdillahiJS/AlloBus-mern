import { Link,useParams } from "react-router-dom"
import { MoveLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSuspenseQuery } from "@tanstack/react-query";
import api from "../../../api/apiLayers";

import { ScrollArea } from "@/components/ui/scroll-area"





const index = () => {
    const {userId} =useParams()

let {data:{userInfo,userInfoReservation}} = useSuspenseQuery({
  queryKey:['user-info'],
  queryFn:async()=>{
    try {
      let singleUser =await api.get(`/api/admin/userInfo/${userId}`)
      return singleUser?.data
    } catch (error) {
      console.log(error)
    }
  }

})
console.log('userInfo > ',userInfoReservation)

  return (
    <>
    <div className="flex flex-col items-center">
      <div className="flex mt-4 w-full">
        <div className="hover:bg-slate-300/40 w-10 h-10 rounded-full flex justify-center items-center">
        <Link to='/admin/users'>
        <MoveLeft/>
        </Link>
        </div>
      </div>

    <Card className='bg-white mt-2 w-full lg:w-1/2 ring-0 border-none shadow-xs shadow-black'>
     
      <CardContent className='flex flex-col items-center w-full ring-0'>

        <div className="w-full  ">
            <h1 className="flex justify-center font-bold capitalize tracking-wider">Information d'utilisateur</h1>
          <div className="  flex flex-col justify-around p-2 gap-y-2">
          
          <div className=" flex items-center gap-x-2">
            <div className="h-10 w-10 bg-blue-300/60 p-4 text-sm font-bold rounded-full  ring-1 flex justify-center items-center" >
              {userInfo.prenom.toUpperCase().at(0)}{userInfo.nom.toUpperCase().at(0)}
            </div>
            <div className="font-bold text-sm">
               {userInfo.email}
            </div>

          </div>
          <div className="text-sm flex flex-col mt-2 gap-y-2 pl-2">
            <p className="">
              Prenom: <span className="font-bold">{userInfo.prenom}</span>
            </p>
            <p className="">
              Nom: <span className="font-bold ">{userInfo.nom}</span>
            </p>
            <p className="">
              Email Active : {userInfo.isActive?<span className="font-bold text-green-600/80">Oui</span>:<span className="font-bold text-red-600/80">pas encore</span>}
            </p>

          </div>

          </div>


        </div>
       
       <hr className="w-[90%] my-2 "></hr>
       
        <div className="w-full flex flex-col mt-2">

   <h1 className="flex justify-center font-bold capitalize tracking-wider my-2">Historique de Reservation  { userInfoReservation?.length ===0? <span className="ml-1 font-bold capitalize tracking-wider text-blue-600"> Vide</span>:null}</h1>
   <ScrollArea className="h-[250px] w-full rounded-md">



          <div className="  flex flex-col justify-around p-2 gap-y-2">
            {userInfoReservation?.map(userReservez=>{
              return <div key={userReservez._id}  className="flex flex-col my-1 gap-x-2 p-1 py-2 rounded-sm odd:bg-slate-300/50 ring-1 ring-slate-300 hover:bg-[#ffdfc2] hover:text-black hover:ring-0 hover:cursor-pointer">
                <Link to={`/admin/booking/${userReservez._id}`}>
                <div className="flex justify-center gap-x-2 font-bold ">
                     <p className="text-sm">{ userReservez?.datePrise?.split('T')[0]}</p> / 
                     <p className="text-sm">{userReservez?.dateRetour?.split('T')[0]}</p>
                </div>

                <div className="flex justify-around pl-2 gap-x-2 text-sm">
                  <p>Tatol Prix : <span className="text-sm font-bold">{userReservez?.totalPrix} fr</span></p>
                  <p>Terminer : {userReservez?.totalPrix? <span className="text-sm font-bold text-green-500">Oui</span>:<span className="text-sm font-bold text-red-500">pas encore</span>}</p>
                  <p>Voiture Rendu : {userReservez?.rendu? <span className="text-sm font-bold text-green-500">Oui</span>:<span className="text-sm font-bold text-red-500">pas encore</span>}</p>
                </div>
                </Link>
            
              </div>
            })}
          
          

          </div>

  </ScrollArea>





        </div>


      </CardContent>
    </Card>
    </div>
    
    </>
  )
}

export default index