import React, { useState } from "react";
import "./task.css";

const SearchBar = ({ onSearch, onSort }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSort(e.target.value);
  };

  return (
    <div className="bar">
        <div>
      <label htmlFor="search-input">Search:</label>
      <input
        id="search-input"
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
        className="searchbar"
      />
      </div>
      <div>
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={handleSortChange}
        className="sort-select"
      >
        <option value="">Select</option>
        <option value="recent">Recent</option>
        <option value="24h">Last 24 Hours</option>
        <option value="1w">Last Week</option>
      </select>
      </div>
    </div>
  );
};

export default SearchBar;
