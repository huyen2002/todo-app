import SearchBar from "./SearchBar";
import './Header.css';
function Header() {
  return (
    <div className="header">
      <div className="header__brand">
        <span className="header__logo">TO DO</span>
      </div>

      <SearchBar></SearchBar>
      <div className="header__container">
        <div className="header__setting">
          <ion-icon name="settings"></ion-icon>
        </div>
        <div className="header__help">
          <ion-icon name="help-circle-outline"></ion-icon>
        </div>
        <div className="header__notification">
          <ion-icon name="notifications-outline"></ion-icon>
        </div>
      </div>
    </div>
  );
}
export default Header;
