import Button from "../components/Button.tsx";
import TaskList from "../components/TaskList.tsx";
import { useAuthContext } from "../hooks/useAuth.ts"
import { useTasksContext } from "../hooks/useTasks.ts";
import { useModal } from "../hooks/useModal.ts";
import CreateTaskForm from "../components/CreateTaskForm.tsx";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { tasks, loading } = useTasksContext();
  const { isOpenModal: isOpenModalCreate, handlerOpenModal: handlerOpenModalCreate, handlerCloseModal: handlerCloseModalCreate } = useModal();
  const { handlerEditTask } = useTasksContext();


  if (loading) {
    return <p>Cargando...</p>
  }

  const handlerEditTaskTodo = (_id: string) => {
    handlerEditTask(_id);
    handlerOpenModalCreate();
  }

  return (
    <section className="container mx-auto">
      <h1 className="text-slate-500 font-black text-2xl mt-8">Dashboard de {user.name}</h1>
      {
        isOpenModalCreate && (
          <CreateTaskForm
            isOpen={isOpenModalCreate}
            closeModal={handlerCloseModalCreate}
          />
        )
      }
      <section className="mt-10">
        {
          tasks.length > 0
            ? (
              <article className="px-6 py-10 bg-white rounded-lg shadow shadow-violet-900/10">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-black text-violet-600">TODO List Items</h2>
                    <p className="text-slate-900 text-sm font-medium">A list of all the users in your account including their name, title, email and role.</p>
                  </div>
                  <div>
                    <Button
                      text='Add task'
                      handler={handlerOpenModalCreate}
                      className="bg-violet-200 text-violet-500 border-2 border-violet-500 hover:bg-violet-400 hover:text-slate-50"
                    />
                  </div>
                </div>
                <TaskList 
                  tasks={tasks}
                  handlerEditTaskTodo={handlerEditTaskTodo}
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
