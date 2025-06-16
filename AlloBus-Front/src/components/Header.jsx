import { Link, NavLink, useLocation } from "react-router-dom"
import Logo from '../assets/logoBus.png'
import { Bus } from 'lucide-react';
import { Button } from "./ui/button";
import useProfile from "../hooks/useProfile";
import { getLocalStorage } from "../helpers/setLocalStorage";
import { ChevronDown } from 'lucide-react';
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
  import { Separator } from "@/components/ui/separator"
  import { Power } from 'lucide-react';
  import { UserRoundPen } from 'lucide-react';
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 

const navs=['Home','Nos Voitures','Mon reservation']
const Links=['/','/voitures','/reservez']


const Header = () => {
    let location = useLocation()
   let {userInfo,userInfoReservation} = useProfile()


  return (
    <header className=" mx-[10%] flex justify-between items-center p-2 ">
        <div className="ml-10 w-[40%] flex items-center gap-x-10 ">
               <div className=" flex flex-col items-center  p-1">
                <Link to='/'>
                <span className="text-[#0b5aaf] text-lg font-bold ">AlloBus</span>
                </Link>
                </div>
                
                {
                    location.pathname==='/connexion' || location.pathname==='/enregistre' || location.pathname.startsWith('/confirmation')
                    ? '' :<nav className=" w-[80%] ">
                             <ul className="flex gap-x-2 items-center h-full p-2">
                                   {
                                      navs.map((nav,i)=>{
                                            return <li key={nav} className="text-[#1572D3] text-xs font-medium  ">
                                              <NavLink to={Links[i]}  
                                                className={({ isActive }) =>
                                               `p-2 rounded-sm ${
                                                      isActive 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                }`
                                          }
                                    >
                                    {nav}
                                    </NavLink>

                                    </li>
                            })
                        }
                    </ul>
                </nav>
                }
        </div>
        
       {
         !!getLocalStorage('connexion') ? (
            <div className="flex justify-around items-center gap-3  w-[25%] ">
                <div className="flex items-center gap-x-2">
                <Popover className=''>
              <PopoverTrigger>

              <Avatar className='size-9 ring-1'>
                <AvatarImage  src={userInfo?userInfo?.profileImage :'https://avatar.iran.liara.run/public/boy'} className=''/>
                <img src="https://avatar.iran.liara.run/public/boy" />
              </Avatar>
            
               
             </PopoverTrigger>
            <PopoverContent className='flex flex-col bg-white border-none shadow-none ring-1 ring-slate-500 w-[200px]'>
            
                <Link to='/profile'> 

                     <div className="flex gap-x-2 items-center hover:bg-slate-300/50 rounded hover:font-medium p-1">
                      <UserRoundPen size={18}/>
                      <span className='text-sm font-medium'>Profile</span>
                    </div>

                 </Link> 

                <Separator orientation="horizontal" className="my-2 border border-gray-400" />

                <Link to='/logout'> 

                <div className="flex gap-x-2 items-center hover:bg-slate-300/50 rounded hover:font-medium p-1">
                <Power size={18}/>
                <span className='text-sm font-medium'>Se deconnecter</span>
                </div>
                </Link> 
    
            </PopoverContent>                  

            </Popover>
                <span>{userInfo?.prenom} {userInfo?.nom}</span>
                </div>

          </div>
         )
         :
         (
        <div className="flex justify-end items-center gap-3  w-[20%] ">
              <Button variant='outline' className="bg-white">
                <Link to='/enregistre'>
                 Enrigistrer
                 </Link>
               </Button>
                
               <Button className="bg-red-500 text-white  ">
                  <Link to='/connexion'>
                    Se connecter
                  </Link>
                </Button>
          </div>
         )

       }

        

    </header>

 )
}

export default Header


