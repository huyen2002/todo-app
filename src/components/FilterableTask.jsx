import { useState } from "react";
import Header from "./Header";
import Content from "./Content";
import { useLocation } from "react-router-dom";

function FilterableTask() {
  const tasks = JSON.parse(localStorage.getItem("list")) || [];
  const [filterText, setFilterText] = useState("");
  const [list, setList] = useState(tasks);

  const location = useLocation();
  const { pathname } = location;

  const handleChange = (e) => {
    setFilterText(e.target.value);
  }

  // function to format date in format "dd/MM/yyyy"
  const formatDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; // 0 = January
    const yyyy = date.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedDate = dd + "/" + mm + "/" + yyyy;
    return formattedDate;
  };
  const today = formatDate(new Date());

  const getList = () => {
    switch (pathname) {
      case "/":
        return tasks.filter((task) => task.date === today);
      case "/important":
        return tasks.filter(
          (task) => task.important === true && task.date === today
        );
      case "/completed":
        return tasks.filter(
          (task) => task.completed === true && task.date === today
        );
      case "/tasks":
        return tasks.filter((task) => task.completed === false);
      case "/planned":
        return tasks.filter((task) => task.date !== today);
      case "/search":
        return tasks.filter((task) => {
          return task.title.toLowerCase().includes(filterText.toLowerCase());
        });
      default:
        return tasks;
    }
  };
  const handleAddTask = (input, selectedDate) => {
    const newTasks = [
      ...tasks,
      {
        title: input,
        date: pathname === "/planned" ? formatDate(selectedDate) : today,
        completed: pathname === "/completed" ? true : false,
        important: pathname === "/important" ? true : false,
      },
    ];
    setList(newTasks);
    localStorage.setItem("list", JSON.stringify(newTasks));
  };
  const handleDeleteTask = (title, date) => {
    const newTasks = list.filter((task) => task.title !== title || task.date !== date);
    setList(newTasks);
    localStorage.setItem("list", JSON.stringify(newTasks));
  }
  const handleCompletedTask = (title, date) => {
  
    const newTasks = tasks.map((task) => {
      if (task.title === title && task.date === date) {
        task.completed = !task.completed;
      }
      return task;
    });
    setList(newTasks);
    localStorage.setItem("list", JSON.stringify(newTasks));
  };
  const handleImportantTask = (title, date) => {
    const newTasks = tasks.map((task) => {
      if (task.title === title && task.date === date) {
        task.important = !task.important;
      }
      return task;
    });
    setList(newTasks);
    localStorage.setItem("list", JSON.stringify(newTasks));
  };
  return (
    <div className="filterable-task">
      <Header filterText={filterText} handleChange={handleChange} />
      <Content
        handleCompletedTask={handleCompletedTask}
        handleDeleteTask={handleDeleteTask}
        handleAddTask={handleAddTask}
        handleImportantTask={handleImportantTask}
        tasks={getList()}
      />
    </div>
  );
}
export default FilterableTask;
