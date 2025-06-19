
import VoituresSection from './VoituresSection'



import { Outlet, useParams, useSearchParams } from 'react-router-dom';



const Voitures = () => {

const [searchParams] = useSearchParams();

  return (
    <>
   
   <VoituresSection/> 
  

    </>
      
  )
}

export default Voitures