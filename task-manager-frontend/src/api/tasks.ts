import axios from "axios";
import type { Task } from "../types/task";

const BASE_URL = "http://localhost:3000/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createTask = async (data: {
  title: string;
  description: string;
}): Promise<Task> => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export const updateTaskStatus = async (
  id: string,
  status: Task["status"]
): Promise<void> => {
  await axios.patch(`${BASE_URL}/${id}`, { status });
};
