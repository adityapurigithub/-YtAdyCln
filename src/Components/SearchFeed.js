import React, { useEffect, useState } from "react";

import { fetchFromAPI } from "../utils/fetchFromAPI";

import { Box, Typography } from "@mui/material";

import { Videos, Vidoes } from "./";
import { useParams } from "react-router-dom";
const SearchFeed = () => {
  // const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const { searchQuery } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchQuery}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchQuery]);
  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeigth="bold" mb={2} sx={{ color: "white" }}>
        Showing Search Result For:
        <span style={{ color: "#f31503" }}> {searchQuery}</span> Videos
      </Typography>

      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
