import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { useState } from 'react'
// import { Trash2 } from 'lucide-react'
import api from '../../../api/apiLayers'
import { useQuery,useSuspenseQuery,useQueryClient } from '@tanstack/react-query'

import { Link, useNavigate } from 'react-router-dom'


import { io } from 'socket.io-client';
import { useEffect } from "react"


const socket = io('http://localhost:8888');



const formatter = new Intl.DateTimeFormat("fr-DJ", {
  dateStyle: 'full',       // or 'medium', 'short'
  timeStyle: 'short',      // includes hours and minutes
  timeZone: 'Africa/Djibouti' // force Djibouti local time
});

 
const columnHelper = createColumnHelper() 

const columns = [

  columnHelper.accessor('_id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  // columnHelper.accessor('reservateurId?.email', {
  //   cell: info => info.getValue(),
  //   // footer: info => info.column.id,
  // }),
  columnHelper.accessor(row => row.datePrise, {
    id: 'Date prise',
    cell: info => {
      return <div className=' flex justify-center'>  {formatter.format(new Date( info.renderValue()))}
       
        </div>
    },

    header: () => <span>Date Prise</span>,
    
  }),
  columnHelper.accessor('dateRetour', {
    header: () => 'Date Retour',
    cell: info => formatter.format(new Date( info.renderValue())),
    
  }),
  columnHelper.accessor('rendu', {
    header: () => <span>Rendu</span>,
    cell:info=><div className=''>
      {info.renderValue()?<span className='text-green-500/90'>Oui</span>
      :<span className='text-red-600/80'>Non</span>
      }
      </div>
    
  }),
  columnHelper.accessor('completed', {
    header: 'Location Terminer',
    cell:info=><div className=''>
      {info.renderValue()?<span className='text-green-500/90'>Oui</span>
      :<span className='text-red-600/80'>Pas encore</span>}
      </div>
    
  }),


                     
]
                    
  
let fetchAllUsersReservation=async()=>{
  try {
    let AllUsersReservation =await api.get('/admin/AllUsersReservation')
    return AllUsersReservation?.data
  } catch (error) {
    console.log(error)
  }
}











const Booking = () => {


  const queryClient = useQueryClient();

  const navigate =useNavigate()

  let {data:{usersReservation}} =useSuspenseQuery({
    queryKey:['usersReservation'],
    queryFn:fetchAllUsersReservation
  })
  console.log("usersReservation >",usersReservation)

  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data:usersReservation,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
  })

  const display =(userIdBooking)=>{
    navigate(`${userIdBooking}`)
}

useEffect(() => {
  
  socket.on('booking-ID', () => {
    console.log('getbooking Id from the server with socket >')
    // queryClient.invalidateQueries(['booking',id]);
    queryClient.invalidateQueries(['booking-ID']);
  });
 
  return () => {
    socket.off('booking-ID');
  };
}, [queryClient]);






  return (
    <>
    
    <div className="flex flex-col items-center">
      Booking
            
           <div className=" overflow-auto w-full mb-4 p-1">
            <div className=" mt-4 flex justify-between items-center my-2 p-2 ">
            <span className='bg-white p-1 font-bold  '>{usersReservation?.length} lignes</span><br /> 
                    <input
                    value={globalFilter}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                    className="bg-white  placeholder:text-sm placeholder:mx-4 p-1 ring-1 ring-blue-300"
                    />
                
            </div>
                
                <table className='bg-white  w-full mt-2'>
                
                <thead >
                    {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className='border-b-2 border-solid border-blue-600 '>
                        {headerGroup.headers.map(header => (
                        <th key={header.id} className=''>
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
                   {/* // console.log('row >',row?.original?._id) */}
               </thead>
                <tbody className='text-center'>
                    {table.getRowModel().rows.map(row => ( 
                        
                    //   <Link to={`${row?.original?._id}`} className='w-screen p-1 ring-2'>
                        <tr key={row.id} className=' odd:bg-[#eee] hover:bg-[#f9dfc5] hover:cursor-pointer'
                        onClick={()=>display(row?.original?._id)}
                        >
                    
                        {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className='p-2'>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                        ))}
                    </tr>
                    //  </Link>
                        ))}
                </tbody>
                </table> 
    
            </div> 
   
    
    
    
        </div>
    
    
    </>
  )
}

export default Booking