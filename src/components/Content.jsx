import "./Content.css";
import { useState } from "react";
import InputTask from "./InputTask";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Content() {
  const newTask = JSON.parse(localStorage.getItem("list")) || [];
  const importantTask = JSON.parse(localStorage.getItem("important")) || [];
  const completedTask = JSON.parse(localStorage.getItem("completed")) || [];

  const [list, setList] = useState(newTask);
  // const [important, setImportant] = useState(importantTask);
  // const [completed, setCompleted] = useState(completedTask);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const List = () => {
    const location = useLocation();
    const { pathname } = location;

    const tasks = JSON.parse(localStorage.getItem("list")) || [];
    if(pathname === "/"){
      return tasks;
    } else if(pathname === "/important"){
      const importantTasks = tasks.filter(task => task.important === true);
      return importantTasks;
    } else if (pathname === "/completed") {
      const completedTasks = tasks.filter(task => task.completed === true);
      return completedTasks;
    } else {
      return tasks;
    }
  };
  const handleAddTask = (task) => {
    const newTask = JSON.parse(localStorage.getItem("list")) || [];
    var index = newTask.findIndex(function (_task) {
      return _task.name === task;
    });
    if (index === -1) {
      newTask.push({
        name: task,
        important: false,
        completed: false,
      }); // add new task to list
      localStorage.setItem("list", JSON.stringify(newTask)); // save new list to localStorage
      setList(newTask); // update list
    } else {
      alert("Task already exists");
    }

    // console.log(newTask);
  };

  const handleDeleteTask = (id) => {
    const newList = JSON.parse(localStorage.getItem("list"));
    newList.splice(id, 1);
    localStorage.setItem("list", JSON.stringify(newList));
    setList(newList);
  };

  const handleImportantTask = (id) => {

    const tasks = JSON.parse(localStorage.getItem("list")) || [];
    tasks[id].important = !tasks[id].important;
    localStorage.setItem("list", JSON.stringify(tasks));
    setList(tasks);
  };

  const handleCompletedTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem("list")) || []; //get tasks from local storage
    tasks[id].completed = !tasks[id].completed; //change task completed status
    localStorage.setItem("list", JSON.stringify(tasks)); //save tasks to local storage
    setList(tasks); // set tasks to state
  };

  return (
    <div className="content">
      <div className="content__header"></div>
      <div className="content__main">
        <ul className="content-list">
          {List().map((item, index) => {
            return (
              <li className="content-list-item" key={index}>
                <p>{item.name}</p>
                <div className="content-list-item-button">
                  <button
                    onClick={() => handleCompletedTask(index)}
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
                    onClick={() => handleImportantTask(index)}
                    className="content-list-item-button-btn"
                  >
                    <ion-icon
                      className="content-icon"
                      name={item.important ? "star" : "star-outline"}
                    ></ion-icon>

                    <span className="tooltip-text">important</span>
                  </button>

                  <button
                    onClick={() => handleDeleteTask(index)}
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
