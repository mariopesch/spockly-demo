import { useTheme } from "@emotion/react";
import { Clear, ContentCopyRounded, Download } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

const FullCodeViewDialog = ({
  code,
  handleOpenDownloadDialog,
  openFullCodeViewDialog,
  handleCopyCode,
  handleCloseFullCodeView,
  isDarkMode,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={openFullCodeViewDialog}
      onClose={handleCloseFullCodeView}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight="bold">Full Code View</Typography>
          <Stack direction="row">
            <Tooltip title="Download Code as R file">
              <IconButton onClick={handleOpenDownloadDialog}>
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Copy Code">
              <IconButton onClick={handleCopyCode}>
                <ContentCopyRounded />
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleCloseFullCodeView}>
              <Clear />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          bgcolor: theme.palette.background.paper,
          height: "60vh",
          overflowY: "auto",
        }}
      >
        <Typography
          component="pre"
          fontWeight="bold"
          sx={{
            color: isDarkMode ? "#FFFFFA" : "#000000",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          {code}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default FullCodeViewDialog;
