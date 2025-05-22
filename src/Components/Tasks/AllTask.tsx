import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <div className={darkTheme ? "main dark" : "main light"}>
        <div className="heading">
          <h2>Task Manager</h2>
          <div className="header-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {darkTheme ? <FaSun /> : <FaMoon />}
            </button>
            <button onClick={() => navigate("/add")} className="add-btn-head">
              Add Task
            </button>
          </div>
        </div>
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
