import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, toggleTask } from "../features/tasks/tasksSlice.js";

export default function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);
  const dispatch = useDispatch();

  function saveEdit(event) {
    event.preventDefault();
    const trimmedDescription = description.trim();
    if (!trimmedDescription) return;

    dispatch(editTask({ id: task.id, description: trimmedDescription }));
    setIsEditing(false);
  }

  function cancelEdit() {
    setDescription(task.description);
    setIsEditing(false);
  }

  return (
    <li className={`task-row${task.isDone ? " is-done" : ""}`}>
      <input
        aria-label={`Mark "${task.description}" ${task.isDone ? "not done" : "done"}`}
        checked={task.isDone}
        className="task-checkbox"
        onChange={() => dispatch(toggleTask(task.id))}
        type="checkbox"
      />
      {isEditing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <label className="visually-hidden" htmlFor={`edit-${task.id}`}>
            Edit task
          </label>
          <input
            autoFocus
            id={`edit-${task.id}`}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <button className="text-button save-button" type="submit">
            Save
          </button>
          <button
            className="text-button"
            onClick={cancelEdit}
            type="button"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="task-description">{task.description}</span>
          <button
            className="text-button edit-button"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit
          </button>
        </>
      )}
    </li>
  );
}
