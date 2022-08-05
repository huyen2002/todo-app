// import { useState } from "react";
import "./Header.css";
import SearchBar from "./SearchBar";
function Header({ onSubmit }) {
  return (
    <div className="header">
      <div className="header__brand">
        <span className="header__logo">TO DO</span>
      </div>

      <SearchBar onSubmit={onSubmit} />
      <ul className="header__container">
        <li className="header__container__item">
          <ion-icon name="settings"></ion-icon>
        </li>
        <li className="header__container__item">
          <ion-icon name="help-circle-outline"></ion-icon>
        </li>
        <li className="header__container__item">
          <ion-icon name="notifications-outline"></ion-icon>
        </li>
      </ul>
    </div>
  );
}
export default Header;
