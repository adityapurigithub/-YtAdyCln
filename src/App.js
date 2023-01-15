import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import {
  VideoDetail,
  Navbar,
  Feed,
  SearchFeed,
  ChannelDetail,
  Err404,
} from "./Components";

function App() {
  return (
    <div className="App">
      <Router>
        <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Feed />} />

            <Route path="/video/:id" element={<VideoDetail />} />

            <Route path="/channel/:id" element={<ChannelDetail />} />

            <Route path="/search/:searchQuery" element={<SearchFeed />} />

            <Route path="*" element={<Err404 />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
