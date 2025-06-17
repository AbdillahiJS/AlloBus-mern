
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation,useQueryClient } from "@tanstack/react-query"
import api from '../../../api/apiLayers'
import toast, { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { useEffect } from "react"


const socket = io('http://localhost:8888');



let voitureSchema = yup.object({

    NomDeBus: yup.string().required('Nom du bus ne pas etre vide'),

    Img: yup
    .mixed()
    .test('fileType', 'Image requise', (value) => {
      if (!value) return false;
      return value instanceof FileList && value.length > 0;
    }).required('Image requise'),

    prix: yup.number().required('le prix du bus est obligatoire '),

    NombreDePassager: yup.number().required('Nombre des passagers ne pas etre vide')
    .min(10, 'Doit avoir au moins 10 passager'),

    climatisseur: yup.string().oneOf(['oui','non'],'Vous devez sélectionner une option')
    .required('le champ du climatisation ne doit pas etre vide'),

    genre: yup.string().oneOf(['bus','minibus'],'Vous devez sélectionner une option')
    .required('le champ du genre ne doit pas etre vide'),

    boite: yup.string().oneOf(['Manuel','Auto'],'Vous devez sélectionner un type de boîte').required('le champ de boite ne doit pas etre vide'),
   
  });







const AddForm = () => {
  
  const queryClient = useQueryClient();


    const { control, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(voitureSchema)
    });

const {mutateAsync,isPending} =useMutation({

  mutationFn:async(addData)=>{
    try {
          let  addCarReq= await api.post('/admin/',addData)
          return addCarReq.data
    } catch (error) {
     console.log(error)
    }
}

})


const onSubmit = async (data) => {




  let formData =new FormData()

  Array.from(data.Img).forEach(file=>{
    formData.append('Img', file);
  })

    
    formData.append('NomDeBus',data.NomDeBus);
    formData.append('prix',data.prix);
    formData.append('NombreDePassager',data.NombreDePassager);
    formData.append('climatisseur',data.climatisseur);
    formData.append('genre',data.genre);
    formData.append('boite',data.boite);

  toast.promise(
    mutateAsync(formData),
    {
      loading: 'Sauvegarde...',
      success: (data) =>data.message ,
      error: (error) => error.response?.data?.message || 'Erreur',
    }
  )
  

}


useEffect(() => {
  socket.on('item_created', () => {
    queryClient.invalidateQueries(['allCar']);
  });
 
  

  return () => {
    socket.off('item_created');
  };
}, [queryClient]);



    

  return (
    <>

    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className=' '>

    <div className="grid grid-cols-4 items-center gap-4 my-2">
        <Label htmlFor="name" className="text-right">
            Image
        </Label>
        <Controller
  name="Img"
  control={control}
  render={({ field: { onChange, value, ...rest } }) => (
    <div className="flex flex-col w-full col-span-3">
      <Input
        type="file"
        accept="image/*"
        multiple
        className="col-span-3"
        onChange={(e) => {
          onChange(e.target.files); // <-- VERY IMPORTANT (update form state)
          console.log(e.target.files); // Optional debug
          
        }}
        {...rest}
      />
      {errors?.Img && (
        <p className="text-sm text-red-500 mt-2">{errors?.Img?.message}</p>
      )}

{value && (
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.from(value).map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-16 h-16 object-cover rounded shadow"
            />
          ))}
        </div>
      )}





    </div>
  )}
/>

    </div>
      

        <div className="grid grid-cols-4 items-center gap-4 my-2">
        <Label htmlFor="name" className="text-right">
            Bus
        </Label>
        <Controller
        name="NomDeBus"
        control={control}
        render={({ field }) => (
            <div className="flex flex-col w-full  col-span-3">
        <Input {...field} placeholder='Nom du bus' type='text' className="col-span-3"/>
         {errors.NomDeBus && (
              <p className="text-sm text-red-500 mt-2">{errors?.NomDeBus?.message}</p>
            )}
        </div>
        )
        }
      />

    </div>

        <div className="grid grid-cols-4 items-center gap-4 my-2">
        <Label htmlFor="username" className="text-right">
        Passagers
        </Label>

        <Controller
        name="NombreDePassager"
        control={control}
        render={({ field }) =>(
            <div className="flex flex-col w-full  col-span-3">
                <Input {...field} placeholder='Nombre du passagers' type='number' className="col-span-3" 
                
                
                />
                {errors.NombreDePassager && (
              <p className="text-sm text-red-500 mt-2">{errors?.NombreDePassager?.message}</p>
            )}
        </div>
        )
    }
    />
           

      
       
        </div>

        <div className="grid grid-cols-4 items-center gap-4 my-2 p-1">

        <Label>Climatisseur</Label>

        <Controller
        name="climatisseur"
        control={control}
        render={({ field}) => (

          <div className="flex flex-col w-full col-span-3"> 
        <RadioGroup  className="col-span-3 flex "
        { ...field }
        onValueChange={field.onChange}
        >
        <div className="flex items-center space-x-2">
            <RadioGroupItem  value="oui" id="oui" 
             className="h-5 w-5 border-2 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="oui">Oui</Label>
        </div>

        <div className="flex items-center space-x-2">
            <RadioGroupItem  value="non" id="non"
             className="h-5 w-5 border-2 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="non">Non</Label>
        </div>

        </RadioGroup>

       
        {errors?.climatisseur && (
              <p className="text-sm text-red-500 mt-2  col-span-3">{errors?.climatisseur?.message}</p>
            )}

        
         
        </div>
        )}
      />
        
        </div>


        <div className="grid grid-cols-4 items-center gap-4 my-2 p-1">

        <Label>Genre</Label>

        <Controller
        name="genre"
        control={control}
        render={({ field}) => (

          <div className="flex flex-col w-full col-span-3"> 
        <RadioGroup  className="col-span-3 flex "
        { ...field }
        onValueChange={field.onChange}
        >
        <div className="flex items-center space-x-2">
            <RadioGroupItem  value="bus" id="bus" 
             className="h-5 w-5 border-2 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="bus">Bus</Label>
        </div>

        <div className="flex items-center space-x-2">
            <RadioGroupItem  value="minibus" id="minibus"
             className="h-5 w-5 border-2 border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="minibus">Mini-bus</Label>
        </div>

        </RadioGroup>

       
        {errors?.genre && (
              <p className="text-sm text-red-500 mt-2  col-span-3">{errors?.genre?.message}</p>
            )}

        
         
        </div>
        )}
      />
        
        </div>

            

        <div className="my-2 flex gap-x-2 ">

        <Label className=" w-full p-1 flex-1">Boite Vitesse</Label>

        <Controller
        name="boite"
        control={control}
        render={({ field }) => (
            <div className="flex-3">
            <Select 
            {...field}
            onValueChange={field.onChange}
            value={field.value}
            >
            
                <SelectTrigger className="w-full p-1 flex-3">
                <SelectValue placeholder="selectionner la boite de vitesse" />
                </SelectTrigger>
            <SelectContent className="bg-slate-300">
                <SelectItem value="Manuel" className="hover:bg-[#FDF2E7]">Manuel</SelectItem>
                <SelectItem value="Auto" className="hover:bg-[#FDF2E7]">Auto</SelectItem>
            </SelectContent>
        </Select>
        {errors?.boite && (
              <p className="text-sm text-red-500 mt-2 col-span-3">{errors?.boite?.message}</p>
            )}

            </div>

        )}
      />

</div>

      
<div className="my-2 flex gap-x-2 ">
        <Label htmlFor="name" className="text-right w-full p-1 flex-1">
           Prix
        </Label>
        <Controller
        name="prix"
        control={control}
        render={({ field }) => (
            <div className="flex flex-col w-full  flex-3">
        <Input {...field} placeholder='Prix du bus' type='text' className=""/>
         {errors.prix && (
              <p className="text-sm text-red-500 mt-2">{errors?.prix?.message}</p>
            )}
        </div>
        )
        }
      />
      </div>


      <div className=" mt-6 flex justify-end">
      <Button variant='outline' type='submit' 
     
      className='bg-purple-600 text-white w-1/3 hover:bg-purple-900 cursor-pointer'
      disabled={isPending}
      >
      
      {isPending?'Envo...':'Publier'}
       
        </Button>
      </div>

</form>


    </>
  )
}

export default AddForm