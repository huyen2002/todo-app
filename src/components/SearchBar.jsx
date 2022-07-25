function SearchBar(props) {
  return (
    <div className="search-bar">
      <input
        onChange={props.onSearch}
        value={props.searchTerm}
        placeholder="Search"
        type="search"
      />
      <button className="search-bar__button">
        <ion-icon name="search"></ion-icon>
      </button>
    </div>
  );
}
export default SearchBar;