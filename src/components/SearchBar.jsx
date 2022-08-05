import { useState } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";
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
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
      <Link to="/search">
        <button className="search-bar__button" type="submit">
          <ion-icon name="search"></ion-icon>
        </button>
      </Link>
    </form>
  );
}
export default SearchBar;
