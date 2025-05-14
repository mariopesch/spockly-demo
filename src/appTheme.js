import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#44A1A0",
      dark: "#0D5C63",
      contrastText: "#FFFFFA",
      light: "#FFD966",
    },
    secondary: {
      main: "#78CDD7",
      contrastText: "#FFFFFA",
    },
    background: {
      default: "#f5f5f5",
      paper: "#EEEAEA",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1f1547",
      contrastText: "#FFFFFA",
      dark: "#15134C",
      light: "#B58FFF",
    },
    secondary: {
      main: "#3f395b",
      contrastText: "#FFFFFA",
    },
    background: {
      default: "#150e31",
      paper: "#3f395b",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#B58FFF",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.Mui-selected": {
            color: "#B58FFF",
            fontWeight: "bold",
          },
        },
      },
    },
  },
});
