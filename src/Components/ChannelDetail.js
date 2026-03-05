import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { ChannelCard, Videos } from "./";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: "#0a0a0a" }}>
      {/* Banner */}
      <Box
        sx={{
          height: "220px",
          background: "linear-gradient(135deg, #1a0533 0%, #1a0000 40%, #0a0a1a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle pattern overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, rgba(136,0,0,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(50,0,120,0.25) 0%, transparent 60%)",
          }}
        />
      </Box>

      {/* Channel Card — overlaps the banner */}
      <ChannelCard
        channelDetail={channelDetail}
        marginTop="-110px"
        width="100%"
      />

      {/* Videos */}
      <Box sx={{ px: { xs: 1.5, md: 3 }, pb: 4 }}>
        {videos.length > 0 ? (
          <>
            <Typography
              variant="subtitle2"
              sx={{
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Latest Videos
            </Typography>
            <Videos videos={videos} gap="20px" />
          </>
        ) : (
          <Typography sx={{ color: "rgba(255,255,255,0.3)", mt: 4, textAlign: "center" }}>
            Loading videos…
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
