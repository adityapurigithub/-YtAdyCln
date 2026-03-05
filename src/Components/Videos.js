import React from "react";
import { Stack, Box } from "@mui/system";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, gap, direction }) => {
  if (!videos || videos.length === 0) return null;

  // Separate channels and videos so channels appear first
  const channels = videos.filter((item) => item.id.channelId);
  const videoItems = videos.filter((item) => item.id.videoId);

  return (
    <Stack
      direction={direction || "row"}
      flexWrap={direction === "column" ? "nowrap" : "wrap"}
      justifyContent={direction === "column" ? "flex-start" : "center"}
      alignItems={direction === "column" ? "stretch" : "flex-start"}
      gap={gap || 2}
    >
      {/* Render Channels First */}
      {channels.map((item, idx) => (
        <Box key={`channel-${idx}`}>
          <ChannelCard channelDetail={item} />
        </Box>
      ))}

      {/* Render Videos Second */}
      {videoItems.map((item, idx) => (
        <Box key={`video-${idx}`}>
          <VideoCard video={item} />
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
