import { Request, Response } from "express";
import { createTaskSchema, updateTaskStatusSchema } from "../utils/validation";
import * as taskService from "../services/tasks.service";

export const getTasks = (req: Request, res: Response) => {
  res.json(taskService.getAllTasks());
};

export const addTask = (req: Request, res: Response) => {
  const result = createTaskSchema.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ error: result.error.errors });

  const { title, description } = result.data;
  const task = taskService.createTask(title, description);
  res.status(201).json(task);
};

export const removeTask = (req: Request, res: Response) => {
  const success = taskService.deleteTask(req.params.id);
  if (!success) return res.status(404).json({ error: "Task not found" });
  res.status(204).send();
};

export const updateStatus = (req: Request, res: Response) => {
  const result = updateTaskStatusSchema.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ error: result.error.errors });

  const success = taskService.updateTaskStatus(
    req.params.id,
    result.data.status
  );
  if (!success) return res.status(404).json({ error: "Task not found" });

  res.status(204).send();
};
