import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
  } from '@tanstack/react-table'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import api from '../../../api/apiLayers'
import { useQuery,useSuspenseQuery,useQueryClient } from '@tanstack/react-query'
import ConfirmationAlert from '../../component/ConfirmationAlert'
import { Link, useNavigate } from 'react-router-dom'
import Square from '../../component/Square'
import React from 'react'
import { NotepadText } from 'lucide-react';
import { Users } from 'lucide-react';
import { MailCheck } from 'lucide-react';
import { MailX } from 'lucide-react';
import useUserSquare from './useUserSquare'






const columnHelper = createColumnHelper() 

const columns = [

  columnHelper.accessor('_id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.prenom, {
    id: 'prenom',
    cell: info => {
      return <div className=' flex justify-center'>  {info.getValue()}
       
        </div>
    },

    header: () => <span>Prenom</span>,
    
  }),
  columnHelper.accessor('nom', {
    header: () => 'Nom',
    cell: info => info.renderValue(),
    
  }),
  columnHelper.accessor('email', {
    header: () => <span>Email</span>,
    
  }),
  columnHelper.accessor('isActive', {
    header: 'Confirmation Email',
    cell:info=><div className=''>{info.renderValue()?<span className='text-green-500/90'>Confirme</span>:<span className='text-red-600/80'>Pas encore</span>}</div>
    
  }),


                     
]
                    
  


let fetchAllUsersData=async()=>{
    try {
      let fetchUsers =await api.get('/api/users')
      return fetchUsers?.data
    } catch (error) {
      console.log(error)
    }
  }
  
  const MemoizedSquare =React.memo(Square)

const index = () => {



    const queryClient = useQueryClient();
    const navigate =useNavigate()

    let {data:{getAllUsers}} =useSuspenseQuery({
      queryKey:['allUsers'],
      queryFn:fetchAllUsersData
    })

    let data = useUserSquare()
    // console.log('usersDateCount > ',data)
    
    const [globalFilter, setGlobalFilter] = useState('');

    const table = useReactTable({
      data:getAllUsers,
      columns,
      state: { globalFilter },
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: 'includesString',
    })
    
    const display =(userId)=>{
           navigate(`${userId}`)
    }


  return (
    <>
    <div className="grid lg:grid-cols-3 my-2 gap-4 md:grid-cols-2 sm:grid-cols-1">
      <MemoizedSquare count={data?.countActiveUser} texte='Utilisateurs avec email Active' icon={<MailCheck color='white' size={32}/>} color='blue' textColor='blue'/>
      <MemoizedSquare count={data?.countNotActiveUser} texte={`Utilisateurs qui n'ont pas email Active`} icon={<MailX color='white' size={32}/>} color='red' textColor='yellow'/>
      {/* <MemoizedSquare  texte='Total de Reservation' icon={<NotepadText/>} color='green' textColor='red'/> */}
    </div> 
      
    
    <div className="flex flex-col items-center">
            
        <div className=" overflow-auto w-full mb-4 p-1">
        <div className=" mt-4 flex justify-between items-center my-2 p-2 ">
        <span className='bg-white p-1 font-bold  '>{getAllUsers?.length} lignes</span><br />
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
                    <tr key={row.id} className=' odd:bg-[#eee] hover:bg-orange-400/40 hover:cursor-pointer'
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

export default index