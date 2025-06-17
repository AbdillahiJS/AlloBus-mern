
// import Footer from '../../components/Footer'
// import Header from '../../components/header'
// import MainPopularCar from '../../components/MainPopularCar'
import VoituresSection from './VoituresSection'
// import HeroVoiture from './HeroVoiture'


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