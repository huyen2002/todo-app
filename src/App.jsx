import { useState } from "react";
import "./App.css";
import Content from "./components/Content";
import FilterableTask from "./components/FilterableTask";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
function App() {
  return (
    <div className="App">
      
      <SideBar />
      <FilterableTask />
    </div>
  );
}

export default App;

