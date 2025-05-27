
// import Footer from '../../components/Footer'
// import Header from '../../components/header'
// import MainPopularCar from '../../components/MainPopularCar'
import VoituresSection from './VoituresSection'
// import HeroVoiture from './HeroVoiture'


import { Outlet, useParams, useSearchParams } from 'react-router-dom';



const Voitures = () => {

const [searchParams] = useSearchParams();
// console.log(useSearchParams());

  return (
    <>
    
    {/* <h1 className="text-md text-blue-500 ">Categories</h1> */}
   <VoituresSection/> 
  

    </>
      
  )
}

export default Voitures