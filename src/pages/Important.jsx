//important function
import Header from "../components/Header";
import { ImportantData } from "../data/ImportantData";
import SideBar from "../components/SideBar";
import Content from "../components/Content";
function Important() {
  return (
    <div>
      <Header></Header>
      <SideBar></SideBar>
      <Content list={ImportantData}></Content>
    </div>
    
  );
}
export default Important;
