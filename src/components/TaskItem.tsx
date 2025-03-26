import { useTasksContext } from "../hooks/useTasks.ts";
import Button from "./Button.tsx";


interface ITaskItemProps {
  task: {
    _id: string;
    title: string;
    completed: boolean;
    createdAt: Date
  },
  handlerEditTaskTodo: (_id: string) => void;
}

const TaskItem = ({ task, handlerEditTaskTodo }: ITaskItemProps) => {
  const {_id, title, completed } = task;

  const { completeTask, uncompleteTask, deleteTask } = useTasksContext();

  return (
    <tr className="bg-white border-b border-slate-200">
      <th scope="row" className="py-4 font-medium text-slate-600 whitespace-nowrap">{title}</th>
      <td className="py-4">
        {
          completed
            ? (
              <Button
                text='Completed'
                _id={_id}
                className="bg-lime-200 text-lime-500 border-2 border-lime-500"
                handler={uncompleteTask}
              />
            ) : (
              <Button
                text='Uncompleted'
                _id={_id}
                className="bg-yellow-100 text-yellow-500 border-2 border-yellow-500"
                handler={completeTask}
              />
            )
        }
      </td>
      <td className="py-4">
        <Button
          text='Update'
          _id={_id}
          className="bg-violet-200 text-violet-500 border-2 border-violet-500"
          handler={handlerEditTaskTodo}
        />
      </td>
      <td className="py-4">
        <Button 
          text='Delete' 
          _id={_id}
          className="bg-rose-200 text-rose-600 border-2 border-rose-500"
          handler={deleteTask}
        />
      </td>
    </tr>
  )
}

export default TaskItem
