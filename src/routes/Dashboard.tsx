import { useAuthContext } from "../hooks/useAuth.ts"

const Dashboard = () => {
  const { user } = useAuthContext();

  return (
    <div>
      Dashboard de {user.name}
    </div>
  )
}

export default Dashboard
