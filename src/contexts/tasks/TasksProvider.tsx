import React, { createContext, useEffect, useState } from "react";
import { instanceAxios } from "../../config/axios.ts";
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { useAuthContext } from "../../hooks/useAuth.ts";
import { ITask, ITasksResponse } from "../../types/types.ts";
import { useNotifications } from "../../hooks/useNotification.ts";


// Interfaces
interface ITasksProviderProps {
  children: React.ReactNode;
}


interface ITasksContext {
  tasks: ITask[];
  loading: boolean;
  getTaks: () => void;
}

const defaultState = {
  tasks: [] as ITask[],
  loading: false,
  getTaks: () => {},
}
// Context 
export const TasksContext = createContext<ITasksContext>(defaultState);

// Provider
export default function TasksProvider({ children }: ITasksProviderProps) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { accessToken, isAuthenticated } = useAuthContext();
  const { addNotification } = useNotifications();


  useEffect(() => {
    getTaks();
  }, [isAuthenticated])

  async function getTaks() {
    setLoading(true)
    try {
      console.log('Task: ', accessToken)
        const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        } as RawAxiosRequestHeaders,
      }
      const { data } = await instanceAxios.get('/tasks', config);
      const response: ITasksResponse = { ...data };
      setTasks(response.body.tasks);
      setLoading(false)
      addNotification({
        message: response.body.message,
        error: !response.body.success
      })
      
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        getTaks
      }}
    >
      { children }
    </TasksContext.Provider>
  )
}