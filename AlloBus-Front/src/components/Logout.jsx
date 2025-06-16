import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { removeLocalStorage } from "../helpers/setLocalStorage"



const Logout = () => {
    
    const navigate = useNavigate()
    
    
    useEffect(()=>{
        
        removeLocalStorage('connexion')

       navigate('/connexion')


    },[])

return <></>

}

export default Logout