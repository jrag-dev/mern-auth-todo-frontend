import { Link } from "react-router-dom"
import Button from "./Button.tsx"
import { useAuthContext } from "../hooks/useAuth.ts"
import { useNotifications } from "../hooks/useNotification.ts";

const AdminNavbar = () => {
  const { signout } = useAuthContext();
  const { addNotification } = useNotifications();


  const handlerLogout = async () => {
    const response = await signout();
    console.log(response)
    addNotification(response)
  }

  return (
    <header className="bg-slate-50 shadow shadow-violet-900/5 h-16 flex items-center justify-center">
        <nav className="container h-full flex items-center justify-between">
          <Link className="flex items-center justify-center" to='/dashboard'>
            <h1 className="text-violet-600 font-black text-xl border shadow shadow-violet-800 rounded-lg py-1.5 px-6">TodoApp</h1>
          </Link>
          <ul className="flex items-center gap-10">
            <li className="font-medium text-slate-600">
              <Link className="hover:text-violet-600" to='/dashboard/profile'>Profile</Link>
            </li>
            <li className="font-medium text-slate-600 hover:text-violet-600">
              <Button
                text='Logout'
                handler={handlerLogout}
                className="border-2 border-slate-400 text-slate-500 hover:border-violet-400 hover:text-violet-500 hover:bg-violet-200"
              />
            </li>
          </ul>
        </nav>
    </header>
  )
}

export default AdminNavbar