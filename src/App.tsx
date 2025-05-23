import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Tasks/AllTask";
import TaskForm from "./Components/Tasks/TaskForm";
import NotFound from "./Components/Tasks/Notfound";
import { TaskProvider } from "./Components/Context/TaskProvider";
import "./App.css";

export default function App() {
  return (
    <Router>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<TaskForm />} />
          <Route path="/edit/:editId" element={<TaskForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskProvider>
    </Router>
  );
}
