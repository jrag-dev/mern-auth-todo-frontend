import { createContext, useEffect, useState } from "react";
import { IAccessTokenResponse, IAuthResponse, IUser } from "../../types/types.ts";
import { instanceAxios } from "../../config/axios.ts";
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";


interface AuthProviderProps {
  children: React.ReactNode;
}


export const AuthContext = createContext(
  {
    isAuthenticated: false,
    user: {},
    getAccessToken: () => {},
    saveUser: (userData: IAuthResponse) => {},
    getRefreshToken: () => {},
  }
);


const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState<IUser>()
  //const [refreshToken, setRefreshToken] = useState('');


  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    if (accessToken) {
      // The user is autheticated
    } else {
      // the user isn't autheticated
      const token = getRefreshToken();
      console.log(token)
      if (token) {
        const newAccessToken = await requestNewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionInfo(userInfo, newAccessToken, token);
          }
        }
      }
    }
  }

  function saveSessionInfo(userInfo: IUser, accessToken: string, refreshToken: string) {
    setAccessToken(accessToken);
    setUser(userInfo);
    localStorage.setItem('token', JSON.stringify(refreshToken));
    setIsAuthenticated(true);
  }

  async function getUserInfo(accessToken: string) {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        } as RawAxiosRequestHeaders,
      }
      const { data } = await instanceAxios.get('/auth/user', config);
      return data.body.user;
    } catch (err) {
      console.log(err)
      return null;
    }
  }

  async function requestNewAccessToken(refreshToken: string) {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        } as RawAxiosRequestHeaders,
      }
      const { data } = await instanceAxios.post('/auth/refresh-token', {refreshToken}, config);
      console.log('Respuesta: ', data);
      return data.body.accessToken;
    } catch (err) {
      console.log(err)
      return null;
    }
  }


  const getAccessToken = () => {
    return accessToken;
  }

  const getRefreshToken = () => {
    const tokenStored = localStorage.getItem('token');
    if (!tokenStored) {
      return null;
    }
    return JSON.parse(tokenStored);
  }


  const saveUser = (userData: IAuthResponse) => {
    saveSessionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken);
  }

  const data = {
    isAuthenticated,
    user,
    getAccessToken,
    saveUser,
    getRefreshToken
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;