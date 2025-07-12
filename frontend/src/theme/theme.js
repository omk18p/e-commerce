import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#8B5CF6", // Modern violet
      light: "#A78BFA",
      dark: "#7C3AED",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#10B981", // Modern emerald
      light: "#34D399",
      dark: "#059669",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#EF4444", // Modern red
      light: "#F87171",
      dark: "#DC2626",
    },
    warning: {
      main: "#F59E0B", // Modern amber
      light: "#FBBF24",
      dark: "#D97706",
    },
    info: {
      main: "#3B82F6", // Modern blue
      light: "#60A5FA",
      dark: "#2563EB",
    },
    success: {
      main: "#10B981", // Modern emerald
      light: "#34D399",
      dark: "#059669",
    },
    background: {
      default: "#0F0F23", // Deep dark blue
      paper: "#1A1A2E", // Slightly lighter dark blue
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      gradientSecondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      gradientTertiary: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      glass: "rgba(26, 26, 46, 0.8)",
      glassLight: "rgba(26, 26, 46, 0.4)",
    },
    text: {
      primary: "#FFFFFF", // Pure white
      secondary: "#94A3B8", // Light gray
      disabled: "#64748B", // Medium gray
    },
    grey: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
    },
  },

  shape: {
    borderRadius: 16,
  },

  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.2),0px 1px 3px 0px rgba(0,0,0,0.2)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.2),0px 1px 5px 0px rgba(0,0,0,0.2)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.2),0px 1px 8px 0px rgba(0,0,0,0.2)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.2),0px 1px 10px 0px rgba(0,0,0,0.2)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.2),0px 1px 14px 0px rgba(0,0,0,0.2)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.2),0px 1px 18px 0px rgba(0,0,0,0.2)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.2),0px 2px 16px 1px rgba(0,0,0,0.2)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.2),0px 3px 14px 2px rgba(0,0,0,0.2)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.2),0px 3px 16px 2px rgba(0,0,0,0.2)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.2),0px 4px 18px 3px rgba(0,0,0,0.2)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.2),0px 4px 20px 3px rgba(0,0,0,0.2)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.2),0px 5px 22px 4px rgba(0,0,0,0.2)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.2),0px 5px 24px 4px rgba(0,0,0,0.2)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.2),0px 5px 26px 4px rgba(0,0,0,0.2)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.2),0px 6px 28px 5px rgba(0,0,0,0.2)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.2),0px 6px 30px 5px rgba(0,0,0,0.2)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.2),0px 6px 32px 5px rgba(0,0,0,0.2)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.2),0px 7px 34px 6px rgba(0,0,0,0.2)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.2),0px 7px 36px 6px rgba(0,0,0,0.2)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.2),0px 8px 38px 7px rgba(0,0,0,0.2)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.2),0px 8px 40px 7px rgba(0,0,0,0.2)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.2),0px 8px 42px 7px rgba(0,0,0,0.2)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.2),0px 9px 44px 8px rgba(0,0,0,0.2)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.2),0px 9px 46px 8px rgba(0,0,0,0.2)",
    "0px 12px 16px -8px rgba(0,0,0,0.2),0px 25px 40px 4px rgba(0,0,0,0.2),0px 10px 48px 9px rgba(0,0,0,0.2)",
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        /* Custom Scrollbar for Webkit browsers */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #1A1A2E;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
          border-radius: 10px;
          border: 2px solid #1A1A2E;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
        }

        /* Firefox scrollbar */
        html {
          scrollbar-width: thin;
          scrollbar-color: #8B5CF6 #1A1A2E;
        }

        /* Global styles */
        body {
          background: linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%);
          min-height: 100vh;
          color: #FFFFFF;
        }

        /* Custom focus styles */
        *:focus {
          outline: 2px solid #8B5CF6;
          outline-offset: 2px;
        }

        /* Smooth transitions */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Glass morphism effect */
        .glass {
          background: rgba(26, 26, 46, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Neon glow effect */
        .neon-glow {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '14px 28px',
          boxShadow: '0 8px 16px -4px rgba(139, 92, 246, 0.3)',
          '&:hover': {
            boxShadow: '0 12px 24px -6px rgba(139, 92, 246, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
          },
        },
        outlined: {
          border: '2px solid',
          borderColor: '#8B5CF6',
          color: '#8B5CF6',
          '&:hover': {
            background: 'rgba(139, 92, 246, 0.1)',
            borderColor: '#A78BFA',
            color: '#A78BFA',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            transform: 'translateY(-8px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 15, 35, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: 'rgba(26, 26, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8B5CF6',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8B5CF6',
              borderWidth: 2,
            },
            '& .MuiInputBase-input': {
              color: '#FFFFFF',
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#94A3B8',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          color: '#8B5CF6',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 26, 46, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 12,
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  
  typography: {
    fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      "@media (max-width:960px)": {
        fontSize: "3rem",
      },
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
      "@media (max-width:414px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
      "@media (max-width:960px)": {
        fontSize: "2.25rem",
      },
      "@media (max-width:662px)": {
        fontSize: "2rem",
      },
      "@media (max-width:414px)": {
        fontSize: "1.75rem",
      },
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.4,
      "@media (max-width:960px)": {
        fontSize: "2rem",
      },
      "@media (max-width:662px)": {
        fontSize: "1.75rem",
      },
      "@media (max-width:414px)": {
        fontSize: "1.5rem",
      },
    },
    h4: {
      fontSize: "1.875rem",
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:960px)": {
        fontSize: "1.625rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.5,
      "@media (max-width:960px)": {
        fontSize: "1.375rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
      "@media (max-width:960px)": {
        fontSize: "1.125rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
      "@media (max-width:960px)": {
        fontSize: "1rem",
      },
      "@media (max-width:600px)": {
        fontSize: "0.9375rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
      "@media (max-width:960px)": {
        fontSize: "0.875rem",
      },
      "@media (max-width:600px)": {
        fontSize: "0.8125rem",
      },
      "@media (max-width:480px)": {
        fontSize: "0.75rem",
      },
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
});

export default theme;