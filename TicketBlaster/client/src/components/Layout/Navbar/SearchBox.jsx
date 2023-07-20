import React from "react";
import styles from "./SearchBox.module.css";

export const SearchBox = ({ placeholder, onSearch }) => {
  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.value;
    onSearch(searchQuery);
  };

  return (
    <input
      className={styles.search}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
};
