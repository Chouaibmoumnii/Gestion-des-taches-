import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

const tasks: Task[] = [];

export const getAllTasks = () => tasks;

export const createTask = (title: string, description: string): Task => {
  const task: Task = {
    id: uuidv4(),
    title,
    description,
    status: "pending",
  };
  tasks.push(task);
  return task;
};

export const deleteTask = (id: string): boolean => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

export const updateTaskStatus = (
  id: string,
  status: Task["status"]
): boolean => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return false;
  task.status = status;
  return true;
};
