import React from "react";
import { Link } from "react-router-dom";

import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoTitle,
  demoVideoUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({ video }) => {
  const {
    id: { videoId },
    snippet,
  } = video;
  console.log(video);
  return (
    <Card
      sx={{
        width: { xs: "350px", md: "320px" },
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          sx={{ width: { xs: "100%", md: "320px" }, height: 200 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1e1e1e", height: "90px" }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {snippet?.title.slice(0, 60) + "..."}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId ? `/channel/${snippet.channelId}` : demoVideoUrl
          }
        >
          <Typography variant="subtitle2" fontWeight="bold" color="lightgray">
            {snippet?.channelTitle}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: 1 }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
