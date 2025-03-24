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
    <tr className="bg-gray-900 border-gray-200">
      <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{title}</th>
      <td className="py-4">
        {
          completed
            ? (
              <Button
                text='Completed'
              />
            ) : (
              <Button
                text='Uncompleted'
              />
            )
        }
      </td>
      <td className="py-4 flex items-center gap-5">
        <Button text='Update'/>
        <Button text='Delete' />
      </td>
    </tr>
  )
}

export default TaskItem
