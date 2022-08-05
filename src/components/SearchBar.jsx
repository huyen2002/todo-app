import { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";
function SearchBar({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchTerm);
    setSearchTerm("");
  };

  return (
    <form className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
      <Link to="/search">
        <button
          className="search-bar__button"
          type="submit"
          onClick={handleSubmit}>
          <ion-icon name="search"></ion-icon>
        </button>
      </Link>
    </form>
  );
}
export default SearchBar;
