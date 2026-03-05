import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
      setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      {/* Sidebar */}
      <Box
        sx={{
          overflowY: "auto",
          height: { xs: "auto", md: "calc(100vh - 65px)" },
          width: { md: "210px" },
          flexShrink: 0,
          borderRight: { md: "1px solid rgba(255,255,255,0.07)" },
          backgroundColor: "#0a0a0a",
          px: { xs: 0.5, md: 1 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      {/* Main Feed */}
      <Box
        p={{ xs: 1.5, md: 2.5 }}
        sx={{
          overflowY: "auto",
          height: { md: "calc(100vh - 65px)" },
          flex: 1,
          backgroundColor: "#0f0f0f",
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
            {selectedCategory === "New" ? "🔥 " : ""}
            <span style={{ color: "rgba(255,255,255,0.85)" }}>
              {selectedCategory}
            </span>{" "}
            <span className="gradient-text">Videos</span>
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
          <Typography sx={{ color: "rgba(255,255,255,0.4)", mt: 4, textAlign: "center" }}>
            Loading...
          </Typography>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
