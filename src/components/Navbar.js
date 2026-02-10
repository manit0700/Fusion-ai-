import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Projects', to: '/projects' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <AppBar position="sticky" elevation={0} color="transparent" sx={{ color: 'var(--text)' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}
        >
          Manit // Portfolio
        </Typography>
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={() => setOpen(true)} aria-label="Open menu">
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={open}
              onClose={() => setOpen(false)}
              PaperProps={{
                sx: {
                  width: 260,
                  backgroundColor: 'rgba(10, 15, 28, 0.96)',
                  color: 'var(--text)',
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Manit // Portfolio
                </Typography>
              </Box>
              <Divider />
              <List>
                {navItems.map((item) => (
                  <ListItemButton
                    key={item.to}
                    component={Link}
                    to={item.to}
                    onClick={() => setOpen(false)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
                <ListItemButton
                  component="a"
                  href={`${process.env.PUBLIC_URL}/Manit_Dankhara.pdf`}
                  target="_blank"
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary="Resume" />
                </ListItemButton>
              </List>
            </Drawer>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              '& .MuiButton-root': {
                fontSize: '0.9rem',
                borderRadius: 999,
                px: 2,
                color: 'var(--text)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 229, 255, 0.12)',
                },
              },
            }}
          >
            {navItems.map((item) => (
              <Button key={item.to} color="inherit" component={Link} to={item.to}>
                {item.label}
              </Button>
            ))}
            <Button color="inherit" href={`${process.env.PUBLIC_URL}/Manit_Dankhara.pdf`} target="_blank">
              Resume
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
