import React, { useState } from 'react';
import { FiTrash2, FiEdit, FiCheck, FiX } from 'react-icons/fi';
import './TaskItem.css';

export default function TaskItem({ task, onDelete, onUpdate, onEdit }) {
  const checked = task.status === 'Completed';
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [saving, setSaving] = useState(false);

  const handleToggle = () => {
    const next = checked ? 'Pending' : 'Completed';
    onUpdate(task._id, next);
  };

  const startEdit = () => {
    setDraft(task.title);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(task.title);
  };

  const saveEdit = async () => {
    if (!draft.trim()) return;
    setSaving(true);
    try {
      await onEdit(task._id, draft.trim());
      setEditing(false);
    } catch (e) {
      console.error('saveEdit error', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="task-card">
      <div className="task-left">
        <label className="checkbox-wrap" title={checked ? 'Mark as pending' : 'Mark as completed'}>
          <input
            type="checkbox"
            className="task-checkbox"
            checked={checked}
            onChange={handleToggle}
            aria-label={checked ? 'Mark task as pending' : 'Mark task as completed'}
          />
          <span className="checkbox-custom" />
        </label>

        <div className="task-meta" style={{ minWidth: 0 }}>
          {editing ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="edit-input"
                disabled={saving}
                aria-label="Edit task title"
              />
              <button className="icon-btn" onClick={saveEdit} disabled={saving} title="Save">
                <FiCheck />
              </button>
              <button className="icon-btn" onClick={cancelEdit} title="Cancel">
                <FiX />
              </button>
            </div>
          ) : (
            <>
              <div className={`task-title ${checked ? 'done' : ''}`} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {task.title}
              </div>
              <div className="task-sub">
                <span className={`badge status-${task.status.toLowerCase()}`}>{task.status}</span>
                <small className="muted"> • {new Date(task.createdAt).toLocaleString()}</small>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="task-actions">
        {!editing && (
          <button className="icon-btn edit" onClick={startEdit} title="Edit">
            <FiEdit />
          </button>
        )}

        <button className="icon-btn danger" onClick={() => onDelete(task._id)} title="Delete">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}
