import type { Task } from "../types/task";
import { FaTrash, FaCheck, FaSpinner } from "react-icons/fa";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleStatus: (task: Task) => void;
  loadingId: string | null;
}

export default function TaskList({
  tasks,
  onDelete,
  onToggleStatus,
  loadingId,
}: Props) {
  return (
    <div className="task-grid-container">
      {tasks.length === 0 ? (
        <div className="empty-state">No tasks yet. Add one to get started!</div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className={`task-card ${task.status}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
              </div>
              <div className="task-actions">
                <button
                  onClick={() => onToggleStatus(task)}
                  className={`status-button ${task.status}`}
                  disabled={loadingId === task.id}
                >
                  {loadingId === task.id ? (
                    <FaSpinner className="spinner" />
                  ) : task.status === "done" ? (
                    <FaCheck />
                  ) : (
                    "Mark Done"
                  )}
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="delete-button"
                  disabled={loadingId === task.id}
                >
                  {loadingId === task.id ? (
                    <FaSpinner className="spinner" />
                  ) : (
                    <FaTrash />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
