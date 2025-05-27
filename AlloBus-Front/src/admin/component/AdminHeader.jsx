import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react';


const AdminHeader = () => {
  const location = useLocation().pathname
  console.log(location);
  console.log( location.split('/') );
  // 
  return (
    <div className=' bg-white flex justify-between lg:p-4 p-2'>
       
      <div className="text-[#123151] lg:text-2xl flex flex-row lg:justify-center font-bold 
      ring-1 p-1 lg:hidden md:hidden sm:flex gap-4 flex-1"
      >

        <Menu className='ring-1'/>
        <span className='ring-1'>AlloBus</span>

     </div>
     {/* location.split('/admin/')[1]?.split('/') */}
        <div className="ring-1 ring-red-600 flex flex-1  items-center font-medium px-1 capitalize sm:text-sm hidden lg:flex md:flex">

          {
          location ==='/admin'?'Dashboard'
          :location.split('/admin/')[1]
          }

          </div>
        <div className=" lg:flex flex-2 mx-2 md:flex hidden ring-1">
            {/* <input type="text" placeholder='Search ....' className='bg-slate-50 w-full outline-2 p-1 outline-[#fff3e7] placeholder:text-black'/> */}
        </div>
        <div className="ring-1 ring-red-600 flex flex-1 sm:flex-2 items-center px-1">profile</div>
    </div>
  )
}

export default AdminHeader