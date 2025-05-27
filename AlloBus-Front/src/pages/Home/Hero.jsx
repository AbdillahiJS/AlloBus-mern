
import heroBus from '../../assets/busHero.png'
import {Button} from '../../components/ui/button'

const Hero = () => {
  return (
    <div className='flex mx-[20%] mb-10 mt-10 h-full flex justify-around bg-[#FDF2E7]'>
        <div className="w-1/3    flex  justify-center  flex-col">

            <div className="text-xl font-bold break-all  px-4 flex flex-col  ">
                <p> Trouvez, Réservez et louez </p>
                <p>
                    une voiture <span className='ml-1 text-[#1572D3]'>Facilement</span>
                </p>
                <p>avec <span className='text-[#1572D3]'>AlloBus</span></p>
           </div>
            <div className=" mt-4 justify-start flex flex-col px-4">
                <div className="  ">
                <p className='text-sm'>Get a car wherever and whenever you need</p>
                <p className='text-sm'> with your IOS and Android device.</p>
                </div>

                <div className="pt-6  ">
                    <Button variant='outline' className='bg-white w-1/3 border-none ring-1 ring-blue-500'>Explorer</Button>
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
                





