import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "./api/tasks";
import type { Task } from "./types/task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Task["status"] }) =>
      updateTaskStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const handleAddTask = async (data: {
    title: string;
    description: string;
  }) => {
    await createTaskMutation.mutateAsync(data);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTaskMutation.mutateAsync(id);
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === "pending" ? "done" : "pending";
    await updateStatusMutation.mutateAsync({ id: task.id, status: newStatus });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>

      <div className="form-wrapper">
        <TaskForm
          onTaskAdded={handleAddTask}
          loading={createTaskMutation.isPending}
        />
      </div>

      <div className="tasks-wrapper">
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
          loadingId={
            deleteTaskMutation.isPending || updateStatusMutation.isPending
              ? "loading"
              : null
          }
        />
      </div>
    </div>
  );
}

export default App;
