import "react-datepicker/dist/react-datepicker.css";
import "./Content.css";
import InputTask from "./InputTask";

function Content({
  handleCompletedTask,
  handleDeleteTask,
  handleAddTask,
  handleImportantTask,
  tasks,
}) {
  return (
    <div className="content">
      <div className="content__main">
        <ul className="content-list">
          {tasks.map((item, index) => {
            return (
              <li className="content-list-item" key={index}>
                <p>{item.title}</p>
                <div className="content-list-item-button">
                  <button
                    onClick={() => handleCompletedTask(item.title, item.date)}
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
                    onClick={() => handleImportantTask(item.title, item.date)}
                    className="content-list-item-button-btn">
                    <ion-icon
                      className="content-icon"
                      name={
                        item.important ? "star" : "star-outline"
                      }></ion-icon>

                    <span className="tooltip-text">important</span>
                  </button>

                  <button
                    onClick={() => handleDeleteTask(item.title, item.date)}
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
        <InputTask onSubmit={handleAddTask}></InputTask>
      </div>
    </div>
  );
}
export default Content;
