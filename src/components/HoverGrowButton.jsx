import React from "react";
import { Box, Typography } from "@mui/material";

export default function HoverGrowIcon({ icon, text }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Box
        sx={{
          height: 60,
          width: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "transform 0.3s ease",
        }}
      >
        {icon}
      </Box>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
}
