import { useContext } from "react"
import { AuthContext } from "../contexts/auth/AuthProvider.tsx"

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used with a AuthContext');
  }
  return context;
}