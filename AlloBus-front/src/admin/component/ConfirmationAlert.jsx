

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../api/apiLayers"
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const socket = io('http://localhost:8888');


const ConfirmationAlert = ({Trash,info}) => {

  const queryClient = useQueryClient();

const {mutateAsync} = useMutation({
          mutationFn:async(id)=>{
            try {
              let supprimerLocation= await api.delete(`/admin/${id}`)
              return supprimerLocation?.data
              
            } catch (error) {
              console.log(error);
            }
        }
     })


const handleDelet =  (id) => {
 
  toast.promise(
    mutateAsync(id),
    {
      loading: 'Sauvegarde...',
      success: (data) => data.message,
      error: (error) => error.message || 'Erreur',
    }
  )
  socket.on('item_deleted', () => {
    queryClient.invalidateQueries(['allCar']);
});

}



  return (
    <>

<AlertDialog className=''>
  <AlertDialogTrigger>
    {Trash}
  </AlertDialogTrigger>
  <AlertDialogContent className='bg-white top-[40%]'>
    <AlertDialogHeader>
      <AlertDialogTitle>Etes vous de Supprimer cette Location {info.row.original._id} ?</AlertDialogTitle>
      <AlertDialogDescription>
        Cet action va supprimer definitivement sur votre base de donne 
        
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel
      onClick={()=>console.log('cancel ')}
      >
        Annuler
      </AlertDialogCancel>

      <AlertDialogAction className='bg-red-500 text-white'
        onClick={()=>handleDelet(info.row.original._id)}
      >
        Supprimer
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


    </>
  )
}

export default ConfirmationAlert