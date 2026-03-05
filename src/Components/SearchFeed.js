import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Box, Typography } from "@mui/material";
import { Videos } from "./";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchFromAPI(`search?part=snippet&q=${searchQuery}`).then((data) => {
      setVideos(data.items);
      setLoading(false);
    });
  }, [searchQuery]);

  return (
    <Box
      p={{ xs: 1.5, md: 2.5 }}
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 65px)",
        backgroundColor: "#0f0f0f",
        flex: 2,
      }}
    >
      {/* Heading */}
      <Box mb={3} className="fade-up">
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.3px",
          }}
        >
          Results for{" "}
          <span className="gradient-text">"{searchQuery}"</span>
        </Typography>
        <Box
          sx={{
            mt: 1,
            height: "2px",
            width: "60px",
            background: "linear-gradient(90deg, #ff0000, transparent)",
            borderRadius: "2px",
          }}
        />
      </Box>

      {loading ? (
        <Typography
          sx={{
            color: "rgba(255,255,255,0.35)",
            mt: 6,
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Searching…
        </Typography>
      ) : (
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default SearchFeed;
