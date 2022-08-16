// import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SearchBar from "./SearchBar";
function Header() {
  return (
    <div className="header">
      <div className="header__brand">
        <span className="header__logo">TO DO</span>
      </div>

      <SearchBar />
      <ul className="header__container">
        <li className="header__container__item">
          <ion-icon name="settings"></ion-icon>
        </li>
        <li className="header__container__item">
          <ion-icon name="help-circle-outline"></ion-icon>
        </li>
        <li className="header__container__item">
         
            <Link className="header-sign-up" to="/sign-up">
              <ion-icon name="contact"></ion-icon>
            </Link>

          
        </li>
      </ul>
    </div>
  );
}
export default Header;
