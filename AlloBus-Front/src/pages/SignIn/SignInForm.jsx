import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Card, CardContent, CardHeader } from '../../components/ui/card'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/apiLayers";
import { getLocalStorage, setLocalStorage } from "../../helpers/setLocalStorage";
import toast from 'react-hot-toast';
import { useState } from "react";

let connexionSchema = yup.object({

    emailSignIn: yup.string().email().required('Le champ email ne doit pas etre vider'),
    passwordSignIn: yup.string().required('Le champ mot de passe ne doit pas etre vider'),
    
});
   


const SignInForm = () => {
    const [response,setResponse] =useState('')

    const { control, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(connexionSchema)
    });
    
    const {mutate,isPending,isError,isSuccess} = useMutation({
        mutationFn:async(connecterData)=>{
            try {
                 let enregistrerReq=await api.post('/users/connecter',connecterData)
                 return enregistrerReq?.data
            } catch (error) {
                console.log(error)
            }
        }, onSuccess:(data)=>{
          
                setLocalStorage('connexion',data?.token)
                setResponse(data?.message)
                
         
           
          }
     })


let handleSignIn =(data)=>{
  console.log(data)


    mutate(data)
    
  

}


  return (
    <>
    <div className="flex flex-col items-center p-1 w-full">

    {
     response ?<div className="  my-4 flex justify-center bg-green-400 p-2 rounded-md font-medium">{response}</div>:null
    }

    {/* {
     isError ? <div className=" p-2 rounded-md my-4 bg-red-400 flex justify-center">{response?.message}</div>:null
    } */}

    <Card className='w-1/2 bg-white border-none shadow-lg shadow-[#f1dfcd]'>
 

        <CardContent>

            <form onSubmit={handleSubmit(handleSignIn)}>


            <div className="w-full flex flex-col items-center  my-2 ">
                <div className="w-[85%] my-2 pl-1">
                    <Label className=''>Email</Label>
                </div>

                    <Controller
                    name='emailSignIn'
                    control={control}
                    render={({field})=>(
                        <Input {...field} type='email'
                        className='w-[85%]'
                        placeholder='Email'
                        />
                        )}
                    />
                     {
                        errors?.emailSignIn && (
                             <p className="text-red-600 text-xs w-[85%]">{errors?.emailSignIn?.message}</p>
                        )
                     } 
            </div>


            <div className="w-full flex flex-col items-center  my-2 ">
                <div className="w-[85%] my-2 pl-1">
                    <Label className=''>Password</Label>
                </div>

                    <Controller
                    name='passwordSignIn'
                    control={control}
                    render={({field})=>(
                        <Input {...field} type='password'
                        className='w-[85%]'
                        placeholder='Password'
                        />
                        )}
                    />
                     {
                                errors?.passwordSignIn && (
                                    <p className="text-red-600 text-xs w-[85%]">{errors?.passwordSignIn?.message}</p>
                                )
                            } 
            </div>


            {/* </div> */}


        <div className="flex  justify-center mt-6  w-full">
            
                
            <Button type='submit' className="bg-purple-600 hover:bg-purple-900 cursor-pointer text-white w-[85%] tracking-wider font-bold">
               Se connecter
            </Button>
        </div> 




            </form>

        </CardContent>

    </Card>
    
    </div>
    </>
  )
}

export default SignInForm