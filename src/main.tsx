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
import { NotificationProvider } from './contexts/notifications/NotificationProvider.tsx'
import { NotificationsList } from './components/Notifications.tsx'
import TasksProvider from './contexts/tasks/TasksProvider.tsx'
import CreateTask from './routes/CreateTask.tsx'
import Profile from './routes/Profile.tsx'


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
        },
        {
          path: '/dashboard/profile',
          element: <Profile/>,
        },
        {
          path: '/tasks/add-task',
          element: <CreateTask/>,
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <TasksProvider>
          <NotificationsList/> 
          <RouterProvider router={router} />
        </TasksProvider>
      </NotificationProvider>
    </AuthProvider>
  </StrictMode>,
)
