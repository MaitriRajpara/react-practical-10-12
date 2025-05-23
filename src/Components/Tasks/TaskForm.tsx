import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import type { FormValues } from "../Types/type";
import { TaskStatus } from "../Types/type";
import { useTheme } from "../Context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa"; // Using react-icons for toggle icons
import { useTasks } from "../Context/TaskProvider";
import "./taskform.css";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  desc: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),
});

const TaskForm = () => {
  // const { darkTheme } = useTheme();
  const { darkTheme, toggleTheme } = useTheme();
  const { tasks, setTasks } = useTasks();
  const navigate = useNavigate();
  const { editId } = useParams<{ editId?: string }>();
  const taskToEdit = tasks.find((task) => task.id === editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (taskToEdit) {
      reset({
        title: taskToEdit.title,
        desc: taskToEdit.desc,
      });
    }
  }, [taskToEdit, reset]);

  const onSubmit = (data: FormValues) => {
    let allTasks = [...tasks];
    if (taskToEdit) {
      const taskIndex = tasks.findIndex((task) => task.id === taskToEdit.id);
      if (taskIndex !== -1) {
        allTasks[taskIndex] = { ...tasks[taskIndex], ...data };
      }
    } else {
      const id = crypto.randomUUID();
      allTasks = [...allTasks, { ...data, id, status: TaskStatus.Todo }];
    }
    setTasks(allTasks);
    navigate("/");
  };

  return (
    <div className={`task-form ${darkTheme ? "dark" : "light"}`}>
      <div className="task-box">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle theme"
        >
          {darkTheme ? <FaSun /> : <FaMoon />}
        </button>
        <h2>{editId ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            className="task-input"
            {...register("title")}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}

          <input
            type="text"
            placeholder="Description"
            className="task-input"
            {...register("desc")}
          />
          {errors.desc && <p className="error">{errors.desc.message}</p>}

          <button type="submit" className="add-btn-e">
            {editId ? "Save" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
