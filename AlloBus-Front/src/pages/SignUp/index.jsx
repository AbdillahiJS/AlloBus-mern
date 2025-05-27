import React from 'react'
import Header from '../../components/header'
import SignUpComponent from './SignUpComponent'
import toast, { Toaster } from 'react-hot-toast';



const index = () => {
  return (
      <>
      <Toaster position='top-right'/>
      <Header/>
      <div className="mx-[15%] mt-8  flex justify-center">
         <SignUpComponent/>

      </div>
      
      </>
  )
}

export default index