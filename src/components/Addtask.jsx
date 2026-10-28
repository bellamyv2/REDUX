import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice.js";

export default function Addtask() {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedDescription = description.trim();
    if (!trimmedDescription) return;

    dispatch(addTask(trimmedDescription));
    setDescription("");
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task">
        New task
      </label>
      <input
        id="new-task"
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What needs to get done?"
        value={description}
      />
      <button className="primary-button" type="submit">
        Add task
      </button>
    </form>
  );
}
