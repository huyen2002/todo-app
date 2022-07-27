import { useState } from "react";
import "./InputTask.css"
function InputTask(props) {
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      name: input,
      important: false,
      completed: false,
    });
    setInput("");
  }
  const handleChange = (e) => {
    setInput(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}
     className="input-addTask">
      <input value={input} className="input-task" type="text" placeholder="Enter your task"
      onChange={handleChange}></input>
      <button onClick={handleSubmit} className="btn-addTask">
        <ion-icon name="add-circle-outline" size="large"></ion-icon>
        <p>Add</p>
      </button>
    </form>
  )
}
export default InputTask;