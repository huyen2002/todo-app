import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import { ContentData } from './data/ContentData';
function App() {
  return (
    <div className="App">
      <Header></Header>
      <SideBar></SideBar>
      <Content list={ContentData}></Content>
    </div>
  );
}

export default App;
