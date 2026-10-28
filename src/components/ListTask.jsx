import { useDispatch, useSelector } from "react-redux";
import { setTaskFilter } from "../features/tasks/tasksSlice.js";
import Task from "./Task.jsx";

const filters = [
  { value: "all", label: "All" },
  { value: "active", label: "Not done" },
  { value: "done", label: "Done" },
];

export default function ListTask() {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state) => state.tasks);
  const visibleTasks = items.filter((task) => {
    if (filter === "active") return !task.isDone;
    if (filter === "done") return task.isDone;
    return true;
  });
  const completedCount = items.filter((task) => task.isDone).length;

  return (
    <section className="task-section" aria-label="Your tasks">
      <div className="list-toolbar">
        <div className="filter-group" aria-label="Filter tasks">
          {filters.map((option) => (
            <button
              aria-pressed={filter === option.value}
              className={`filter-button${filter === option.value ? " is-selected" : ""}`}
              key={option.value}
              onClick={() => dispatch(setTaskFilter(option.value))}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
        <span className="task-count">
          {completedCount} of {items.length} done
        </span>
      </div>

      {visibleTasks.length > 0 ? (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      ) : (
        <p className="empty-state">
          {items.length === 0
            ? "Your list is clear. Add a task to get started."
            : filter === "done"
              ? "No completed tasks yet."
              : "Nothing left to do. Nice work!"}
        </p>
      )}
    </section>
  );
}
