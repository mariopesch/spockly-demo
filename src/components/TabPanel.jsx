import React from "react";
import { Box } from "@mui/material";

export default function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ flex: 1, padding: "16px" }}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
