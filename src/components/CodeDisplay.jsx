import { Box, Fab, Stack, Typography } from "@mui/material";
import { darkTheme, lightTheme } from "./../appTheme";
import { PlayArrow } from "@mui/icons-material";

const CodeDisplay = ({ code, isDarkMode }) => {
  const theme = isDarkMode ? darkTheme : lightTheme;

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
          Code
        </Typography>

        <Fab
          size="small"
          variant="extended"
          sx={{
            left: 20,
            width: "120px",
            bgcolor: "#00c853",
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: "#05A255",
            },
            boxShadow: "none",
          }}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <PlayArrow fontSize="small" />
            <Typography fontWeight="bold">Generate</Typography>
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
          {">>"} {code || "Generated R code will appear here..."}
        </Typography>
      </Box>
    </Box>
  );
};

export default CodeDisplay;
