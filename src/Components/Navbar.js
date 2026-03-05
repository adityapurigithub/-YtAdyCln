import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        px: { xs: 2, md: 3 },
        py: 1.5,
        backgroundColor: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        {/* YouTube icon SVG inline — no broken external image */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          viewBox="0 0 24 24"
          fill="#ff0000"
        >
          <path d="M21.58 7.19a2.75 2.75 0 0 0-1.93-1.94C18.01 4.75 12 4.75 12 4.75s-6.01 0-7.65.5A2.75 2.75 0 0 0 2.42 7.19C1.93 8.84 1.93 12 1.93 12s0 3.16.49 4.81a2.75 2.75 0 0 0 1.93 1.94c1.64.5 7.65.5 7.65.5s6.01 0 7.65-.5a2.75 2.75 0 0 0 1.93-1.94c.49-1.65.49-4.81.49-4.81s0-3.16-.49-4.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
        </svg>

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "20px",
            letterSpacing: "-0.5px",
            color: "#fff",
          }}
        >
          You<span style={{ color: "#ff0000" }}>Tube</span>
        </span>
      </Link>

      <SearchBar />
    </Stack>
  );
};

export default Navbar;
