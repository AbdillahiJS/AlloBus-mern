import { NavLink } from "react-router-dom"
import { LayoutDashboard } from 'lucide-react';
import Logo from '../../assets/logoImage.png'
import { Users } from 'lucide-react';
import { ShoppingBasket } from 'lucide-react';

const navSide = [
    {
       icon:<LayoutDashboard/>,
       link:'',
       text:'dashboard',
    },
    {
       icon:<Users />,
       link:'users',
       text:'users',
    },
    {
       icon:<ShoppingBasket />,
       link:'booking',
       text:'booking',
    },
    {
       icon:<LayoutDashboard/>,
       link:'setting',
       text:'setting',
    },
]



const Left = () => {



  return (
    <>
     <div className="bg-white  shadow-md shadow-[#FDF2E7]  w-full"> 
       
        
     <div className="   gap-x-1 flex flex-col justify-center items-center p-4 ">
                 <img src={Logo} className='w-20 h-20 rotate-380'/> 
                <span className="text-[#123151] text-xl font-bold ">AlloBus</span>
                
       </div> 

     <div className=" flex flex-col my-8 ">
            {
                navSide.map(nav=>(
                    <ul key={nav.link} className=" w-full flex flex-col items-center my-1">
                        <NavLink to={`${nav.link}`} end
                        className={({ isActive }) => 
                        isActive ?
                        'w-full  font-bold flex text-black items-center ' 
                        : ' w-full  text-[#6D6D6D] flex  items-center' 
                    } >

                        
                        <li className="hover:bg-[#e5e5e5] hover:font-bold hover:text-black 
                        rounded flex gap-x-4 mx-2 hover:p-2 p-2 w-full style-none capitalize
                       justify-center items-center "
                         >

                            {nav.icon}
                            <span className="lg:flex  w-full p-1  hidden">{nav.text}</span>
                            
                        </li>
                        </NavLink>
                    </ul>
              
                ))
            }
        </div>  
        


    </div> 
    </>
  )
}

export default Left