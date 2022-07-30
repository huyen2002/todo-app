import "./Content.css";
import { useState } from "react";
import InputTask from "./InputTask";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Content() {
  const newTask = JSON.parse(localStorage.getItem("list")) || [];
  const location = useLocation();
  const { pathname } = location;
  const [list, setList] = useState(newTask);
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const List = () => {
    const tasks = JSON.parse(localStorage.getItem("list")) || [];

    switch (pathname) {
      case "/":
        return tasks.filter((task) => task.date === formatDate(today));

      case "/important":
        return tasks.filter(
          (task) => task.important === true && task.date === formatDate(today)
        );

      case "/completed":
        return tasks.filter(
          (task) => task.completed === true && task.date === formatDate(today)
        );

      case "/tasks":
        return tasks.filter((task) => task.completed === false);

      case "/planned":
        return tasks.filter((task) => task.date !== formatDate(today));
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

  const handleAddTask = (task) => {
    const newTask = JSON.parse(localStorage.getItem("list")) || [];

    switch (pathname) {
      case "/":
        newTask.push({
          name: task,
          important: false,
          completed: false,
          date: formatDate(today),
        });
        break;
      case "/important":
        newTask.push({
          name: task,
          important: true,
          completed: false,
          date: formatDate(today),
        });
        break;
      case "/completed":
        newTask.push({
          name: task,
          important: false,
          completed: true,
          date: formatDate(today),
        });
        break;
      case "/planned":
        newTask.push({
          name: task,
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
        <ReactDatePicker
          placeholderText="Select Day"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
        ></ReactDatePicker>
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
