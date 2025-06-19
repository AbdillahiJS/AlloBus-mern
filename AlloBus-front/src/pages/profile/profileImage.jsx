import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import React, { useState,useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { ImagePlus } from 'lucide-react';
import api from "../../api/apiLayers";
import useProfile from "../../hooks/useProfile";
import toast, { Toaster } from 'react-hot-toast';
import { CircleCheckBig } from 'lucide-react';

const ProfileImage = () => {
const {userInfo}=useProfile()

    let [profileImage,setProfileImage] = useState()
    let [previewProfile,setPreviewProfile] = useState(null)
    const queryClient = useQueryClient();

     const {  handleSubmit,register, formState:{ errors } }  = useForm({});


    const {mutateAsync,isPending} = useMutation({

        mutationFn:async(profileImageData)=>{
          try {
               let editProfileImageReq=await api.post('/api/users/profile/upload',profileImageData)
                return editProfileImageReq?.data
          } catch (error) {
              console.log(error)
          }
      },
      onSuccess:(data)=>{

        setPreviewProfile(URL.revokeObjectURL(previewProfile))
    
          queryClient.invalidateQueries(['userProfile']);
        }
          
      
      })

      


    let changeProfileImg =(data)=>{ 
        console.log(data.profileImg[0])
        

        const formData = new FormData();
    formData.append('profileImg', data.profileImg[0]);
    // mutateAsync(formData)
    
  toast.promise(
    mutateAsync(formData),
    {
      loading: <div className="font-bold text-sm">Sauvegarde...</div>,
      success: (data) =>data.message ,
      error: (error) => error.response?.data?.message || 'Erreur',
    }
  )
    
    
      }


   



  return (
   
    <div className="w-full flex  items-center gap-x-4 ">
    {
      previewProfile ?
      <Avatar className='size-12 ring-1'>
            <AvatarImage  src={previewProfile} className=''/>
          
          </Avatar>
      :
      
      <Avatar className='size-12 ring-1'>
            <AvatarImage src={userInfo? userInfo?.profileImage :'https://avatar.iran.liara.run/public/boy'} className=''/>
           
            <img src="https://avatar.iran.liara.run/public/boy" />
          </Avatar>
    }
    
        <form onSubmit={handleSubmit(changeProfileImg)}  encType="multipart/form-data" className='flex gap-x-2'>
          <Label 
            htmlFor="picture" 
            className="cursor-pointer relative flex flex-col items-center justify-center "
          >
          {/* <Camera/> */}
          <ImagePlus/>
          
          
            <input
              id="picture"
              name="profileImg"
              type="file"
              className="sr-only"
              accept="image/*"
              {...register("profileImg")} 
                onChange={  (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreviewProfile(URL.createObjectURL(file));
                    setProfileImage(file);
                    console.log(file)
                  }
                }
              }
            />
          </Label>

          <div className="w-full flex justify-between items-center">
            {
              previewProfile ?<Button variant='outline' size='sm' type='submit' className='text-sm font-medium text-blue-500'>Save</Button>:''
            }
          
          </div>
    
    
        </form>
            
      </div>


  )
}

export default ProfileImage