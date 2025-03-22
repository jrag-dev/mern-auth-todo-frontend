import { useState } from 'react'
import { instanceAxios } from '../config/axios.ts';
import { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { useNotifications } from '../hooks/useNotification.ts';
import { useNavigate } from 'react-router-dom';
import { IAlertResponse, ISignupData } from '../types/types.ts';
import Alert from '../components/Alert.tsx';
import { verifyEmail } from '../lib/verifyEmail.ts';



const Signup = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [alertResponse, setAlertResponse] = useState<IAlertResponse| null>(null);
  const { addNotification } = useNotifications();
  const navigate = useNavigate();


  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([name, username, email, password, passwordConfirm].includes('')) {
      setAlertResponse({
        message: 'All fields are required',
        success: false
      })
      return;
    }

    if (!verifyEmail(email)) {
      setAlertResponse({
        message: 'Email format no valid',
        success: false
      })
      return;
    }

    if (password.length < 6) {
      setAlertResponse({
        message: 'Password must to be greater than 6 characters',
        success: false
      })
      return;
    }

    if (password !== passwordConfirm) {
      setAlertResponse({
        message: 'The passwords must to be equals',
        success: false
      })
      return;
    }

    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        } as RawAxiosRequestHeaders,
      }

      const inputData : ISignupData = {
        name,
        username,
        email,
        password
      }
      const { data }: AxiosResponse = await instanceAxios.post('/auth/signup', inputData, config);
      addNotification(
        {
          message: data.body.message,
          error: !data.body.success
        }
      )
      navigate('/login')
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlertResponse(err.response?.data.body)
      } else {
        setAlertResponse({
          message: 'Error with the server',
          success: false
        })
      }
    }
  }

  return (
    <section className='grid place-items-center h-[93vh]'>
      <article className='bg-white py-10 px-6 rounded-lg w-full max-w-[500px] shadow shadow-violet-900/15'>

        <h2 className='text-center text-2xl font-bold text-violet-600 mb-10'>Signup</h2>

        <form
          className='grid gap-5'
          onSubmit={handleSubmitForm}
        >
          {
            alertResponse && (
              <Alert
                alert={alertResponse}
              />
            )
          }
          <div className="flex flex-col gap-2">
            <label className='text-slate-500 font-bold' htmlFor="name">Nombre</label>
            <input
              type="text" 
              name="name" 
              id="name"
              className='bg-white py-2 px-4 border-2 border-slate-300 rounded-md text-slate-600'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className='text-slate-500 font-bold' htmlFor="username">Username</label>
            <input
              type="text" 
              name="username" 
              id="username"
              className='bg-white py-2 px-4 border-2 border-slate-300 rounded-md text-slate-600'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              type="password" 
              name="password" 
              id="password"
              className='bg-white py-2 px-4 border-2 border-slate-300 rounded-md text-slate-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className='text-slate-500 font-bold' htmlFor="passwordConfirm">Repeat Password</label>
            <input
              type="password" 
              name="passwordConfirm" 
              id="passwordConfirm"
              className='bg-white py-2 px-4 border-2 border-slate-300 rounded-md text-slate-600'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input 
            type="submit" 
            value="Signup"
            className='bg-violet-500 py-2 px-6 border-2 border-violet-500 rounded-md text-slate-50 font-bold mt-2 w-full md:w-1/3 hover:bg-violet-600 transition-colors duration-300 ease-in-out cursor-pointer'
          />
        </form>

      </article>
    </section>
  )
}

export default Signup