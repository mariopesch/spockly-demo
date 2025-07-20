// Footer.jsx
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useTheme, Box, Breadcrumbs, Link, Typography } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        padding: "1rem",
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Breadcrumbs
        separator="•"
        aria-label="footer navigation"
        sx={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          mb: 1,
          "& a": {
            color: theme.palette.text.primary,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
        }}
      >
        <Link component={RouterLink} to="/">Home</Link>
        <Link component={RouterLink} to="/spockly">SPOCKLY</Link>
        <Link component={RouterLink} to="/tutorials">Tutorials</Link>
        <Link component={RouterLink} to="/impressum">Legal Notice</Link>
        <Link
          href="https://github.com/ifgi/spockly-demo/"
          target="_blank"
          rel="noreferrer"
          sx={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <FaGithub />
          GitHub
        </Link>
        <Link
          href="https://www.uni-muenster.de/Geoinformatics/"
          target="_blank"
          rel="noreferrer"
        >
          ifgi Website
        </Link>
      </Breadcrumbs>

      <Typography variant="body2" color="text.secondary">
        © 2025 SPOCKLY — ifgi
      </Typography>
    </Box>
  );
};

export default Footer;
