import { useContext } from "react";
import { TasksContext } from "../contexts/tasks/TasksProvider.tsx";

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (context === undefined) {
    throw new Error('useTasksContext must be used with to TasksContext');
  }
  return context;
}