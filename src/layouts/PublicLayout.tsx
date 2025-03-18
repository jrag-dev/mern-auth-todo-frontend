import { Outlet } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuth.ts";
import { Navigate } from "react-router-dom";

import Navbar from '../components/Navbar.tsx'

const PublicLayout = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to='/dashboard'/>
  }
  
  return (
    <section className='min-h-screen'>
      <Navbar/>
      <Outlet/>
    </section>
  )
}

export default PublicLayout
