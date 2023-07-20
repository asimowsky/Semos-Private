import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingLayout } from "../../components/Layout/Shopping/ShoppingLayout";
import axios from "axios";

export const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8085/api/events?search=${searchQuery}`
        );
        const results = response.data;
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div>
      <ShoppingLayout
        heading={`Search Results for : ${searchQuery}`}
        selectedCards={searchResults || []}
        callGetTickets={true}
      />
    </div>
  );
};
