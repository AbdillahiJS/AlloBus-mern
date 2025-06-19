import React from 'react'
import Left from '../../component/Left'
import Right from '../../component/Right'

import Square from '../../component/Square'
import {Button} from '../../../components/ui/button'
import { Pen } from 'lucide-react';
import { Trash2 } from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { Image } from 'lucide-react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { useState } from 'react'
import AjouterVoiture from './AjouterVoiture'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmationAlert from '../../component/ConfirmationAlert'
import { useQuery,useSuspenseQuery,useQueryClient } from '@tanstack/react-query'
import api from '../../../api/apiLayers'
import useDashboard from './useDashboard'
import { NotepadText } from 'lucide-react';
import { Users } from 'lucide-react';

const socket = io('http://localhost:8888');


const columnHelper = createColumnHelper() 

const columns = [

  columnHelper.accessor('_id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.busImage, {
    id: 'busImage',
    cell: info => {
      console.log(info.getValue())
      return <div className=' flex justify-center my-1'>
        {
           info.getValue().length === 0 || info.getValue()[0] === '' ? <Image/> :<img src={info.getValue()[0]} width='70' height='70' className=''/>
        }
        
        </div>
    },

    header: () => <span>Image</span>,
    
  }),
  columnHelper.accessor('titre', {
    header: () => 'Titre',
    cell: info => info.renderValue(),
    
  }),
  columnHelper.accessor('passagers', {
    header: () => <span>Passager</span>,
    
  }),
  columnHelper.accessor('climatisseur', {
    header: 'Climatiseur',
    
  }),
  columnHelper.accessor('boiteVitesse', {
    header: 'boite Vitesse',
  
  }),
  columnHelper.accessor('prix', {
    header: 'Prix',
  
  }),
  columnHelper.accessor('Action', {
    header: 'Action',
    cell:(info)=>{
   
      return <div className="flex justify-center gap-x-6 ">
                 <Link to={`update/${info.row.original._id}`}>
                    <Pen size={28}  className='text-green-500 p-1 hover:bg-green-500 hover:text-white hover:p-1 rounded-md'/>
                </Link> 
                <ConfirmationAlert Trash={<Trash2 size={28}  
                                          className='text-red-500 p-1 hover:bg-red-500 hover:text-white hover:p-1 rounded-md'
                                          /> 
                                        }
                                        info={info}
                     
                />
                    
            </div>
    }
  
  }),
]

const MemoizedSquare =React.memo(Square)

let fetchAllData=async()=>{
  try {
    let fetchCar =await api.get('/api/admin/')
    return fetchCar.data
  } catch (error) {
    console.log(error)
  }
}



const index = () => {
  
  const queryClient = useQueryClient();

let {data:{getAllVoiture}} =useSuspenseQuery({
  queryKey:['allCar'],
  queryFn:fetchAllData
})


const navigate =useNavigate()

const [globalFilter, setGlobalFilter] = useState('');

const table = useReactTable({
  data:getAllVoiture,
  columns,
  state: { globalFilter },
  onGlobalFilterChange: setGlobalFilter,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: 'includesString',
})
 let data =useDashboard()





  return (
    <>
    <Toaster position="top-right" />
    <div className="flex flex-col h-screen">
      <div className="grid lg:grid-cols-3 my-2 gap-4 md:grid-cols-2 sm:grid-cols-1">
      <MemoizedSquare count={data?.countCarRental} texte='Voitures de Location disponible' icon={<Users/>} color='red' textColor='blue'/>
      <MemoizedSquare count={data?.countUsers} texte='Nombre Utilisateurs disponible' icon={<Users/>} color='blue' textColor='yellow'/>
      <MemoizedSquare count={data?.countBooking} texte='Total de Reservation' icon={<NotepadText/>} color='green' textColor='red'/>
      
    
      </div>

      <div className=" mt-4 flex justify-between items-center my-2 p-2 ">
        
          <input
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="bg-white  placeholder:text-sm placeholder:mx-4 p-1 ring-1 ring-blue-300"
          />
        
          <AjouterVoiture/>
      
    </div>
    <div className=" overflow-auto w-full mb-4 p-1">
      <span className='bg-white p-1 font-bold mb-2 px-2 p-1 '>{getAllVoiture?.length} lignes</span><br />
      <table className='bg-white  w-full mt-2'>
      
        <thead >
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border-b-2 border-solid border-blue-600 '>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='py-1'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='text-center'>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className=' odd:bg-[#eee] '>
             
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className=''>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
           </tr>
          ))}
        </tbody>
      </table>

    </div>


    </div>

    
    
    </>
  )
}

export default index