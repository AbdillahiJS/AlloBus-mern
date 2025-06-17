

import { CircleDollarSign } from 'lucide-react';
import { UserRoundCheck } from 'lucide-react';
import { Truck } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import  busExperience from '../../assets/busMain1.png'



const MainExperience = () => {

  return (

    <div className='flex my-10 '>

        {/*Left*/}

      <div className="w-1/2 p-2  flex items-center flex-end">
         <img src={busExperience} alt="" className='mix-blended-darken w-[100%] p-4 '/>
      </div>

        {/*Right*/}

        <div className="w-1/2 p-6 ">
            <h1 className='text-xl font-bold  tracking-wide mb-6'>Nous offrons la meilleure expérience avec nos offres de location</h1>
            <div className="flex items-center gap-4 my-2">
                <div className="bg-[#ECF5FF] rounded-md p-2">
                <CircleDollarSign color='#1572D3'/>
                </div>

                <div className="flex flex-col">
                    <p className='text-lg font-medium text-black'>Meilleur prix garanti</p>
                    <p className='text-[#6D6D6D] text-sm'>Trouver un prix inférieur ? Nous vous rembourserons à 100% de la différence.</p>
                </div>
            </div>

            <div className="flex items-center gap-4 my-1">
                <div className="bg-[#ECF5FF] rounded-md p-2">
                <UserRoundCheck color='#1572D3'/>
                </div>

                <div className="flex flex-col">
                    <p className='text-lg font-medium text-black'>Chauffeur d'expérience</p>
                    <p className='text-[#6D6D6D] text-sm'>Vous n'avez pas de chauffeur ? Ne vous inquiétez pas, nous en avons beaucoup
                       chauffeur expérimenté pour vous.
                    </p>
                </div>
            </div>


            
            <div className="flex items-center gap-4 my-2">
                    <div className="bg-[#ECF5FF] rounded-md p-2">
                    <Truck color='#1572D3'/>
                    </div>

                    <div className="flex flex-col">
                        <p className='text-lg font-medium'>Livraison de voiture 24h/24</p>
                        <p className='text-[#6D6D6D] text-sm'>Réservez votre voiture à tout moment et nous la livrerons directement à vous.</p>
                    </div>
            </div>


            <div className="flex items-center gap-4 my-2">
                    <div className="bg-[#ECF5FF] rounded-md p-2">
                    <MessagesSquare color='#1572D3' />
                    </div>

                    <div className="flex flex-col">
                        <p className='text-lg font-medium'>Assistance technique 24h/24 et 7jours/7</p>
                        <p className='text-[#6D6D6D] text-sm'>Vous avez une question Contacter l'assistance AlloBus à tout moment lorsque vous avez un problème.</p>
                    </div>
            </div>

           
           


        </div>



    </div>
    
  )
}

export default MainExperience