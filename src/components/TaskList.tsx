import { ITask } from "../types/types.ts"
import TaskItem from "./TaskItem.tsx";

interface ITaskListProps {
  tasks: ITask[];
}

const TaskList = ({ tasks }: ITaskListProps) => {

  return (
    <table className="w-full mt-10 text-sm text-left rtl:text-right text-gray-400">
      <thead className="text-sm bg-white text-violet-600 uppercase">
        <tr className="border-b border-slate-200">
          <th scope="col" className="py-3">Title</th>
          <th scope="col" className="py-3">Status</th>
          <th scope="col" className="py-3">Update</th>
          <th scope="col" className="py-3">Delete</th>
        </tr>
      </thead>
      <tbody>
      {
          tasks.map(task => {
            return (
              <TaskItem
                key={task._id}
                task={task}
              />
            )
          })
      }
      </tbody>
    </table>
  )
}

export default TaskList
