import { voituresLists } from "../../data/voituresLists"
import { Link, useSearchParams } from 'react-router-dom';

import {Card, CardContent, CardFooter, CardHeader} from '../../components/ui/card'
import { User } from 'lucide-react';
import { SunSnow } from 'lucide-react';
import Boite from '../../assets/boite.svg';

const Categorie = () => {
  const [searchParams] = useSearchParams();
  
  let allKeys = Array.from(searchParams.keys())
  

 let filterVoitures = voituresLists.filter(ele=>{
      return allKeys.includes(ele.categorie)
    })




  return (
    <>
    
      <span className="text-blue-500 p-6 text-sm">
       { allKeys.join(' -> ') }
      </span>

    <div className="grid grid-cols-3 gap-6 p-6">
  
     {
          filterVoitures.map(voiture=>{
            const {id,imageBus,titre,passager,climatiseur,boiteVitesse,prix,categorie }=voiture
            return <Card key={id} className=' border-none   p-4 bg-white hover:bg-[#FDF2E7]'>
               <Link to={`/voitures/${id}`}>
                          <CardHeader className=" ">
                          <img  src={imageBus} alt={imageBus}className='w-full h-36' />
                        </CardHeader>
                        <CardContent className=' '>
                              <h1 className='text-md font-medium my-2 px-2'>{titre}</h1>
                                <div className="pt-2 px-1">
                                  <div className='flex  justify-between w-full '>
                                      <div className="flex items-center  p-1 ">
                                        <User color='#6D6D6D'/> <span className='text-sm text-[#6D6D6D]'>{passager} passagers</span>
                                      </div>
                                      <div className="flex items-center  p-1">
                                        <img src={Boite} className='text-[#6D6D6D]'/> <span className='text-sm text-[#6D6D6D]'>{boiteVitesse}</span>
                                      </div>
                                      </div>
                                      <div className="flex items-center mt-2 gap-2">
                                        <SunSnow color='#6D6D6D'/> <span className='text-xs text-[#6D6D6D]'>{climatiseur}</span>
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

export default Categorie