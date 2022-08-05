import { useState, useRef } from "react";
import "./InputTask.css";
import { useLocation } from "react-router-dom";
import ReactDatePicker from "react-datepicker";

function InputTask({ onSubmit }) {
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const location = useLocation();
  const { pathname } = location;
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input, selectedDate);
    setInput("");
    inputRef.current.focus();
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <form className="input-addTask">
      <input
        className="input-task"
        value={input}
        type="text"
        placeholder="Enter your task"
        onChange={handleChange}
        ref={inputRef}
      ></input>
      {pathname === "/planned" && (
        <ReactDatePicker
          className="input-date"
          placeholderText="Select date"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      )}
      <button onClick={handleSubmit} className="btn-addTask">
        <ion-icon name="add-circle-outline" size="large"></ion-icon>
      </button>
    </form>
  );
}
export default InputTask;
