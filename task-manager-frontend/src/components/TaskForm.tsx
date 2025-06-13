import { useState } from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";

interface Props {
  onTaskAdded: (data: { title: string; description: string }) => void;
  loading: boolean;
}

export default function TaskForm({ onTaskAdded, loading }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onTaskAdded({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
          disabled={loading}
          className="form-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
          className="form-textarea"
          rows={5}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <FaSpinner className="spinner" />
          ) : (
            <>
              <FaPlus /> Add Task
            </>
          )}
        </button>
      </div>
    </form>
  );
}
