import Addtask from "./components/Addtask.jsx";
import ListTask from "./components/ListTask.jsx";

export default function App() {
  return (
    <main className="page-shell">
      <section className="task-card">
        <header className="page-header">
          <p className="eyebrow">YOUR DAY, IN FOCUS</p>
          <h1>Taskboard</h1>
          <p className="subtitle">A little progress adds up.</p>
        </header>
        <Addtask />
        <ListTask />
      </section>
      <p className="footer-note">One thing at a time.</p>
    </main>
  );
}
