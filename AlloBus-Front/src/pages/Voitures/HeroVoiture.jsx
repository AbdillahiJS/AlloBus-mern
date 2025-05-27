import heroVoiture from '../../assets/heroVoiture.png'
import { Check } from 'lucide-react';

const HeroVoiture = () => {
  return (
    <>
    <div className="mx-[16%] my-10 flex items-center bg-[#FDF2E7] rounded-lg">
        <div className="w-1/2 py-2">
            <img src={heroVoiture} alt="" />
        </div>
        <div className="shadow-sm flex flex-col p-4 bg-white">
            <p className='text-2xl font-bold'>Nos voitures de location Disponible</p>
            <div className="flex flex-col my-4 ">
            <p className='text-[#6D6D6D]'>choisissez nos voitures selon votre choix </p>
            <ul className='mt-4'>
                <li className='flex items-center gap-2 text-[#6D6D6D]'><Check size={16}/> <span>categories</span> </li>
                <li className='flex items-center gap-2 text-[#6D6D6D]'><Check size={16}/> <span>prix</span>  </li>
                <li className='flex items-center gap-2 text-[#6D6D6D]'><Check size={16}/> <span>selon passagères</span> </li>
            </ul>

            </div>
        </div>

    </div>
    
    </>
  )
}

export default HeroVoiture