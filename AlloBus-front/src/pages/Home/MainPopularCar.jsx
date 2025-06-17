
import {Card, CardContent, CardFooter, CardHeader} from '../../components/ui/card'
import BusPopular1 from '../../assets/buspopular1.png'
import BusPopular2 from '../../assets/buspopular2.png'
import BusPopular3 from '../../assets/buspopular3.png'
import { User } from 'lucide-react';
import { SunSnow } from 'lucide-react';
import Boite from '../../assets/boite.svg';

const mostPopularLists=[
    {
        imageBus:BusPopular1,
        titre:"Bus de transport publique",
        passager:25,
        climatiseur:"sans climatisseur",
        boiteVitesse:"Manual",
        prix:10000
    },
    {
        imageBus:BusPopular2,
        titre:"Toyota Hiace",
        passager:15,
        climatiseur:"avec climatisseur",
        boiteVitesse:"Manuel",
        prix:7000
    },
    {
        imageBus:BusPopular3,
        titre:"Bus pour Lequiper",
        passager:75,
        climatiseur:"avec climatisseur",
        boiteVitesse:"Auto",
        prix:75000
    }
    
]

const MainPopularCar = () => {

  return (
    
    <>
    <div className=" flex flex-col my-20">
        <div className="flex justify-center ">
             <h1 className='text-2xl font-bold my-4'>voitures des location les plus populaires</h1>
        </div> 

<div className="grid grid-cols-3 gap-6 p-6">

                {
                    mostPopularLists.map(popular=>{
                        return  <Card className='p-4 border-none shadow-md shadow-[#f5ddc6] bg-white'>
                                    <CardHeader className=' '>
                                     <img key={popular.imageBus} src={popular.imageBus} alt={popular.imageBus}
                                     className='w-full h-48'
                                     />
                                   </CardHeader>
                                   <CardContent className='0 '>
                                        <h1 className='text-lg font-medium my-2 mx-2'>{popular.titre}</h1>
                                   <div className="   px-2">

                                            <div className='flex  justify-between w-full '>
                                                <div className="flex items-center  p-1 ">
                                                   <User color='#6D6D6D'/> <span className='text-sm text-[#6D6D6D]'>{popular.passager} passagers</span>
                                                </div>

                                                <div className="flex items-center  p-1">
                                                   <img src={Boite} className='text-[#6D6D6D]'/> <span className='text-sm text-[#6D6D6D]'>{popular.boiteVitesse}</span>
                                                </div>

                                              </div>
                                                <div className="flex items-center mt-2 gap-2">
                                                   <SunSnow color='#6D6D6D'/> <span className='text-xs text-[#6D6D6D]'>{popular.climatiseur}</span>
                                                
                                                </div>
                                   </div>
                                           
                             </CardContent>
                                    
                                   

                                    

                                   
                                    
                                    <CardFooter className='flex flex-col'>
                                        <hr className='text-slate-700 w-full'/>
                                        <div className="flex justify-between items-center w-full mt-3">
                                          <span> Prix</span>
                                          <p className='text-[#6D6D6D] text-sm'><span className='text-black font-medium'>{popular.prix} </span>DJF /par jour</p>
                                          
                                        </div>
                                    
                                    </CardFooter>
                                </Card>
                   }) 
                }
      </div>
</div>
</>
                
  )
}

export default MainPopularCar