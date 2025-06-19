
        import { Input } from "@/components/ui/input"
        import { Label } from "@/components/ui/label"
        import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
        import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

        import { Button } from "@/components/ui/button"
import { Check } from "lucide-react";
        import { useForm, Controller } from "react-hook-form";
        import { yupResolver } from '@hookform/resolvers/yup';
        import * as yup from "yup";
        import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
        import { useParams } from "react-router-dom"
         import api from "../../../api/apiLayers"
         import toast, { Toaster } from 'react-hot-toast';

        let editVoitureSchema = yup.object({

            editNomDeBus: yup.string().required('Nom du bus ne pas etre vide'),

            editGenre: yup.string().oneOf(['bus','minibus'],'Vous devez sélectionner une option')
            .required('le champ du genre ne doit pas etre vide'),

            editNombreDePassager: yup.number().required('Nombre des passagers ne pas etre vide')
            .min(10, 'Doit avoir au moins 10 passager'),

            editClimatisseur: yup.string().oneOf(['oui','non'],'Vous devez sélectionner une option')
            .required('le champ du climatisation de doit pas etre vide'),

            editPrix: yup.number().required('le prix du bus est obligatoire '),

            editBoite: yup.string().oneOf(['Manuel','Auto'],'Vous devez sélectionner un type de boîte').required('le champ de boite doit pas etre vide'),
        
        });



        const UpdateForm = () => {
           const {id} =  useParams()

           
           const {data:{getOneCarRental}} = useSuspenseQuery({
            queryKey:[id],
            queryFn:async()=>{
                try {
                   let getOne = await api.get(`/api/admin/${id}`)
                   return getOne?.data
                } catch (error) {
                    console.log(error)
                }
            }
        })

console.log(getOneCarRental?.prix );
            const { control, handleSubmit, formState:{ errors } } = useForm({
                resolver: yupResolver(editVoitureSchema),
                defaultValues: {
                    editNomDeBus:getOneCarRental?.titre || "",
                    editGenre: getOneCarRental?.genre || "",
                    editNombreDePassager: getOneCarRental?.passagers || "",
                    editClimatisseur: getOneCarRental?.climatisseur || "",
                    editPrix: getOneCarRental?.prix || "",
                    editBoite: getOneCarRental?.boiteVitesse || "",
                  }
            });


            const {mutateAsync} = useMutation({
                mutationFn:async(updateData)=>{
                    try {
                       let updateOneCar = await api.put(`/api/admin/${id}`,updateData)
                       return updateOneCar?.data
                    } catch (error) {
                        console.log(error)
                    }
                }
             })


const SubmitForm = (data) => { 
    console.log(data);
                
  toast.promise(

    mutateAsync(data),
    {
      loading: 'Sauvegarde...',
      success: (data) =>data.message ,
      error: (error) => error.message || 'Erreur',
    }
  )
            }


        return (
            <>
            <Toaster position='top-right'/>
            <form onSubmit={handleSubmit(SubmitForm)} className='p-2 '>

        <div className="flex lg:flex-row flex-col">

        <Label htmlFor="name" className="my-1 lg:my-0 p-1 text-center  flex-1">
            Bus
        </Label>
        <Controller
        name="editNomDeBus"
        control={control}
        render={({ field }) => (
            <div className="flex flex-col flex-3 ">
           <Input {...field} placeholder='Nom du bus' type='text'  className=""/>
       
        </div>
        )
        }
        />
        </div>

        {errors.editNomDeBus ? (
            <>
            <div className="flex mb-2 ">
                <p className="flex-1 lg:flex hidden"></p>
            <p className="text-sm text-red-500 pl-4 flex-3 ">{errors?.editNomDeBus?.message}</p>
            </div>
            </>
      ):(<div className="lg:my-6 my-2"></div>)
    }



        <div className="flex lg:flex-row flex-col   ">
        <Label htmlFor="username" className="text-right my-1 lg:my-0 p-1 flex-1  ">
        Passagers
        </Label>

        <Controller
        name="editNombreDePassager"
        control={control}
        render={({ field }) =>(
            <div className="flex flex-col flex-3 ">
                <Input {...field} placeholder='Nombre du passagers' type='number'  className="col-span-3" />
        </div>
        )
    }
    />
        </div>


    {errors.editNombreDePassager?(
        <>
        <div className="flex mb-2">
            <p className="flex-1 lg:flex hidden"></p>
          <p className="text-sm text-red-500 my-1 pl-4 flex-3 ">{errors?.editNombreDePassager?.message}</p>
       
        </div>
        </>
):(<div className="lg:my-6 my-2"></div>)
}
        




        <div className="flex  lg:flex-row flex-col   ">

        <Label className='text-right  p-1 flex-1 my-1 lg:my-0'>Climatisseur</Label>

        <Controller
        name="editClimatisseur"
        control={control}
        render={({ field}) => (

        <div className="flex-3 "> 
        <RadioGroup  
        { ...field }
        onValueChange={field.onChange}
        className="flex flex-col flex-2 "
       
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
            >

<Check className="hidden data-[state=checked]:block w-3 h-3 text-green-600" />
            </RadioGroupItem>
            <Label htmlFor="non">Non</Label>
        </div>

        </RadioGroup>

        </div>
)}
/>

</div>

{errors?.editClimatisseur ? (
     <div className="flex mb-2">
     <p className="flex-1 lg:flex hidden"></p>
 
   <p className="text-sm text-red-500 my-1 pl-4 flex-3">{errors?.editClimatisseur?.message}</p>

 </div> 
    
    ):(<div className="lg:my-6 my-2"></div>)
}


        <div className="flex my-4 lg:flex-row flex-col">

        <Label className="text-right  p-1 flex-1 my-1 lg:my-0">Genre</Label>

        <Controller
        name="editGenre"
        control={control}
        render={({ field}) => (

          <div className="flex-3"> 
        <RadioGroup 
        { ...field }
        onValueChange={field.onChange}
      
        className="flex flex-col flex-2 "
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

       
        {errors?.editGenre && (
              <p className="text-sm text-red-500 mt-2  col-span-3">{errors?.genre?.editGenre}</p>
            )}

        
         
        </div>
        )}
      />
        
        </div>


            

        <div className="flex lg:flex-row flex-col  flex gap-x-2 ">

        <Label className="p-1 flex-1 my-1 lg:my-0">Boite Vitesse</Label>

        <Controller
        name="editBoite"
        control={control}
        render={({ field }) => (
            <div className="flex-3 lg:col-span-2">
            <Select 
            {...field}
            onValueChange={field.onChange}
            value={field.value}
            
            className=''
            >
            
                <SelectTrigger className="w-full p-1 flex-3">
                <SelectValue placeholder="selectionner la boite de vitesse" />
                </SelectTrigger>
            <SelectContent className="bg-slate-300">
                <SelectItem value="Manuel" className="hover:bg-[#FDF2E7]">Manuel</SelectItem>
                <SelectItem value="Auto" className="hover:bg-[#FDF2E7]">Auto</SelectItem>
            </SelectContent>
        </Select>

            </div>

)}
/>
</div>

{errors?.editBoite ? (
    <div className="flex mb-2">
     <p className="flex-1 lg:flex hidden"></p>
     <p className="text-sm text-red-500 my-1 col-span-3  pl-4 flex-3">{errors?.editBoite?.message}</p>
 </div>

    ):(<div className="lg:my-6 my-2"></div>)

}


<div className="my-4 flex gap-x-2 ">
        <Label htmlFor="name" className="text-right w-full p-1 flex-1">
           Prix
        </Label>
        <Controller
        name="editPrix"
        control={control}
        render={({ field }) => (
            <div className="flex flex-col w-full  flex-3">
        <Input {...field} placeholder='Prix du bus' type='text'  className=""/>
         {errors.prix && (
              <p className="text-sm text-red-500 mt-2">{errors?.editPrix?.message}</p>
            )}
        </div>
        )
        }
      />
      </div>


        <div className=" mt-6 flex justify-end ">
        <Button variant='outline' type='submit' className='bg-purple-600 hover:bg-purple-800 text-white tracking-wider font-bold w-full lg:w-1/3'>Publier</Button>
        </div>

        </form>

            
            
            </>
        )
        }

        export default UpdateForm