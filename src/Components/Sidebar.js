import React from "react";
import { categories } from "../utils/constants";
import { Stack } from "@mui/system";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  console.log(selectedCategory);

  return (
    <Stack
      direction="row"
      sx={{
        height: { md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          style={{
            backgroundColor: category.name === selectedCategory && "#fc1503",
          }}
          key={category.name}
          onClick={() => setSelectedCategory(category.name)}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "#fc1503",
            }}
          >
            {category.icon}{" "}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.7",
            }}
          >
            {" "}
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;
