import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import TabPanel from "../components/TabPanel";
import TutorialIntroduction from "./tutorials/TutorialIntroduction";
import TutorialWhy from "./tutorials/TutorialWhy";
import TutorialWho from "./tutorials/TutorialWho";
import TutorialHow from "./tutorials/TutorialHow";
import TutorialExample from "./tutorials/TutorialExample";

const tutorialRoutes = [
  { path: "introduction", label: "Introduction" },
  { path: "why", label: "Why use SPOCKLY?" },
  { path: "who", label: "Who is it for?" },
  { path: "how", label: "How to use SPOCKLY?" },
  { path: "example", label: "Example Use Case" },
];

const Tutorials = ({ isDarkMode }) => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          borderRight: 1,
          borderColor: "divider",
          paddingTop: 4,
          paddingLeft: 2,
        }}
      >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          marginBottom: 2,
          paddingLeft: 1,
          color: isDarkMode ? "#FFFFFF" : "#000000",
        }}
      >
        Tutorials
      </Typography>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ 
            style: {
              backgroundColor: isDarkMode ? "#B58FFF" : theme.palette.primary.main, 
              width: "3px",
            },
          }}
          sx={{
            ".MuiTab-root": {
              alignItems: "flex-start",
              textAlign: "left",
              fontSize: "1rem",
              fontWeight: 500,
              opacity: 1,
              textTransform: "none",
              color: isDarkMode ? "#DDD" : "#333",
              paddingY: 1,
              justifyContent: "flex-start",
              minHeight: "auto",
            },
            ".Mui-selected": {
              fontWeight: 600,
              color: theme.palette.primary.main,
            },
          }}
        >
          {tutorialRoutes.map((route, index) => (
            <Tab key={route.path} label={route.label} />
          ))}
        </Tabs>
      </Box>

      {/* Content */}
      <Box
        sx={{
          color: isDarkMode ? "#FFFFFA" : "#000000",
          flexGrow: 1,
          padding: 4,
        }}
      >
        <TabPanel value={value} index={0}>
          <TutorialIntroduction />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TutorialWhy />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TutorialWho />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TutorialHow />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TutorialExample />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Tutorials;
