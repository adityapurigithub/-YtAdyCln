import { CheckCircle } from "@mui/icons-material";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, width, marginTop }) => {
  return (
    <Box
      sx={{
        width: width ? width : { xs: "320px" },
        height: "320px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop,
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "lightgray",
          }}
        >
          <CardMedia
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={channelDetail?.snippet?.title}
            sx={{
              borderRadius: "50%",
              height: "200px",
              width: "200px",
            }}
          />
          <Typography variant="h6">
            {channelDetail?.snippet?.title}
            <CheckCircle
              sx={{
                height: 12,
                ml: "2px",
              }}
            />
          </Typography>

          {/* below it will not work in 'feed' but it will work in 'details section'...
          we will get stats on profile page..
          */}
          {channelDetail?.statistics?.subscriberCount && (
            <Typography variant="subtitle3">
              {parseInt(
                channelDetail?.statistics?.subscriberCount
              ).toLocaleString()}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
