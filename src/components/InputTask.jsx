import { useState } from "react";
import "./InputTask.css";

function InputTask({ onSubmit }) {
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput("");
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <form className="input-addTask">
      <input
        value={input}
        className="input-task"
        type="text"
        placeholder="Enter your task"
        onChange={handleChange}
      ></input>
      <button onClick={handleSubmit} className="btn-addTask">
        <ion-icon name="add-circle-outline" size="large"></ion-icon>
        <p>Add</p>
      </button>
    </form>
  );
}
export default InputTask;
