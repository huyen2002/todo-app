import "react-datepicker/dist/react-datepicker.css";
import "./Content.css";
import InputTask from "./InputTask";
import { useContext } from "react";
import { Context } from "./FilterableTask";

function Content() {
  const value = useContext(Context);
  return (
    <div className="content">
      <div className="content__main">
        <ul className="content-list">
          {value.tasks.map((item, index) => {
            return (
              <li className="content-list-item" key={index}>
                <p className="content-list-item-title">{item.title}</p>
                {value.pathname === "/planned" && <p className="content-list-item-date">{item.date}</p>}

                <div className="content-list-item-button">
                  <button
                    onClick={() => value.handleCompletedTask(item.title, item.date)}
                    className="content-list-item-button-btn">
                    <ion-icon
                      className="content-icon"
                      name={
                        item.completed
                          ? "checkmark-circle"
                          : "checkmark-circle-outline"
                      }></ion-icon>
                    <span className="tooltip-text">completed</span>
                  </button>

                  <button
                    onClick={() => value.handleImportantTask(item.title, item.date)}
                    className="content-list-item-button-btn">
                    <ion-icon
                      className="content-icon"
                      name={
                        item.important ? "star" : "star-outline"
                      }></ion-icon>

                    <span className="tooltip-text">important</span>
                  </button>

                  <button
                    onClick={() => value.handleDeleteTask(item.title, item.date)}
                    className="content-list-item-button-btn">
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
        <InputTask onSubmit={value.handleAddTask}></InputTask>
      </div>
    </div>
  );
}
export default Content;
