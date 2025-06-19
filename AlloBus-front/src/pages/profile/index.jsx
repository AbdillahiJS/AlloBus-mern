import React, { useState } from 'react'
import Header from '../../components/Header'
import useProfile from '../../hooks/useProfile'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import api from '../../api/apiLayers'
import { PencilLine } from 'lucide-react';
import { Camera } from "lucide-react"
import ProfileImage from './profileImage'
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import relativeTime from  "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime);



let EnrigistreUpdateSchema = yup.object({

  editPrenom: yup.string().required('Prenom du bus ne pas etre vide'),

  editNom: yup.string().required('Nom du bus ne pas etre vide'),

  editDateNaissance: yup.date()
  .required("Le champ du numero est obligatoire")
  .max(new Date(), "Date of birth cannot be in the future"),

  editSex: yup.string()
  .required("Le champ sex est obligatoire")
  .oneOf(["homme", "femme"], "Invalid sex selection"),

  editPhoneNumber: yup.string()
  .required("Le champ du numero est obligatoire")
  .matches(/^\+?\d{7,15}$/, "Invalid phone number"),
  
});

dayjs.locale('fr');


const index = () => {
   let {userInfo,information} = useProfile()
   const queryClient = useQueryClient();

  
 

   const { control, handleSubmit, formState:{ errors } } = useForm({
    defaultValues:{
      editPrenom:userInfo?.prenom,
      editNom:userInfo?.nom,
      editDateNaissance: userInfo?.dateNaissance?.split("T")[0],
      editSex:userInfo?.sex,
      editPhoneNumber:userInfo?.phoneNumber,
    },
    resolver: yupResolver(EnrigistreUpdateSchema)
});


  

const {mutate,isPending,isError,isSuccess} = useMutation({

mutationFn:async(editEnregistrerData)=>{
    try {
         let editEnregistrerReq=await api.post('/api/users/completeRegistration',editEnregistrerData)
          return editEnregistrerReq?.data
    } catch (error) {
        console.log(error)
    }
},
onSuccess:(data)=>{
    console.log(data)
    // setResponse(data?.message)
    queryClient.invalidateQueries(['userProfile']);
}

})





let handleSignUpEdit =(data)=>{

    console.log(data)
  
        mutate(data)
       
    }
        
   
    

  return (
    <>

    <Header/>
    <Toaster position='top-center'/>

    <div className={clsx("mx-[20%] my-6 p-1  justify-center font-bold text-sm bg-green-300/40",
           {
            'hidden':userInfo?.isCompleted===true,
            'flex':userInfo?.isCompleted===false,
           }
    )
        }
    
    
    >

        L'information du profile est incomplete, Veuiller fournir complete information
        </div>

<div className="mx-[15%] mt-8 p-2  flex flex-col justify-center items-center bg-white   w-[70%]">

       <ProfileImage/>


 <div className=' flex justify-between  p-1 w-full'>
 

      
      <div className={
        clsx("flex my-6  flex flex-col justify-center ",
        {
            'w-1/2': userInfo?.isCompleted===false,
            'w-[60%]': userInfo?.isCompleted===true
          }
    
        )
    }
    >
    
      <form onSubmit={handleSubmit(handleSignUpEdit)}>

<div className="flex justify-around items-center ">
    

      <div className="w-1/3">
           <Label className='my-2'>Prenom</Label>

             <Controller
               name='editPrenom'
               control={control}
               render={({field})=>(
               <Input {...field} type='text'
               placeholder='Prenom'
            />
            
            )}
            />
            {
                errors?.editPrenom && (
                    <p className="text-red-600 text-xs ">{errors?.editPrenom?.message}</p>
                )
            } 
    
</div>
     

<div className="w-1/3">
    <Label className='my-2'>Nom</Label>

    <Controller
    name='editNom'
    control={control}
    render={({field})=>(
        <Input {...field}
        placeholder='Nom'
        />

    )}
    />
     {
                errors?.editNom && (
                    <p className="text-red-600 text-xs ">{errors?.editNom?.message}</p>
                )
            } 
</div>

    
</div>

<div className="">

<div className="w-full flex flex-col items-center  my-2 ">
<div className="w-[85%] my-2 pl-1">
    <Label className=''>Date de Naissance</Label>
</div>

    <Controller
    name='editDateNaissance'
    control={control}
    render={({field})=>(
        <Input {...field}
        className='w-[85%]'
        // placeholder='Email'
        type='date'
        />
        )}
    />
     {
                errors?.editDateNaissance && (
                    <p className="text-red-600 text-xs w-[85%]">{errors?.editDateNaissance?.message}</p>
                )
            } 
</div>
<div className="w-full flex flex-col items-center my-2">



<div className="w-[85%] flex  p-1 my-2 gap-x-2">

        <Label>Sex</Label>

        <Controller
        name="editSex"
        control={control}
        render={({ field}) => (

          <div className="flex flex-col w-full col-span-3"> 
        <RadioGroup  className="col-span-3 flex "
        { ...field }
        onValueChange={field.onChange}
        >
        <div className="flex items-center space-x-2">
            <RadioGroupItem  value="homme" id="homme" 
             className="h-5 w-5 border-2 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="homme">Homme</Label>
        </div>

        <div className="flex items-center space-x-2">
            <RadioGroupItem  value="femme" id="femme"
             className="h-5 w-5 border-2 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="femme">femme</Label>
        </div>

        </RadioGroup>

       
        {errors?.editSex && (
              <p className="text-sm text-red-500 mt-2  col-span-3">{errors?.editSex?.message}</p>
            )}

        
         
        </div>
        )}
      />
        
        </div>









<div className="w-[85%] my-2 pl-1">
    <Label className=''>Numero de telephone</Label>
</div>

    <Controller
    name='editPhoneNumber'
    control={control}
    render={({field})=>(
        <Input {...field}
        className='w-[85%]'
        type='number'
        placeholder='mobile'
        />
        )}
    />
     {
                errors?.editPhoneNumber && (
                    <p className="text-red-600 text-xs w-[85%]">{errors?.editPhoneNumber?.message}</p>
                )
            } 
</div>

    







</div>


<div className="flex  justify-center mt-6  w-full">


<Button type='submit' 
className="bg-purple-600 hover:bg-purple-900 cursor-pointer text-white w-[85%] tracking-wider font-bold"
disabled={isPending || userInfo?.isCompleted}
>

{isPending?' Envoi ....' : 'Modifier'}

</Button>
</div> 




</form>


<div className="my-4  w-full flex flex-col justify-center items-center ">

<p className=' p-1 w-[85%]'>Ce compte existe depuis  : <span className='font-bold text-sm'>{dayjs(userInfo?.createdAt).fromNow()}</span></p>

    <p className=' p-1 w-[85%]'>Browser : <span className='font-bold text-sm'>{information?.userAgent?.browser}</span></p>
    <p className=' p-1 w-[85%]'>Version : <span className='font-bold text-sm'>{information?.userAgent?.version}</span></p>
    <p className=' p-1 w-[85%]'>Operating system : <span className='font-bold text-sm'>{information?.userAgent?.os}</span></p>
    <p className=' p-1 w-[85%]'>platform : <span className='font-bold text-sm'>{information?.userAgent?.platform}</span></p>
   
</div>

        

      </div>
        {
            userInfo?.isCompleted &&
      <div className=" w-[50%]  my-6 flex justify-center">
            <p className='text-slate-500 text-sm tracking-wider font-bold'>
                Felicitation, vous avez bien rempli votre profile la prochaine modification se sera apres {60 - dayjs().diff(dayjs(userInfo?.updatedAt), 'day')} jours
                </p>
      </div>
            
        }

      
    </div>  

    

  










</div>

    </>

  )
}

export default index