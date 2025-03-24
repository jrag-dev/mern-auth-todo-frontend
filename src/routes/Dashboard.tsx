import Button from "../components/Button.tsx";
import TaskList from "../components/TaskList.tsx";
import { useAuthContext } from "../hooks/useAuth.ts"
import { useTasksContext } from "../hooks/useTasks.ts";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { tasks, loading } = useTasksContext();


  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <section className="container mx-auto">
      Dashboard de {user.name}

      <section className="mt-20">
        {
          tasks.length > 0
            ? (
              <article className="px-6 py-10 bg-slate-900 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-black text-violet-600">TODO List Items</h2>
                    <p className="text-slate-50 text-sm">A list of all the users in your account including their name, title, email and role.</p>
                  </div>
                  <div>
                    <Button
                      text='Add task'
                    />
                  </div>
                </div>
                <TaskList 
                  tasks={tasks}
                />
              </article>
            ) : (
              <article className="py-10">
                <h2 className="text-center text-2xl font-black text-violet-600">TODO List empty</h2>
              </article>
            )
        }
      </section>
    </section>
  )
}

export default Dashboard
