import { useAuthContext } from "../hooks/useAuth.ts"

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <section className="w-full grid place-items-center">
      <h2 className="text-3xl text-violet-500 font-bold mt-20">User details: </h2>
      <article className="container w-full h-[500px] mx-auto mt-10">
        <summary className="grid grid-cols-1 gap-3 text-slate-500 bg-white shadow shadow-slate-950/5 py-10 px-6 rounded-xl">
          <h3 className="text-xl">Name: {user.name}</h3>
          <h4 className="text-lg">Username: {user.username}</h4>
          <p className="text-lg">Email: {user.email}</p>
        </summary>
      </article>
    </section>
  )
}

export default Profile
