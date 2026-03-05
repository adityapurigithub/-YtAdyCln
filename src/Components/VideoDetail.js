import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { Typography, Box, Stack, Chip } from "@mui/material";
import { CheckCircle, ThumbUp, Visibility } from "@mui/icons-material";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constants";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch main video details
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setVideoDetail(data.items[0]);

        // Use channel title from the video to fetch related videos (more reliable than relatedToVideoId)
        const channelTitle = data.items[0]?.snippet?.channelTitle;
        const query = channelTitle || "trending";
        return fetchFromAPI(`search?part=snippet&q=${query}&type=video`);
      })
      .then((data) => setVideos(data?.items || []))
      .catch((err) => {
        console.error("Error fetching related videos:", err);
        setVideos([]);
      });
  }, [id]);

  if (!videoDetail?.snippet) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          color: "rgba(255,255,255,0.35)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "15px",
          letterSpacing: "0.5px",
        }}
      >
        Loading…
      </Box>
    );
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box sx={{ overflowY: "auto", height: "calc(100vh - 65px)", backgroundColor: "#0f0f0f" }}>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        gap={0}
        sx={{ minHeight: "100%" }}
      >
        {/* ── Left: Player + Info ── */}
        <Box flex={1} sx={{ minWidth: 0 }}>
          {/* Sticky player wrapper */}
          <Box sx={{ position: { lg: "sticky" }, top: 0 }}>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#000",
                borderRadius: { lg: "0 0 12px 0" },
                overflow: "hidden",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
              />
            </Box>

            {/* Info below player */}
            <Box sx={{ px: { xs: 2, md: 3 }, py: 2, backgroundColor: "#0f0f0f" }}>
              {/* Title */}
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "15px", md: "18px" },
                  lineHeight: 1.4,
                  mb: 2,
                }}
              >
                {title}
              </Typography>

              {/* Channel row + stats */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                gap={1.5}
                sx={{
                  pb: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Channel */}
                <Link to={`/channel/${channelId}`}>
                  <Stack direction="row" alignItems="center" gap={1.2}>
                    <Box
                      component="img"
                      src={demoProfilePicture}
                      alt="channel"
                      sx={{
                        borderRadius: "50%",
                        height: 40,
                        width: 40,
                        objectFit: "cover",
                        border: "2px solid rgba(255,255,255,0.15)",
                        transition: "border-color 0.3s ease",
                        "&:hover": { borderColor: "#ff0000" },
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#fff",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        "&:hover": { color: "#ff4e4e" },
                        transition: "color 0.2s ease",
                      }}
                    >
                      {channelTitle}
                      <CheckCircle sx={{ fontSize: 13, color: "#888" }} />
                    </Typography>
                  </Stack>
                </Link>

                {/* Stats */}
                <Stack direction="row" gap={1.5}>
                  <Chip
                    icon={<ThumbUp sx={{ fontSize: 14, color: "#ff4e4e !important" }} />}
                    label={`${parseInt(likeCount).toLocaleString()} Likes`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,78,78,0.12)",
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,78,78,0.2)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                    }}
                  />
                  <Chip
                    icon={<Visibility sx={{ fontSize: 14, color: "#4e9fff !important" }} />}
                    label={`${parseInt(viewCount).toLocaleString()} Views`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(78,159,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(78,159,255,0.2)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* ── Right: Related Videos ── */}
        <Box
          sx={{
            width: { lg: "370px" },
            flexShrink: 0,
            overflowY: { lg: "auto" },
            height: { lg: "calc(100vh - 65px)" },
            px: 2,
            py: 2,
            backgroundColor: "#0a0a0a",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Up Next
          </Typography>
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
