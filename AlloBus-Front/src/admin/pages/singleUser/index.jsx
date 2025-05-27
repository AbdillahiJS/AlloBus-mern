import { Link, useParams } from "react-router-dom"
import { MoveLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSuspenseQuery } from "@tanstack/react-query";
import api from "../../../api/apiLayers";







const index = () => {
    const {userId} =useParams()

let {} = useSuspenseQuery({
  queryKey:['user-info'],
  queryFn:async()=>{
    try {
      let singleUser =await api.get('/admin/userInfo')
      return singleUser?.data
    } catch (error) {
      console.log(error)
    }
  }

})

  return (
    <>
    <div className="flex flex-col items-center">
      <div className="ring-1 w-full flex gap-x-1">
        <Link to='/admin/users'>
        <MoveLeft/>
        </Link>
        <span className="text-blue-600"> Rettourner</span>
      </div>

    </div>
    <Card className='bg-white mt-4'>
      <CardHeader>

      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
    
    </>
  )
}

export default index