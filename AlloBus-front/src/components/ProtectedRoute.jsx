import { getLocalStorage } from "../helpers/setLocalStorage"
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({children}) => {

  let user =getLocalStorage('connexion')

  if (!user) {
    return <Navigate to="/connexion" replace/>
  }
    
  return children

}

export default ProtectedRoute