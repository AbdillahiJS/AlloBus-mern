import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { CircleUserRound } from 'lucide-react';

const AdminHeader = () => {
  const location = useLocation().pathname
  
  
  return (
    <div className=' bg-white flex justify-between lg:p-4 p-2'>
       
      <div className="text-[#123151] lg:text-2xl flex flex-row lg:justify-center font-bold 
      ring-1 p-1 lg:hidden md:hidden sm:flex gap-4 flex-1"
      >


     </div>
     
        <div className=" flex flex-1  items-center font-medium px-1 capitalize sm:text-sm lg:flex md:flex">

          {
          location ==='/admin'?'Dashboard'
          :location.split('/admin/')[1]
          }

          </div>

        <div className=" lg:flex flex-2 mx-2 md:flex hidden">
        </div>
           
        <div className=" flex flex-1 justify-center sm:flex-2 items-center px-1  gap-x-4">
        <Avatar className='size-9 ring-1'>
                <AvatarImage  src={'https://avatar.iran.liara.run/public/boy'} className=''/>
                <AvatarFallback> <CircleUserRound color='black'/> </AvatarFallback>
              </Avatar>
              <span>Admin</span>
        </div>
    </div>
  )
}

export default AdminHeader