import { Link, NavLink, useLocation } from "react-router-dom"
import Logo from '../assets/logoBus.png'
import { Bus } from 'lucide-react';
import { Button } from "./ui/button";

const navs=['Home','Nos Voitures','Mon reservation']
const Links=['/','/voitures','/reservez']


const Header = () => {
    let location = useLocation()
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

    </header>

 )
}

export default Header


