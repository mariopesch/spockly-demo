import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { useState } from "react";

const DownloadCodeDialog = ({
  openDownloadDialog,
  handleCloseDownloadDialog,
  code,
}) => {
  const theme = useTheme();
  const [fileName, setFileName] = useState("MyNewSpocklyProject");

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.R`;
    a.click();

    URL.revokeObjectURL(url);

    handleCloseDownloadDialog();
  };

  return (
    <Dialog open={openDownloadDialog} onClose={handleCloseDownloadDialog}>
      <DialogTitle
        fontWeight="bold"
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Download R File
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          height: "30vh",
          width: "55vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Stack spacing={4} sx={{ paddingY: 2 }}>
          <Typography fontWeight="bold" gutterBottom>
            Please name your R File
          </Typography>
          <TextField
            id="fileNameInput"
            fullWidth
            defaultValue="MyNewSpocklyProject"
            onChange={(e) => setFileName(e.target.value)}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            <Fab
              size="small"
              variant="extended"
              onClick={handleCloseDownloadDialog}
              sx={{
                boxShadow: "none",
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                },
              }}
            >
              <Typography fontWeight="bold">Cancel</Typography>
            </Fab>
            <Fab
              size="small"
              variant="extended"
              onClick={handleDownloadCode}
              sx={{
                boxShadow: "none",
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Download fontSize="small" />
                <Typography fontWeight="bold">Download</Typography>
              </Box>
            </Fab>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadCodeDialog;
