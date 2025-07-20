import { useState, useRef } from "react";
import BlocklyComponent from "./BlocklyComponent";
import CodeDisplay from "./CodeDisplay";
import { Card, Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { darkTheme, lightTheme } from "./../appTheme";
import WebRRunner from "./WebRRunner";
import FileUploadManager from "./FileUploadManager";
import { MdOutlineOutput } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import useSpocklyTour from "./useSpocklyTour";
import MiniPackageLoadingBar from "./MiniPackageLoadingBar";
import BlockExplantions from "./BlockExplanations";
import { FaHandsHelping } from "react-icons/fa";

function TabPanel({ children, value, index }) {
  return (
    <div
      hidden={value !== index}
      role="tabpanel"
      style={{
        height: "100%",
        display: value === index ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, height: "100%" }}>{children}</Box>
    </div>
  );
}

export default function SPOCKLY({ isDarkMode }) {
  const [code, setCode] = useState("Generated R code will appear here...");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [currentPackage, setCurrentPackage] = useState("");
  const webRRef = useRef(null);
  const workspaceRef = useRef(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useSpocklyTour();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleUploadClick = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadClose = () => {
    setUploadDialogOpen(false);
  };

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
              borderRadius: 4,
              backgroundColor: theme.palette.primary.main,
              height: "85%",
              boxShadow: 3,
            }}
          >
            <BlocklyComponent
              setCode={setCode}
              isDarkMode={isDarkMode}
              onUploadClick={handleUploadClick}
              workspaceRef={workspaceRef}
            />
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
              position: "relative",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                padding: 1,
                backgroundColor: theme.palette.background.default,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Tab
                id="helpTab"
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <FaHandsHelping /> Help
                  </Box>
                }
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? "lightgrey" : "darkgrey",
                  textTransform: "none",
                }}
              />
              <Tab
                id="codeTab"
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <FaCode /> Code
                  </Box>
                }
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? "lightgrey" : "darkgrey",
                  textTransform: "none",
                }}
              />
              <Tab
                id="outputTab"
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <MdOutlineOutput /> Output
                  </Box>
                }
                sx={{
                  fontWeight: "bold",
                  color: isDarkMode ? "lightgrey" : "darkgrey",
                  textTransform: "none",
                }}
              />
              <Box sx={{ marginLeft: "auto", marginRight: "50px" }}>
                <MiniPackageLoadingBar currentPackage={currentPackage} />
              </Box>
            </Tabs>
            <TabPanel value={value} index={0}>
              <Box sx={{ height: "60%", p: 1 }}>
                <BlockExplantions
                  isDarkMode={isDarkMode}
                  workspaceRef={workspaceRef}
                />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ height: "60%", p: 1 }}>
                <CodeDisplay
                  code={code}
                  setCode={setCode}
                  isDarkMode={isDarkMode}
                  workspaceRef={workspaceRef}
                />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Box sx={{ height: "60%", p: 1 }}>
                <WebRRunner
                  code={code}
                  isDarkMode={isDarkMode}
                  webRRef={webRRef}
                  setCurrentPackage={setCurrentPackage}
                />
              </Box>
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
      <FileUploadManager
        webRInstance={webRRef.current}
        isDarkMode={isDarkMode}
        open={uploadDialogOpen}
        onClose={handleUploadClose}
      />
    </Box>
  );
}
