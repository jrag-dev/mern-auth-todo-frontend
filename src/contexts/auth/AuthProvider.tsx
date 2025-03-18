import { createContext, useState } from "react";


interface AuthProviderProps {
  children: React.ReactNode;
}


export const AuthContext = createContext(
  {
    isAuthenticated: false
  }
);


const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const data = {
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;