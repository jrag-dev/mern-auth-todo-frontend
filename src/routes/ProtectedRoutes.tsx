import { Outlet, Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuth.ts"
import AdminNavbar from "../components/AdminNavbar.tsx";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  
  return (
    <section className="w-full">
      <AdminNavbar/>
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
