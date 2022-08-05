import "./Content.css";
import { useState } from "react";
import InputTask from "./InputTask";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function Content() {
  const newTasks = JSON.parse(localStorage.getItem("list")) || [];
  const searchTasks = JSON.parse(localStorage.getItem("search")) || [];

  const location = useLocation();
  const { pathname } = location;
  const [list, setList] = useState(newTasks);
 
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSearch = (searchTerm) => {
    const search = list.filter((task) => {
      return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    );
    setList(search);
    localStorage.setItem("search", JSON.stringify(search));
  }

  const List = () => {
    const tasks = JSON.parse(localStorage.getItem("list")) || [];
   
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
      default:
        return tasks;
    }
  };

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

  const handleAddTask = (input, selectedDate) => {
    const newTask = JSON.parse(localStorage.getItem("list")) || [];

    switch (pathname) {
      case "/":
        newTask.push({
          name: input,
          important: false,
          completed: false,
          date: today,
        });
        break;
      case "/important":
        newTask.push({
          name: input,
          important: true,
          completed: false,
          date: today,
        });
        break;
      case "/completed":
        newTask.push({
          name: input,
          important: false,
          completed: true,
          date: today,
        });
        break;
      case "/planned":
        newTask.push({
          name: input,
          important: false,
          completed: false,
          date: formatDate(selectedDate),
        });
        break;
      default:
        break;
    }
    localStorage.setItem("list", JSON.stringify(newTask)); // save new list to localStorage
    setList(newTask); // update list
  };

  const handleDeleteTask = (name, date) => {
    const newList = JSON.parse(localStorage.getItem("list"));
    const index = newList.findIndex(function (_task) {
      return _task.name === name && _task.date === date;
    });
    newList.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(newList));
    setList(newList);
  };

  const handleImportantTask = (name, date) => {
    const newList = JSON.parse(localStorage.getItem("list"));
    const index = newList.findIndex(function (_task) {
      return _task.name === name && _task.date === date;
    });
    newList[index].important = !newList[index].important;
    localStorage.setItem("list", JSON.stringify(newList));
    setList(newList);
  };

  const handleCompletedTask = (name, date) => {
    const newList = JSON.parse(localStorage.getItem("list"));
    const index = newList.findIndex(function (_task) {
      return _task.name === name && _task.date === date;
    });
    newList[index].completed = !newList[index].completed;
    localStorage.setItem("list", JSON.stringify(newList));
    setList(newList);
  };

  return (
    <div className="content">
      <div className="content__main">
        <ul className="content-list">
          {List().map((item, index) => {
            return (
              <li className="content-list-item" key={index}>
                <p>{item.name}</p>
                <div className="content-list-item-button">
                  <button
                    onClick={() => handleCompletedTask(item.name, item.date)}
                    className="content-list-item-button-btn"
                  >
                    <ion-icon
                      className="content-icon"
                      name={
                        item.completed
                          ? "checkmark-circle"
                          : "checkmark-circle-outline"
                      }
                    ></ion-icon>
                    <span className="tooltip-text">completed</span>
                  </button>

                  <button
                    onClick={() => handleImportantTask(item.name, item.date)}
                    className="content-list-item-button-btn"
                  >
                    <ion-icon
                      className="content-icon"
                      name={item.important ? "star" : "star-outline"}
                    ></ion-icon>

                    <span className="tooltip-text">important</span>
                  </button>

                  <button
                    onClick={() => handleDeleteTask(item.name, item.date)}
                    className="content-list-item-button-btn"
                  >
                    <ion-icon className="content-icon" name="trash"></ion-icon>
                    <span className="tooltip-text">delete</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="content-footer">
        <InputTask onSubmit={handleAddTask}></InputTask>
      </div>
    </div>
  );
}
export default Content;
