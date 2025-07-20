import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Typography, Fab } from "@mui/material";
import { Rocket, ImportContacts } from "@mui/icons-material";
import { FaGlobe, FaCube, FaCodeBranch, FaCompass } from "react-icons/fa";
import logo from "../assets/spockly_logo.png";
import { useTheme } from "@emotion/react";
import HoverGrowButton from "../components/HoverGrowButton";

const sectionBoxStyle = (theme, isDarkMode) => ({
  width: "100%",
  backgroundColor: isDarkMode
    ? theme.palette.background.default
    : theme.palette.background.paper,
});

const centeredFlexColumn = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const buttonWrapperStyle = (theme, isDarkMode) => ({
  padding: 5,
  backgroundColor: isDarkMode
    ? theme.palette.background.default
    : theme.palette.background.paper,
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  flexWrap: "wrap",
});

const infoBoxStyle = (theme, isDarkMode) => ({
  padding: 5,
  color: isDarkMode ? "#FFFFFA" : "#000000",
  backgroundColor: isDarkMode
    ? theme.palette.secondary.main
    : theme.palette.background.default,
});

const iconButtonGroupStyle = (theme, isDarkMode) => ({
  color: isDarkMode ? "#FFFFFA" : "#000000",
  display: "flex",
  justifyContent: "center",
  gap: "2rem",
  marginTop: "2rem",
  flexWrap: "wrap",
});

const Home = ({ isDarkMode }) => {
  const theme = useTheme();

  return (
    <div>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 60, damping: 15 },
          },
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={centeredFlexColumn}
      >
        <Box sx={sectionBoxStyle(theme, isDarkMode)}>
          <motion.img
            src={logo}
            alt="SPOCKLY Logo"
            style={{ width: "min(80vw, 380px)", marginBottom: "1.8rem" }}
          />

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 60, damping: 15 },
              },
            }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Typography
              variant="h4"
              sx={{
                color: isDarkMode ? "#FFFFFA" : "#000000",
                fontWeight: "bold",
              }}
            >
              SPOCKLY
            </Typography>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 60, damping: 15 },
              },
            }}
            transition={{ delay: 0.6, duration: 0.6 }}
            sx={{
              fontSize: "1.2rem",
              maxWidth: "700px",
              marginTop: "1.5rem",
              lineHeight: "1.6",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? "#FFFFFA" : "#000000",
                fontWeight: "bold",
              }}
            >
              Spatial Blockly — A visual programming tool for{" "}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? "#FFFFFA" : "#000000",
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              spatial data science.
            </Typography>
          </motion.div>
        </Box>
      </motion.section>

      {/* What is SPOCKLY Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 60, damping: 15 },
          },
        }}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: "center",
        }}
      >
        <Box sx={infoBoxStyle(theme, isDarkMode)}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
            }}
            gutterBottom
          >
            What is SPOCKLY?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              margin: "0 auto",
              fontSize: "1.1rem",
              lineHeight: "1.8",
            }}
          >
            Learn data science visually – no syntax, just blocks.
            <br />
            Use SPOCKLY to organize, filter, map, and analyze real-world
            geospatial datasets.
            <br />
            Perfect for students, schools, and educators.
          </Typography>

          <Box sx={iconButtonGroupStyle(theme, isDarkMode)}>
            <HoverGrowButton icon={<FaGlobe size={32} />} text="Spatial Data" />
            <HoverGrowButton
              icon={<FaCube size={32} />}
              text="Blockly Interface"
            />
            <HoverGrowButton icon={<FaCodeBranch size={32} />} text="Using R" />
          </Box>
        </Box>
      </motion.section>

      {/* Explore Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 60, damping: 15 },
          },
        }}
        transition={{ delay: 0.1 }}
        style={{
          width: "100%",
          textAlign: "center",
          color: isDarkMode ? "#FFFFFA" : "#000000",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            color: isDarkMode ? "#FFFFFA" : "#000000",
          }}
          animate={{
            opacity: 1,
            y: 0,
            color: isDarkMode ? "#FFFFFA" : "#000000",
          }}
          transition={{ delay: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkMode
                ? theme.palette.background.default
                : theme.palette.background.paper,
              color: isDarkMode ? "#FFFFFA" : "#000000",
              paddingTop: 5,
            }}
          >
            <FaCompass size={40} style={{ marginBottom: "1rem" }} />
            <Typography
              variant="h2"
              sx={{
                fontSize: "2rem",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Start exploring
            </Typography>
          </Box>
        </motion.div>
        <Box sx={buttonWrapperStyle(theme, isDarkMode)}>
          <Link to="/SPOCKLY">
            <Fab
              variant="extended"
              sx={{
                boxShadow: "none",
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                  color: isDarkMode ? "#FFFFFA" : "#000000",
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Rocket fontSize="small" />
                <Typography sx={{ fontWeight: "bold" }}>
                  Start SPOCKLY Editor
                </Typography>
              </Box>
            </Fab>
          </Link>
          <Link to="/tutorials">
            <Fab
              variant="extended"
              sx={{
                boxShadow: "none",
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                  color: isDarkMode ? "#FFFFFA" : "#000000",
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <ImportContacts fontSize="small" />
                <Typography sx={{ fontWeight: "bold" }}>
                  View Tutorials
                </Typography>
              </Box>
            </Fab>
          </Link>
        </Box>
      </motion.section>
    </div>
  );
};

export default Home;
