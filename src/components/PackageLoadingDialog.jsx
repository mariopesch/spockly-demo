import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  LinearProgress,
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PackageLoadingDialog = ({ open, currentPackage, onClose }) => {
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Loading R packages...
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {currentPackage === "Done!" ? (
          <Typography variant="body1"><strong>All packages loaded successfully!</strong></Typography>
        ) : (
          <Typography variant="body1">
            Currently installing: <strong>{currentPackage || "Initializing..."}</strong>
          </Typography>
        )}
        <LinearProgress sx={{ mt: 2 }} />
      </DialogContent>
    </Dialog>
  );
};

export default PackageLoadingDialog;
