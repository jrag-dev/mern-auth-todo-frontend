import { Outlet, Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuth.ts"

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  
  return (
    <div>
      {
        isAuthenticated
          ? (
            <Outlet/>
          )
          : (
            <Navigate to='/login'/>
          )
      }
    </div>
  )
}

export default ProtectedRoutes
