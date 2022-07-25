import "./Content.css";

import { useState } from "react";
import { ImportantData } from "../data/ImportantData";
import { CompletedData } from "../data/CompletedData";
import InputTask from "./InputTask";
function Content(props) {
  const [list, setList] = useState(props.list);

  const handleDelete = (id) => {
    const newList = list;
    newList.splice(id, 1);
    setList([...newList]);
  };

  const handleImportant = (id) => {
    const newList = list;
    if (!newList[id].important) {
      ImportantData.push(newList[id]); //push item to important list
      newList[id].important = true; //change item important status
    } else {
      newList[id].important = false; //change item important status
      ImportantData.splice(id, 1); //remove item from important list
    }
    setList([...newList]);
    console.log(ImportantData);
  };

  const handleCompleted = (id) => {
    const newList = list;
    if (!newList[id].completed) {
      CompletedData.push(newList[id]); //push item to completed list
      newList[id].completed = true; //change item completed status
    } else {
      newList[id].completed = false; //change item completed status
      CompletedData.splice(id, 1); //remove item from completed list
    }
    setList([...newList]);
    console.log(CompletedData);
  };
  return (
    <div className="content">
      <div className="content__header"></div>
      <div className="content__main">
        <ul className="content-list">
          {list.map((item, index) => {
            return (
              <li className="content-list-item" key={index}>
                <p>{item.name}</p>
                <div className="content-list-item-button">
                  <button
                    onClick={() => handleCompleted(index)}
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
                    onClick={() => handleImportant(index)}
                    className="content-list-item-button-btn"
                  >
                    <ion-icon
                      className="content-icon"
                      name={item.important ? "star" : "star-outline"}
                    ></ion-icon>

                    <span className="tooltip-text">important</span>
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
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
        <InputTask></InputTask>
      </div>
      
    </div>
  );
}
export default Content;
