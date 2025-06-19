import Left from './Left'
import Right from './Right'


const SplitScreen = () => {

    
  return (
    <>
    

     
    <div className="flex w-full bg-[#FDF2E7]">

      <div className=" lg:flex lg:flex-1 md:flex  hidden">
      <Left/>
      </div>

      <div className=" flex-6">
        <Right/>
      </div>
       
        </div>
   
      
        
        
     
        
      
        

    </>
  )
}

export default SplitScreen



