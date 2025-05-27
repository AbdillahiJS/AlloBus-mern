import { useParams } from "react-router-dom"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import UpdateForm from "./UpdateForm"


const index = () => {
  let {id} =  useParams()
  return (
    <div className="flex justify-center items-center mt-[3%] ">

<Card className='bg-white lg:w-[40%] w-full border-none'>
  <CardHeader>
    <CardTitle>Modifier</CardTitle>
    
  </CardHeader>
  <CardContent className=' '>
    <UpdateForm/>
  </CardContent>
 
</Card>

    

    </div>
  )
}

export default index