import { CheckCircle } from "@mui/icons-material";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ChannelCard = ({ channelDetail, width, marginTop }) => {
  const channelId = channelDetail?.id?.channelId;
  const thumbnail =
    channelDetail?.snippet?.thumbnails?.high?.url ||
    channelDetail?.snippet?.thumbnails?.default?.url ||
    "";
  const title = channelDetail?.snippet?.title;
  const subCount = channelDetail?.statistics?.subscriberCount;

  return (
    <Box
      sx={{
        width: width || { xs: "100%", sm: "320px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop,
      }}
    >
      <Link to={`/channel/${channelId}`} style={{ width: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            py: 2.5,
            px: 2,
            borderRadius: "14px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition:
              "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 10px 28px rgba(0,0,0,0.4)",
              borderColor: "rgba(255,255,255,0.18)",
            },
          }}
        >
          {/* Avatar — simple, no gradient ring */}
          {thumbnail ? (
            <CardMedia
              component="img"
              image={thumbnail}
              alt={title || "Channel"}
              sx={{
                borderRadius: "50%",
                height: "80px",
                width: "80px",
                objectFit: "cover",
                display: "block",
                border: "2px solid rgba(255,255,255,0.1)",
                mb: 0.5,
              }}
            />
          ) : (
            <Box
              sx={{
                borderRadius: "50%",
                height: "80px",
                width: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                border: "2px solid rgba(255,255,255,0.1)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              {title?.charAt(0)?.toUpperCase() || "?"}
            </Box>
          )}

          {/* Channel Name */}
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "13.5px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              lineHeight: 1.3,
            }}
          >
            {title}
            <CheckCircle
              sx={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}
            />
          </Typography>

          {/* Subscribers */}
          {subCount && (
            <Typography
              sx={{
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11.5px",
              }}
            >
              {parseInt(subCount).toLocaleString()} subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
