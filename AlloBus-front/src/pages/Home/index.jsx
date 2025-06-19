
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Hero from "./Hero"
import MainExperience from "./MainExperience"
import MainPopularCar from "./MainPopularCar"


function Home() {
  

  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1 ">
        <section className="flex flex-col  mb-10 ">
                <Header/>
                <Hero/>

                
        </section>
         <main className="mx-[15%] mb-15"> 
           <MainExperience/> 
           <MainPopularCar/> 
        </main> 
        
          <Footer/>

      </div>
    
  </>
  )
}

export default Home
