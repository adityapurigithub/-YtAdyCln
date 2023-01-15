import React from "react";
import { Stack, Box } from "@mui/system";
import { VideoCard, ChannelCard } from "./";
const Videos = ({ videos, gap }) => {
  console.log(videos);
  return (
    <Stack
      direction={"row"}
      flexWrap="wrap"
      justifyContent="center"
      gap={gap ? gap : 2}
    >
      {videos.map((item, id) => (
        /*below we will render a video-card if we have a videoId.....
            if we have a channel id then will sow a channel*/
        <Box key={id}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
