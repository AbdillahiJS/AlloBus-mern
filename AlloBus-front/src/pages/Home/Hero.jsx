
import heroBus from '../../assets/busHero.png'
import {Button} from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    let navigate =useNavigate()
  return (
    <div className='flex mx-[18%] mb-10 mt-6 h-full flex justify-around bg-[#FDF2E7]'>
        <div className="w-1/3    flex  justify-center  flex-col">

            <div className="text-xl font-bold break-all  px-4 flex flex-col justify-around p-1 h-[110px]">
                <p> Trouvez, Réservez et louez </p>
                <p>
                    une voiture <span className='ml-1 text-[#1572D3]'>Facilement</span>
                </p>
                <p>avec <span className='text-[#1572D3]'>AlloBus</span></p>
           </div>
            <div className=" mt-4 justify-start flex flex-col px-4">

                <div className="pt-6  ">
                    <Button variant='outline' className='bg-white w-1/3 border-none ring-1 ring-blue-500'
                    onClick={()=>navigate('/voitures')}
                    >Explorer
                    </Button>
                </div>
                    
            </div>
        </div>
                 
        <div className="w-1/2  ml-4 flex  p-6 ">
            <img src={heroBus} alt="" className='w-[90%] mix-blend-darken ' />
        </div>
                
    </div>
               
 )
}
               

export default Hero
                





