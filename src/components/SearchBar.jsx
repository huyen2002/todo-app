import { Link } from "react-router-dom";
import "./SearchBar.css";
import {Context} from "./FilterableTask";
import { useContext } from "react";

function SearchBar() {
  const value = useContext(Context);
  return (
    <form className="search-bar">
      <Link to="/search">
      <input
        className="search-bar__input"
        type="text"
        value={value.filterText}
        onChange={value.handleChange}
        placeholder="Search..."
      />
     </Link>
        <button
          className="search-bar__button"
          type="submit">
           {/* onClick={handleSubmit}> */}
          <ion-icon name="search"></ion-icon>
        </button>
      
    </form>
  );
}
export default SearchBar;
