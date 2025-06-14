import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;
