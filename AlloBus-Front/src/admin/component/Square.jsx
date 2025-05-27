import { LayoutDashboard } from 'lucide-react';
import {memo} from 'react'
import {clsx} from 'clsx'
import { cn } from '@/lib/utils'



const colorMap = {
  red: 'from-red-700/60 to-pink-500',
  blue: 'from-blue-700/60 to-cyan-500',
  green: 'from-green-700/60 to-lime-500',
}
const colorMapText = {
  blue: 'from-red-900 to-pink-500',
  red: 'from-blue-900 to-cyan-500',
  yellow: 'from-green-900 to-lime-500',
}

const Square = memo(({count,texte,icon,color,textColor}) => {
  return (
    <div className={cn('bg-gradient-to-r px-1 py-4 flex  flex-col rounded mx-4',colorMap[color])}>
        <div className="flex items-center justify-center gap-4 ">
            <div className=" flex items-center gap-x-2 ">
                 {icon}
                 <div className="flex gap-x-2 items-center">
                 <p className='font-medium text-sm text-white'>
                   
                  {texte}
                  </p> 
                  {/* 'text-blue-800 font-bold' */}
                 <span className={cn('text-lg font-bold bg-clip-text text-white bg-gradient-to-r',colorMapText[textColor])}>{count}</span>
                 </div>

            </div>
          

        </div>
        

     </div>
  )
})

export default Square