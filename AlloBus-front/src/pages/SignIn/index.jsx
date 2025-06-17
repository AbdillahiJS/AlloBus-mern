import React from 'react'
import Header from '../../components/header'
import SignInForm from './SignInForm'


const index = () => {
  return (
     <>
    <Header/>

    <div className="mx-[15%] mt-15 flex justify-center"> 

        <SignInForm/>
    </div>

     </>
 
  )
}

export default index