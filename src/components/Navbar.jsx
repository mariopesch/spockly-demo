import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Fab,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Brightness3, LightMode } from "@mui/icons-material";
import SpocklyLogo from "../assets/spockly_logo.png";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isMobile, setIsMobile] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        height: "60px",
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Toolbar
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={SpocklyLogo}
              alt="Spockly Logo"
              style={{ height: 40, width: 40, marginRight: 10 }}
            />
            <Typography variant="h6" fontWeight="bold">
              SPOCKLY
            </Typography>
          </Link>
        </Box>

        <Stack direction="row" spacing={3} alignItems="center">
          <NavLink
            to="/spockly"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive
                ? theme.palette.primary.light
                : theme.palette.primary.contrastText,
              fontWeight: "bold",
            })}
          >
            SPOCKLY
          </NavLink>

          <NavLink
            to="/tutorials"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive
                ? theme.palette.primary.light
                : theme.palette.primary.contrastText,
              fontWeight: "bold",
            })}
          >
            Tutorials
          </NavLink>

          <Fab
            variant="extended"
            size="small"
            onClick={toggleTheme}
            sx={{
              width: "90px",
              bgcolor: theme.palette.primary.contrastText,
              color: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
              },
              boxShadow: "none",
              fontSize: "0.75rem",
            }}
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              {isDarkMode ? (
                <LightMode fontSize="small" />
              ) : (
                <Brightness3 fontSize="small" />
              )}
              {isDarkMode ? "Light" : "Dark"}
            </Box>
          </Fab>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
