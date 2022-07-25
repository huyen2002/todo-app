import { SidebarData } from "../data/SidebarData";
import { Link } from "react-router-dom";
import ".//SideBar.css";
function SideBar(props) {
  return (
    <div className="sidebar">
      <div className="sidebar-header"></div>
      <div className="sidebar-body">
        <ul className="sidebar-list">
          {SidebarData.map((item, index) => {
            return (
              <li className="sidebar-list-item" key={index}>
                <ion-icon
                  name={item.icon}
                  className="sidebar-item-icon"
                ></ion-icon>
                <Link className="sidebar-item-link" to={item.path}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default SideBar;
