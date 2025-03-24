import { Outlet, Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuth.ts"

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  
  return (
    <section className="w-full">
      {
        isAuthenticated
          ? (
            <Outlet/>
          )
          : (
            <Navigate to='/login'/>
          )
      }
    </section>
  )
}

export default ProtectedRoutes
