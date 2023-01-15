import React from "react";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { logo } from "../utils/constants";
import { fontSize } from "@mui/system";
const Navbar = () => {
  return (
    <div>
      {/* About Stack -> Documentation....p means padding ,sx is used for providing syling to mui component */}
      <Stack
        direction="row"
        alignItems="center"
        p="2"
        sx={{
          postion: "sticky",
          top: "0",
          p: "10px",
          backgroundColor: "#000",
          justifyContent: "space-between",
          borderBottom: "1px solid #3d3d3d",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <img
            src="https://www.freeiconspng.com/thumbs/youtube-logo-png/hd-youtube-logo-png-transparent-background-20.png"
            alt="logo"
            height="40px"
          />
          <Typography
            variant="h6"
            color="red"
            fontWeight="bold"
            fontStyle="italic"
            letterSpacing="2px"
          >
            Y
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: "12px",
                color: "whitesmoke",
              }}
            >
              ou
            </span>
            T
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: "12px",
                color: "whitesmoke",
              }}
            >
              ube
            </span>
          </Typography>
        </Link>
        <SearchBar />
      </Stack>
    </div>
  );
};

export default Navbar;
