import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery) {
      //if any search term ..
      navigate(`search/${searchQuery}`);

      setSearchQuery("");
    }
  };
  return (
    <div>
      {/* paper acts as form in this case */}
      <Paper
        className="form"
        component="form"
        // sx={{  in css
        //   borderRadius: 20,
        //   border: "1px solid #e3e3e3",
        //   pl: "2", //padding left
        //   mr: { sm: 5 }, //margin right for small devices...
        //   justifyContent: "center",
        // }}
        onSubmit={handleSubmit}
      >
        <input
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{
            p: "10",
            color: "red",
          }}
        >
          <Search />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchBar;
