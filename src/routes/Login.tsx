import { useState } from "react";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className='grid place-items-center h-[93vh]'>
      <article className='bg-white py-10 px-6 rounded-lg w-full max-w-[500px] shadow shadow-violet-900/15'>

        <h2 className='text-center text-2xl font-bold text-violet-600 mb-10'>Login</h2>

        <form className='grid gap-5'>
          <div className="flex flex-col gap-2">
            <label className='text-slate-500 font-bold' htmlFor="email">Email</label>
            <input
              type="text" 
              name="email" 
              id="email"
              className='bg-white py-2 px-4 border-2 border-slate-300 rounded-md text-slate-600'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className='text-slate-500 font-bold' htmlFor="password">Password</label>
            <input
              type="text" 
              name="password" 
              id="password"
              className='bg-white py-2 px-4 border-2 border-slate-300 rounded-md text-slate-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input 
            type="submit" 
            value="Login"
            className='bg-violet-500 py-2 px-6 border-2 border-violet-500 rounded-md text-slate-50 font-bold mt-2 w-full md:w-1/3 hover:bg-violet-600 transition-colors duration-300 ease-in-out cursor-pointer'
          />
        </form>

      </article>
    </section>
  )
}

export default Login