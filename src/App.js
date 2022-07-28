import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
function App() {
 
  return (
    <div className="App">
      <Header></Header>
      <SideBar></SideBar>
      <Content></Content>
    </div>
  );
}

export default App;
