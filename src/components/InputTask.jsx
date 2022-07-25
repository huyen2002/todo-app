import "./InputTask.css"
function InputTask() {
  return (
    <div className="input-addTask">
      <input className="input-task" type="text" placeholder="Enter your task"></input>
      <button className="btn-addTask">
        <ion-icon name="add-circle-outline"></ion-icon>
        <p>Add</p>
      </button>
    </div>
  )
}
export default InputTask;