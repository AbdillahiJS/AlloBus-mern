import React from 'react'
import Header from './components/Header'

const NotFound = () => {
  return (
    <>
    <Header/>
    <div className='flex justify-center items-center h-[50vh] w-full flex-col'>
        <div className=" text-6xl font-bold ">
         404 
        </div>
        <div className=" text-2xl font-bold ">
         Vous etes en train d'enssayer un lien qui n'existe pas
        </div>
    </div>
    </>
        

  )
}

export default NotFound
// absolute top-[20%]
// absolute top-[10%]