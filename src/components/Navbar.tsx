import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="bg-white shadow shadow-violet-900/5 h-16 flex items-center justify-center">
        <nav className="container h-full flex items-center justify-between">
          <Link className="flex items-center justify-center" to='/dashboard'>
            <h1 className="text-violet-600 font-black text-xl border-2 rounded-4xl py-1 px-4">TodoApp</h1>
          </Link>
          <ul className="flex items-center gap-10">
            <li className="font-medium text-slate-600">
              <Link to='/login'>Login</Link>
            </li>
            <li className="font-medium text-slate-600">
              <Link to='/signup'>Signup</Link>
            </li>
          </ul>
        </nav>
    </header>
  )
}

export default Navbar
