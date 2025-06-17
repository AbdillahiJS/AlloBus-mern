
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog"
import AddForm from "./AddForm"

import { Button } from "@/components/ui/button"



const AjouterVoiture = () => {

  
 

  return (
    <>
<Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ring-1 ring-blue-300 bg-purple-500 text-white">Ajouter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[35%]  bg-white ">
        <DialogHeader>
          <DialogTitle>Publier une voiture de location</DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-4 py-4  p-2">
      <AddForm/>

        </div>
       
      </DialogContent>
    </Dialog>

    
    </>
  )
}
export default AjouterVoiture