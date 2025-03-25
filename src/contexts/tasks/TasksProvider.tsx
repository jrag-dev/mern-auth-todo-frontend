import React, { createContext, useEffect, useState } from "react";
import { instanceAxios } from "../../config/axios.ts";
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { useAuthContext } from "../../hooks/useAuth.ts";
import { ITask, ITaskForm, ITaskResponse, ITasksResponse } from "../../types/types.ts";
import { useNotifications } from "../../hooks/useNotification.ts";


// Interfaces
interface ITasksProviderProps {
  children: React.ReactNode;
}


interface ITasksContext {
  tasks: ITask[];
  loading: boolean;
  getTaks: () => void;
  addTask: (_taskForm: ITaskForm) => void,
  completeTask: (_id: string) => void,
  uncompleteTask: (_id: string) => void,
  deleteTask: (_id: string) => void
}

const defaultState = {
  tasks: [] as ITask[],
  loading: false,
  getTaks: () => {},
  addTask: (_taskForm: ITaskForm) => {},
  completeTask: (_id: string) => {},
  uncompleteTask: (_id: string) => {},
  deleteTask: (_id: string) => {}
}
// Context 
export const TasksContext = createContext<ITasksContext>(defaultState);

// Provider
export default function TasksProvider({ children }: ITasksProviderProps) {
  const [tasks, setTasks] = useState<ITask[]>([]);
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
      //addNotification({
      //  message: response.body.message,
      //  error: !response.body.success
      //})
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  async function addTask(taskForm: ITaskForm) {
    setLoading(true)
    try {
        const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        } as RawAxiosRequestHeaders,
      }
      const { data } = await instanceAxios.post('/tasks', taskForm, config);
      const response: ITaskResponse = { ...data };
      setTasks([
        ...tasks,
        response.body.task
      ])
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

  async function completeTask(_id: string) {
    setLoading(true)
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        } as RawAxiosRequestHeaders,
      }
      console.log(config)
      const { data } = await instanceAxios.patch(`/tasks/completed/${_id}`, {}, config);
      console.log(data)
      const response: ITaskResponse = { ...data };
      const newTasks = tasks.map(prevTask => prevTask._id === response.body.task._id ? response.body.task : prevTask)
      setTasks(newTasks);
      setLoading(false);
      addNotification({
        message: response.body.message,
        error: !response.body.success
      })
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  async function uncompleteTask(_id: string) {
    setLoading(true)
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        } as RawAxiosRequestHeaders,
      }
      console.log(config)
      const { data } = await instanceAxios.patch(`/tasks/uncompleted/${_id}`, {}, config);
      const response: ITaskResponse = { ...data };
      const newTasks = tasks.map(prevTask => prevTask._id === response.body.task._id ? response.body.task : prevTask)
      setTasks(newTasks);
      setLoading(false);
      addNotification({
        message: response.body.message,
        error: !response.body.success
      })
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  async function deleteTask(_id: string) {
    setLoading(true)
    try {
        const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        } as RawAxiosRequestHeaders,
      }
      const { data } = await instanceAxios.delete(`/tasks/${_id}`, config);
      console.log(data)
      const response: ITaskResponse = { ...data };
      const newTasks = tasks.filter( prevTask => prevTask._id !== response.body.task._id);
      setTasks(newTasks);
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
        getTaks,
        addTask,
        completeTask,
        uncompleteTask,
        deleteTask
      }}
    >
      { children }
    </TasksContext.Provider>
  )
}