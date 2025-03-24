import Button from "./Button.tsx";


interface ITaskItemProps {
  task: {
    _id: string;
    title: string;
    completed: boolean;
    createdAt: Date
  }
}

const TaskItem = ({ task }: ITaskItemProps) => {
  const {_id, title, completed, createdAt } = task;

  return (
    <tr className="bg-white border-b border-slate-200">
      <th scope="row" className="py-4 font-medium text-slate-600 whitespace-nowrap">{title}</th>
      <td className="py-4">
        {
          completed
            ? (
              <Button
                text='Completed'
                className="bg-lime-200 text-lime-500 border-2 border-lime-500"
              />
            ) : (
              <Button
                text='Uncompleted'
                className="bg-yellow-100 text-yellow-500 border-2 border-yellow-500"
              />
            )
        }
      </td>
      <td className="py-4">
        <Button 
          text='Update'
          className="bg-violet-200 text-violet-500 border-2 border-violet-500"
        />
      </td>
      <td className="py-4">
        <Button 
          text='Delete' 
          className="bg-rose-200 text-rose-600 border-2 border-rose-500"
        />
      </td>
    </tr>
  )
}

export default TaskItem
