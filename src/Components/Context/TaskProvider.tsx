import { createContext, useState, useEffect, useContext } from "react";
import type { Task } from "../../Types/type";

interface TaskContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const stored = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(stored ? JSON.parse(stored) : []);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
