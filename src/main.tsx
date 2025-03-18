import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import Login from './routes/Login.tsx'
import Signup from './routes/Signup.tsx'
import Dashboard from './routes/Dashboard.tsx'
import ProtectedRoutes from './routes/ProtectedRoutes.tsx'
import AuthProvider from './contexts/auth/AuthProvider.tsx'
import PublicLayout from './layouts/PublicLayout.tsx'
import Landing from './routes/Landing.tsx'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <PublicLayout/>,
      children: [        
        {
          path: '/',
          element: <Landing />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup/>,
        },
      ]
    },
    {
      path: '/',
      element: <ProtectedRoutes/>,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard/>
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
