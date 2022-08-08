import { Link } from "react-router-dom";
import "./SearchBar.css";
function SearchBar({filterText, handleChange}) {
  
  return (
    <form className="search-bar">
      <Link to="/search">
      <input
        className="search-bar__input"
        type="text"
        value={filterText}
        onChange={handleChange}
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
