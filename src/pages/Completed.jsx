import { CompletedData } from "../data/CompletedData";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Content from "../components/Content";
//completed function
function Completed(e) {
  return (
    <div>
      <Header></Header>
      <SideBar></SideBar>
      <Content list={CompletedData}></Content>
    </div>
  );
}
export default Completed;
