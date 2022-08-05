import { useState } from "react";
import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
function App() {
  const middleHandle = () => {};
  return (
    <div className="App">
      <Header onSubmit={middleHandle} />
      <SideBar />
      <Content />
    </div>
  );
}

export default App;
