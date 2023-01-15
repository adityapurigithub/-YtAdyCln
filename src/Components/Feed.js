import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";

const Feed = () => {
  const [selectedCateogry, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCateogry}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectedCateogry]);
  //setting stack direction for xs means on Xtra small-usuall devices  and md means medium
  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      {/*Below Box-- used box for sidebar */}

      <Box
        sx={{
          overflowY: "auto",
          height: { xs: "", md: "89vh" },
          width: { md: "220px" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 1, md: 1 }, //padding x-axis --horizontal
        }}
      >
        <Sidebar
          selectedCategory={selectedCateogry}
          setSelectedCategory={setSelectedCategory}
        />
        {/* typography used for text element
        <Typography
          className="copyright"
          variant="body2"
          mt={{ sm: 25 }}
          sx={{
            color: "#fff",
            px: "10px",
          }}
        >
          Copyright@2023-4D1ty4
        </Typography> */}
      </Box>

      {/*this box is used for main feed  */}
      <Box p={1.5} sx={{ overflowY: "auto", height: "83vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{
            color: "white",
          }}
        >
          <span>{selectedCateogry} </span>
          <span style={{ color: "#fc1503" }}>Video</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
