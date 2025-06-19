import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Card, CardContent, CardHeader } from '../../components/ui/card'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/apiLayers";
import toast from 'react-hot-toast';
import { useState } from "react";


let EnrigistreSchema = yup.object({

    prenom: yup.string().required('Prenom du bus ne pas etre vide'),
    nom: yup.string().required('Nom du bus ne pas etre vide'),
    email: yup.string().email().required('Le champ email ne doit pas vider'),
    password: yup.string().required('Le champ mot de passe ne doit pas vider'),
    
});
   


const SignUpComponent = () => {
    const [response, setResponse] = useState('')
   
    const { control, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(EnrigistreSchema)
    });

 const {mutate,isPending,isError,isSuccess} = useMutation({
    mutationFn:async(enregistrerData)=>{
        try {
             let enregistrerReq=await api.post('/api/users/enregistrer',enregistrerData)
              return enregistrerReq?.data
        } catch (error) {
            
            throw new Error(error.response?.data?.message || " Une erreur s’est produite lors de l'envoyer des données d'enregistrement ");
        }
    },
    onSuccess:(data)=>{
        console.log(data)
        setResponse(data?.message)
    }

 })



let handleSignUp =(data)=>{
        mutate(data)  
}


  return (
    <>
    <div className="flex flex-col items-center p-1 w-full">
        {
            isSuccess?<div className="p-1 w-full my-4 flex justify-center bg-green-400">{response}</div>:null
        }
        {
           isError ? <div className="ring-1 w-full my-4 flex justify-center">{response}</div>:null
        }
        

    <Card className='w-1/2 bg-white border-none shadow-md shadow-[#f1dfcd]'>

        <CardHeader>
            <div className="flex justify-center p-0 text-lg font-bold tracking wider w-full">Enregistrer</div>
            
            </CardHeader>

        <CardContent>

            <form onSubmit={handleSubmit(handleSignUp)}>

                <div className="flex justify-around items-center w-full">
                    

                      <div className="w-1/3">
                           <Label className='my-2'>Prenom</Label>

                             <Controller
                               name='prenom'
                               control={control}
                               render={({field})=>(
                               <Input {...field} type='text'
                               placeholder='Prenom'
                            />
                            
                            )}
                            />
                            {
                                errors?.prenom && (
                                    <p className="text-red-600 text-xs ">{errors?.prenom?.message}</p>
                                )
                            } 
                    
                </div>
                     

                <div className="w-1/3">
                    <Label className='my-2'>Nom</Label>

                    <Controller
                    name='nom'
                    control={control}
                    render={({field})=>(
                        <Input {...field}
                        placeholder='Nom'
                        />

                    )}
                    />
                     {
                                errors?.nom && (
                                    <p className="text-red-600 text-xs ">{errors?.nom?.message}</p>
                                )
                            } 
                </div>

                    
            </div>

            <div className="">

            <div className="w-full flex flex-col items-center  my-2 ">
                <div className="w-[85%] my-2 pl-1">
                    <Label className=''>Email</Label>
                </div>

                    <Controller
                    name='email'
                    control={control}
                    render={({field})=>(
                        <Input {...field}
                        className='w-[85%]'
                        placeholder='Email'
                        />
                        )}
                    />
                     {
                                errors?.email && (
                                    <p className="text-red-600 text-xs w-[85%]">{errors?.email?.message}</p>
                                )
                            } 
            </div>
            <div className="w-full flex flex-col items-center  my-2 ">
                <div className="w-[85%] my-2 pl-1">
                    <Label className=''>Password</Label>
                </div>

                    <Controller
                    name='password'
                    control={control}
                    render={({field})=>(
                        <Input {...field}
                        className='w-[85%]'
                        placeholder='Password'
                        />
                        )}
                    />
                     {
                                errors?.password && (
                                    <p className="text-red-600 text-xs w-[85%]">{errors?.password?.message}</p>
                                )
                            } 
            </div>

                    
            






            </div>


        <div className="flex  justify-center mt-6  w-full">
            
                
            <Button type='submit' 
            className="bg-purple-600 hover:bg-purple-900 cursor-pointer text-white w-[85%] tracking-wider font-bold"
            disabled={isPending}
            >
              
              {isPending?' Envoi ....' : 'Enregistrer'}
               
            </Button>
        </div> 




            </form>

        </CardContent>

    </Card>
</div>

    </>
  )
}

export default SignUpComponent