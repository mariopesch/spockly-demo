import React from "react";
import { LinearProgress, Typography, Box } from "@mui/material";

const MiniPackageLoadingBar = ({ currentPackage }) => {
  return (
    <Box sx={{ width: '50%', padding: 1, margin: 'auto' }}>
      {currentPackage ? (
        <>
          <Typography variant="caption" color="textSecondary">
            Loading R Package: <strong>{currentPackage}</strong>
          </Typography>
          <LinearProgress />
        </>
      ) : (
        <Typography variant="caption" color="textSecondary">
        </Typography>
      )}
    </Box>
  );
};

export default MiniPackageLoadingBar;
