import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, responsiveFontSizes } from '@mui/material';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
    },
    secondary: {
      main: '#ff8a00',
    },
    background: {
      default: '#0a0f1c',
      paper: 'rgba(17, 25, 40, 0.7)',
    },
    text: {
      primary: '#e5f3ff',
      secondary: '#a3b3c7',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Space Grotesk", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: -1.5,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: -1.2,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: -0.8,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: -0.6,
    },
    body1: {
      fontFamily: '"Sora", "Helvetica Neue", sans-serif',
    },
    body2: {
      fontFamily: '"Sora", "Helvetica Neue", sans-serif',
    },
    button: {
      fontFamily: '"Space Grotesk", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--bg)',
          color: 'var(--text)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 15, 28, 0.72)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(14px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 22,
          paddingBlock: 10,
        },
        containedPrimary: {
          boxShadow: '0 0 30px rgba(0, 229, 255, 0.35)',
        },
        outlinedPrimary: {
          borderColor: 'rgba(0, 229, 255, 0.5)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(17, 25, 40, 0.72)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          boxShadow: 'var(--shadow)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ChatWidget />
      </Router>
    </ThemeProvider>
  );
}
export default App;
