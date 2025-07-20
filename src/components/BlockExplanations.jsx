import {
  Box,
  Divider,
  Fab,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import * as Blockly from "blockly";
import { darkTheme, lightTheme } from "../appTheme";
import { Description, QuestionMark } from "@mui/icons-material";
import { useEffect, useState } from "react";
import blockDescriptions from "../data/blockExplantions";
import { Link } from "react-router-dom";

const WINDOW_SIZE = 550;

const BlockExplantions = ({ isDarkMode, workspaceRef }) => {
  const [currentBlock, setCurrentBlock] = useState(null);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const handleChange = (event) => {
      if (event.type === Blockly.Events.SELECTED) {
        const block = workspace.getBlockById(event.newElementId);

        if (block) {
          setCurrentBlock(block);
        }
      }
    };

    workspace.addChangeListener(handleChange);

    return () => workspace.removeChangeListener(handleChange);
  }, [workspaceRef]);

  return (
    <Box>
      <Stack direction="row-reverse" sx={{ paddingY: 1 }}>
        <Box
          sx={{
            height: "100%",
            zIndex: 1,
          }}
        >
          <Stack direction="row" gap={1}>
            <Tooltip title="Open R documentation web page">
              <IconButton
                id="openRDocumentationButton"
                component="a"
                href="https://www.rdocumentation.org"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  "&:hover": {
                    bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                  },
                }}
              >
                <Description />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open the tutorials page">
              <Link to="/tutorials">
                <IconButton
                  id="openTutorial"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    "&:hover": {
                      bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
                    },
                  }}
                >
                  <QuestionMark />
                </IconButton>
              </Link>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
      <Box
        sx={{
          position: "relative",
          borderRadius: "5px",
          height: WINDOW_SIZE,
          bgcolor: theme.palette.background.paper,
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            color: isDarkMode ? "#FFFFFA" : "#000000",
            padding: 3,
            fontSize: "0.8rem",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          <Box>
            <Typography variant="h6">Information about the block</Typography>
            <Divider
              sx={{ backgroundColor: theme.palette.primary.main, height: 2 }}
            />
            <Box sx={{ m: 1.5 }}>
              {currentBlock ? (
                <>
                  <Stack direction="row" sx={{ mt: 1 }} alignItems="center">
                    <Typography
                      variant="subtitle1"
                      sx={{ mr: 1, minWidth: "6em" }}
                    >
                      Block-type:
                    </Typography>
                    <Typography fontWeight="bold">
                      {currentBlock.type}
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ mt: 1 }} alignItems="center">
                    <Typography
                      variant="subtitle1"
                      sx={{ mr: 1, minWidth: "6em" }}
                    >
                      Functions:
                    </Typography>
                    <Typography fontWeight="bold">
                      {Array.isArray(
                        blockDescriptions[currentBlock.type]?.functions
                      ) &&
                      blockDescriptions[currentBlock.type].functions.length > 0
                        ? blockDescriptions[currentBlock.type].functions.join(
                            ", "
                          )
                        : ""}
                    </Typography>
                  </Stack>

                  <Stack direction="row" sx={{ mt: 1 }} alignItems="baseline">
                    <Typography
                      variant="subtitle1"
                      sx={{ mr: 1, minWidth: "6em" }}
                    >
                      Description:
                    </Typography>
                    <Typography variant="body1">
                      {blockDescriptions[currentBlock.type]?.infoText ||
                        "Für diesen Blocktyp ist noch keine Beschreibung vorhanden."}
                    </Typography>
                  </Stack>
                  {currentBlock.helpUrl ? (
                    <Fab
                      variant="extended"
                      size="medium"
                      component="a"
                      href={currentBlock.helpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        px: 1.5,
                        mt: 1,
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: theme.palette.primary.main,
                          color: isDarkMode ? "#FFFFFA" : "#000000",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Description fontSize="small" />
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                        >
                          Show Documentation
                        </Typography>
                      </Box>
                    </Fab>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Select a block to display a detailed description.
                </Typography>
              )}
            </Box>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default BlockExplantions;
