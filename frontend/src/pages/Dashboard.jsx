import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";
import TaskItem from "../components/TaskItem";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await api.get("/api/tasks");
      setTasks(res.data || []);
    } catch (e) {
      console.error("fetchTasks error:", e);
      setErr("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await api.post("/api/tasks", { title: title.trim() });
      setTasks((prev) => [res.data, ...prev]);
      setTitle("");
    } catch (e) {
      console.error("addTask error:", e);
      setErr("Could not create task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const res = await api.delete(`/api/tasks/${id}`);
      setTasks((s) => s.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Delete task error:", error);
      const resp = error?.response;
      if (resp) {
        setErr(resp.data?.message || `Delete failed (${resp.status})`);
      } else {
        setErr(error.message || "Could not delete task");
      }
    }
  };

  // Update task status
  const updateTask = async (id, status) => {
    try {
      const res = await api.put(`/api/tasks/${id}`, { status });
      setTasks((s) => s.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Update task error:", error);
      const resp = error?.response;
      if (resp) {
        setErr(resp.data?.message || `Update failed (${resp.status})`);
      } else {
        setErr(error.message || "Could not update task");
      }
    }
  };

  // Edit task title
const editTask = async (id, newTitle) => {
  try {
    setErr("");
    if (!String(newTitle).trim()) {
      throw new Error('Title cannot be empty');
    }

    // send request
    const res = await api.put(`/api/tasks/${id}`, { title: newTitle });
    setTasks((s) => s.map((t) => (t._id === id ? res.data : t)));
  } catch (error) {
    console.error('Edit task error:', error);
    const resp = error?.response;
    if (resp) {
      console.error('Server response data:', resp.data);
      const msg = resp.data?.message || resp.statusText || `Edit failed (${resp.status})`;
      setErr(msg);
      
      throw new Error(msg);
    } else {
      const msg = error.message || 'Could not edit task';
      setErr(msg);
      throw error;
    }
  }
};


  return (
    <>
      <Header />
      <main className="container">
        <section className="dashboard">
          <div className="dashboard-header">
            <h1>My Tasks</h1>
            <p className="muted">Hello, {user?.name}</p>
          </div>

          <div className="card new-task-card">
            <form className="new-task-form" onSubmit={addTask}>
              <input
                placeholder="Add new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button className="btn primary" type="submit" title="Add">
                <FiPlus size={16} />
              </button>
            </form>
          </div>

          {err && <div className="alert">{err}</div>}

          <div className="task-list">
            {loading ? (
              <div className="muted">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="empty">No tasks yet. Add your first task.</div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                  onEdit={editTask}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
