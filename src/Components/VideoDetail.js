import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { Typography, Box, Stack, CardMedia } from "@mui/material";
import { checkCicrle, CheckCircle } from "@mui/icons-material";

import { Video, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constants";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVidoes] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVidoes(data.items)
    );
  }, [id]);
  console.log(videoDetail);

  if (!videoDetail || !videos) {
    return "Loading...";
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box maxHeight="89vh" sx={{ overflowY: "auto" }}>
      <Stack direction={{ xs: "col" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "75px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography variant="h5" color="#FFF" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              py={1}
              px={2}
              color="white"
            >
              <Link to={`/channel/${channelId}`}>
                <Stack direction="row" alignItems="center">
                  <CardMedia
                    image={demoProfilePicture}
                    alt="channel"
                    sx={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      ":hover": {
                        boxShadow: "1px 2px 3px 2px rgba(255,255,255,0.5)",
                      },
                    }}
                  />
                  <Typography
                    variant={{ sm: "subtitle1", md: "h6" }}
                    color="#FFF"
                    fontWeight="bold"
                    p={1}
                  >
                    {channelTitle}
                    <CheckCircle
                      sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                    />
                  </Typography>
                </Stack>
              </Link>
              <Stack direction="row" gap="20px">
                <Typography variant="body1" sx={{ opacity: "0.8" }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
                <Typography variant="body1" sx={{ opacity: "0.8" }}>
                  {parseInt(viewCount).toLocaleString()} Views
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} marginLeft="150px" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
