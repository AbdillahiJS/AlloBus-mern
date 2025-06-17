import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import HeroVoiture from '../pages/Voitures/HeroVoiture'
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from 'react'
import Footer from '../components/Footer'
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button'


let checkboxes=[
    {  
        id:1,
        titre:'Categorie',
        names:["bus","minibus"]
    },
    {  
        id:2,
        titre:'Prix',
        names:["7000-10000","10000-20000","plus-20000"]
    },
    {  
        id:3,
        titre:'Siege',
        names:["15p","25p","30p","plus-35p"]
    }
]



const VoitureLayout = () => {
//  console.log(window.location.search);
    const [searchParams] = useSearchParams();
    // console.log( searchParams);
    // console.log(searchParams.values().forEach(value=>console.log(value)));
    // let allKeys = Array.from(searchParams.keys())
   let navigate = useNavigate()
   const [filters, setFilters] = useState({
    bus:false,
    minibus: false ,
    // prixMb: false,
    // prixb: false,
    // prixbplus: false,
    // siegMb: false,
    // siegb1: false,
    // siegb2: false,
    // siegbplus: false,
   
  });

  const handleFilter=()=>{
               
    const params = new URLSearchParams(window.location.search);
    
    const initialParamCount = Array.from(params.keys()).length;

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const hasNoParams = Array.from(params.keys()).length === 0;
    const hadParamsInitially = initialParamCount > 0;

    if (hasNoParams) {
      navigate("/voitures", { replace: true });
    } else {
      navigate(`categorie?${params.toString()}`, { replace: true });
    }
  }



  return (
    <>
     <div className="min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1 ">
         <div className="">
           
            <Header/>
        </div>

         <div className="">
            <HeroVoiture/>
         </div>

    <main className="lg:mx-[15%] mx-[8%] mb-15  flex justify-center "> 
            
    
            <div className="w-[20%] p-2 sticky top-0 self-start h-[calc(100vh-2rem)]  ring-1 ring-red-600 hidden" >

                <h1 className="text-lg font-bold flex my-3 text-blue-600" >Filter </h1>
                     {
                       checkboxes.map((checkboxe,i)=>{
                        const {id,titre,names}=checkboxe
                        // console.log('names >',names[i])
                        return <div key={id} className="">
                            <h1 className='text-md font-bold my-2'>{titre}</h1>
                            <div className="flex flex-col ">
                                {
                                    names.map(name=>{
                                        return <div key={name} className='flex items-center gap-2'>
                                                  <Checkbox name={name}
                                                      checked={filters[name] || !!searchParams.get(name) }
                                                  onCheckedChange={(checked)=>{
                                                    console.log('Doud >',checked);
                                                    if (checked) {
                                                        setFilters(prev =>({...prev,[name]: checked}))
                                                        
                                                        console.log('Checked state:', checked,name);
                                                    }else{

                                                      setFilters(prev =>({...prev,[name]: false}))
                                                      searchParams.get('')
                                                       console.log('Checked state:', checked,name);

                                                     }
                                                   
                                                }
                                            }
                                                  />
                                               
                                                  <span>{name}</span>
                                               </div>
                                    })
                                }
                          </div>
                    </div>
                }) 
                }

            <Button className='bg-blue-700 mt-4 w-full text-white px-0 mx-0'

              onClick={()=>handleFilter()}

            
 >Filter</Button>
               

           </div>
                
        
      

            <div className="w-[90%] "> 
            
            <Outlet/>
            </div>
     </main> 



    <Footer/>

</div>
    </>
  )
}

export default VoitureLayout

