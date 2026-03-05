import React from "react";
import { categories } from "../utils/constants";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Stack
      direction="row"
      sx={{
        height: { md: "100%" },
        flexDirection: { md: "column" },
        gap: { xs: 0.5, md: 0.5 },
        pt: { md: 2 },
        pb: { md: 2 },
      }}
    >
      {categories.map((category) => {
        const isActive = category.name === selectedCategory;
        return (
          <button
            className={`category-btn${isActive ? " active" : ""}`}
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
          >
            <span
              style={{
                display: "flex",
                fontSize: "18px",
                color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                transition: "color 0.25s ease",
              }}
            >
              {category.icon}
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                transition: "all 0.25s ease",
              }}
            >
              {category.name}
            </span>
          </button>
        );
      })}

      <Typography
        variant="body2"
        sx={{
          color: "rgba(255,255,255,0.2)",
          px: 1.5,
          mt: "auto",
          pt: 3,
          fontSize: "11px",
          display: { xs: "none", md: "block" },
        }}
      >
        © 2024 YT Clone
      </Typography>
    </Stack>
  );
};

export default Sidebar;
