import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`search/${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="search-bar"
        placeholder="Search videos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton
        type="submit"
        sx={{
          color: "rgba(255,255,255,0.6)",
          mr: 0.5,
          "&:hover": { color: "#ff0000", background: "rgba(255,0,0,0.1)" },
          transition: "all 0.2s ease",
        }}
      >
        <Search fontSize="small" />
      </IconButton>
    </form>
  );
};

export default SearchBar;
