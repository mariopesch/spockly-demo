import { useState } from "react";
import BlocklyComponent from "./BlocklyComponent";
import CodeDisplay from "./CodeDisplay";
import {Card, Box, Grid } from "@mui/material";
import { darkTheme, lightTheme } from "./../appTheme";
import WebRRunner from "./WebRRunner";

function SPOCKLY({isDarkMode}) {
  const [code, setCode] = useState("");
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Grid
        container
        sx={{
          flexGrow: 1,
          height: "100vh",
        }}
      >
        <Grid size={6} sx={{ height: "100%" }}>
          <Card
            sx={{
              m: 2,
              p: 2,
              borderRadius: "16px",
              backgroundColor: theme.palette.primary.main,
              height: "85%",
              boxShadow: 3,
            }}
          >
            <BlocklyComponent setCode={setCode} isDarkMode={isDarkMode} />
          </Card>
        </Grid>

        <Grid
          size={6}
          sx={{
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Card
            sx={{
              m: 2,
              p: 2,
              borderRadius: "16px",
              backgroundColor: theme.palette.primary.main,
              height: "85%",
              boxShadow: 3,
              position: "relative",
            }}
          >
            <Box sx={{ height: "50%", p: 2 }}>
              <CodeDisplay code={code} isDarkMode={isDarkMode} />
            </Box>
            <Box sx={{ height: "50%", p: 2 }}>
              <WebRRunner code={code} isDarkMode={isDarkMode} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SPOCKLY;
