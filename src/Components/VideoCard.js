import React from "react";
import { Link } from "react-router-dom";
import { Typography, CardContent, CardMedia, Box } from "@mui/material";
import { CheckCircle, PlayArrow } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({ video }) => {
  const {
    id: { videoId },
    snippet,
  } = video;

  return (
    <Box
      className="video-card-wrap"
      sx={{
        width: { xs: "100%", sm: "320px" },
        borderRadius: "14px",
        overflow: "hidden",
        background: "#161616",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
          borderColor: "rgba(255,0,0,0.25)",
        },
        "&:hover .play-icon": {
          opacity: 1,
          transform: "scale(1)",
        },
        "&:hover .play-overlay": {
          background: "rgba(0,0,0,0.25)",
        },
        "&:hover .thumbnail-img": {
          transform: "scale(1.04)",
        },
      }}
    >
      {/* Thumbnail */}
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            className="thumbnail-img"
            image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
            alt={snippet?.title}
            sx={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.4s ease",
            }}
          />
          {/* Play overlay */}
          <Box
            className="play-overlay"
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              transition: "background 0.3s ease",
            }}
          >
            <Box
              className="play-icon"
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,0,0,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transform: "scale(0.7)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <PlayArrow sx={{ color: "#fff", fontSize: 22 }} />
            </Box>
          </Box>
        </Box>
      </Link>

      {/* Card Content */}
      <CardContent
        sx={{
          px: 1.5,
          py: 1.2,
          "&:last-child": { pb: 1.5 },
        }}
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "13.5px",
              lineHeight: 1.4,
              mb: 0.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 0.2s ease",
              "&:hover": { color: "#ff4e4e" },
            }}
          >
            {snippet?.title}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet.channelId}`
              : demoVideoUrl
          }
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "color 0.2s ease",
              "&:hover": { color: "rgba(255,255,255,0.65)" },
            }}
          >
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }} />
          </Typography>
        </Link>
      </CardContent>
    </Box>
  );
};

export default VideoCard;
