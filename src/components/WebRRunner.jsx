// components/WebRRunner.js
import React, { useState, useEffect } from "react";
import { WebR } from "@r-wasm/webr"; // Correct import
import { Box, Fab, Stack, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { darkTheme, lightTheme } from "./../appTheme";
import { lightBlue } from "@mui/material/colors";

const webR = new WebR();

const WebRRunner = ({ code, isDarkMode }) => {
  const [output, setOutput] = useState("Loading WebR...");
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Initialize WebR only once when the component mounts
  useEffect(() => {
    const initWebR = async () => {
      try {
        // Initialize WebR environment
        await webR.init();
        console.log("WebR initialized");
      } catch (err) {
        console.error("WebR initialization failed:", err);
        setOutput(`Error initializing WebR: ${err.message}`);
      }
    };
    initWebR();
  }, []); // Empty dependency array means this runs once on mount

  // Function to run R code
  const runCode = async () => {
    try {
      // Evaluate R code
      const result = await webR.evalR(code);

      // Get the result as an array or another format
      const values = await result.toArray();

      // Update the output state with the result
      setOutput(values.join("\n"));
    } catch (err) {
      // Handle errors gracefully
      setOutput(`Error: ${err.message}`);
      console.error("WebR Error:", err);
    }
  };

  return (
    <Box
      sx={{
        top: 20,
        left: 20,
        right: 20,
        height: "100%",
        borderRadius: "5px",
        zIndex: 1,
      }}
    >
      <Stack direction="row">
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.contrastText,
            paddingBottom: "15px",
          }}
        >
          Output
        </Typography>

        <Fab
          size="small"
          variant="extended"
          sx={{
            left: 20,
            width: "140px",
            bgcolor: "#33bfff",
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: "#00b0ff",
            },
            boxShadow: "none",
          }}
          onClick={runCode}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Run R Code</Typography>
          </Box>
        </Fab>
      </Stack>

      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          width: "100%",
          height: "75%",
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            color: isDarkMode ? "#FFFFFA" : "#000000",
            paddingBottom: "10px",
            padding: "20px",
          }}
        >
          {output}
        </Typography>
      </Box>
    </Box>
  );
};

export default WebRRunner;
