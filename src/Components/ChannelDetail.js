import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { ChannelCard, Videos } from "./";

const ChannelDetail = () => {
  const { id } = useParams(); //as i mentioned :id during routing in apps
  const [channelDetail, setChannelDetail] = useState([]); //as we are reusing channel card to used 'channelDetail'-state-name same as in feed
  const [vidoes, setVideos] = useState([]);

  //when id changes useEffect will work again..
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);
  console.log(channelDetail);
  console.log(vidoes);

  return (
    <Box minHeight="95vh">
      {/* below box is used to show the gradient effect in details section */}
      <Box>
        <div
          style={{
            background: "linear-gradient(to right, #8e2de2, #4a00e0)",
            zIndex: 9,
            height: "300px",
          }}
        />

        {/* here we reused this channel card and here
         we passing marginTop as prop so that this margin top and width ..
         ...will be applied to Card Component in Channeldetail component only not in feed  */}
        <ChannelCard
          channelDetail={channelDetail}
          marginTop="-150px"
          width="100%"
        />
        <Box display="flex" p={2}>
          <Videos videos={vidoes} gap="30px" />
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
