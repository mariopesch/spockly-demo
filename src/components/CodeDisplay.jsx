import {
	Alert,
	Box,
	Fab,
	IconButton,
	Snackbar,
	Stack,
	Tooltip,
	Typography,
	useTheme,
  } from "@mui/material";
  import {
	ContentCopyRounded,
	Download,
	Fullscreen,
	PlayArrow,
	RestartAlt,
  } from "@mui/icons-material";
  import * as Blockly from "blockly/core";
  import { useState } from "react";
  import FullCodeViewDialog from "./FullCodeViewDialog";
  import DownloadCodeDialog from "./DownloadCodeDialog";
  import MiniPackageLoadingBar from "./MiniPackageLoadingBar";
  
  const CODE_DISPLAY_SIZE = 550;
  
  const CodeDisplay = ({ code, setCode, workspaceRef, isDarkMode, currentPackage }) => {
	const theme = useTheme();
	const [openFullCodeViewDialog, setOpenFullCodeViewDialog] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false);
	const [openDownloadDialog, setOpenDownloadDialog] = useState(false);
  
	const handleOpenFullCodeView = () => setOpenFullCodeViewDialog(true);
	const handleCloseFullCodeView = () => setOpenFullCodeViewDialog(false);
	const handleOpenDownloadDialog = () => setOpenDownloadDialog(true);
	const handleCloseDownloadDialog = () => setOpenDownloadDialog(false);
  
	const handleGenerateCode = () => {
	  if (!workspaceRef.current) {
		console.error("Blockly workspace is not initialized.");
		return;
	  }
	  let rCode = Blockly.Generator.R.workspaceToCode(workspaceRef.current);
	  if (rCode && rCode.trim() !== "") {
		const formattedRCode = Blockly.Generator.R.formatCode(rCode);
		setCode(formattedRCode);
	  } else {
		setCode("No R code could be generated from the current workspace.");
	  }
	};
  
	const handleResetCode = () => {
	  setCode("Generated R code will appear here...");
	};
  
	const handleCopyCode = async () => {
	  try {
		await navigator.clipboard.writeText(code);
		setCopySuccess(true);
	  } catch (err) {
		console.error("Copy failed:", err);
	  }
	};
  
	return (
	  <Box
		sx={{
		  height: "100%",
		  borderRadius: 4,
		  zIndex: 1,
		}}
	  >
		<Snackbar
		  open={copySuccess}
		  autoHideDuration={2000}
		  onClose={() => setCopySuccess(false)}
		  anchorOrigin={{ vertical: "top", horizontal: "center" }}
		>
		  <Alert severity="success" sx={{ width: "100%" }}>
			Code copied to clipboard!
		  </Alert>
		</Snackbar>
		<Stack direction="row-reverse" sx={{ paddingY: 1 }}>
		  <Box
			sx={{
			  height: "100%",
			  zIndex: 1,
			}}
		  >
			<Stack direction="row" gap={1}>
			  <Box
				sx={{
				  width: "100%",
				  display: "flex",
				  justifyContent: "flex-start",
				}}
			  >
				<Tooltip title="Generate R Code">
				  <IconButton
					id="generateCodeButton"
					onClick={handleGenerateCode}
					sx={{
					  bgcolor: "#00c853",
					  color: theme.palette.primary.contrastText,
					  "&:hover": {
						bgcolor: "#009B3A",
					  },
					}}
				  >
					<PlayArrow />
				  </IconButton>
				</Tooltip>
			  </Box>
			  <Tooltip title="Download Code as R file">
				<IconButton
				  id="downloadCodeButton"
				  onClick={handleOpenDownloadDialog}
				  sx={{
					backgroundColor: theme.palette.primary.light,
					"&:hover": {
					  bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
					},
				  }}
				>
				  <Download />
				</IconButton>
			  </Tooltip>
			  <Tooltip title="Copy Code">
				<IconButton
				  id="copyCodeButton"
				  onClick={handleCopyCode}
				  sx={{
					backgroundColor: theme.palette.primary.light,
					"&:hover": {
					  bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
					},
				  }}
				>
				  <ContentCopyRounded />
				</IconButton>
			  </Tooltip>
			  <Tooltip title="Reset Code">
				<IconButton
				  id="resetCodeButton"
				  onClick={handleResetCode}
				  sx={{
					backgroundColor: theme.palette.primary.light,
					"&:hover": {
					  bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
					},
				  }}
				>
				  <RestartAlt />
				</IconButton>
			  </Tooltip>
			  <Tooltip title="Full Code View">
				<IconButton
				  id="fullSizeButton"
				  onClick={handleOpenFullCodeView}
				  sx={{
					backgroundColor: theme.palette.primary.light,
					"&:hover": {
					  bgcolor: isDarkMode ? "#835ACC" : "#CCAD33",
					},
				  }}
				>
				  <Fullscreen />
				</IconButton>
			  </Tooltip>
			</Stack>
		  </Box>
		</Stack>
		<Box
		  sx={{
			position: "relative",
			borderRadius: "5px",
			height: CODE_DISPLAY_SIZE,
			bgcolor: theme.palette.background.paper,
			zIndex: 1,
			overflowY: "auto",
		  }}
		>
		  <Typography
			sx={{
			  color: isDarkMode ? "#FFFFFA" : "#000000",
			  padding: 3,
			  fontSize: '0.8rem',
			  whiteSpace: "pre-wrap",
			  fontFamily: "monospace",
			}}
		  >
			{code}
		  </Typography>
		  <MiniPackageLoadingBar currentPackage={currentPackage} />
		</Box>
		<FullCodeViewDialog
		  code={code}
		  openFullCodeViewDialog={openFullCodeViewDialog}
		  handleOpenDownloadDialog={handleOpenDownloadDialog}
		  handleCopyCode={handleCopyCode}
		  handleCloseFullCodeView={handleCloseFullCodeView}
		  isDarkMode={isDarkMode}
		/>
		<DownloadCodeDialog
		  code={code}
		  openDownloadDialog={openDownloadDialog}
		  handleCloseDownloadDialog={handleCloseDownloadDialog}
		/>
	  </Box>
	);
  };
  
  export default CodeDisplay;
  