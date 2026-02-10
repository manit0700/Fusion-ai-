import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          Welcome to My Portfolio
        </Typography>
        
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '800px' }}>
          I'm a passionate developer creating innovative solutions and building amazing projects.
          Explore my work and let's create something extraordinary together.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/projects"
              sx={{
                backgroundColor: '#2196F3',
                '&:hover': {
                  backgroundColor: '#1976D2',
                },
              }}
            >
              View My Projects
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/contact"
              sx={{
                borderColor: '#2196F3',
                color: '#2196F3',
                '&:hover': {
                  borderColor: '#1976D2',
                  backgroundColor: 'rgba(33, 150, 243, 0.04)',
                },
              }}
            >
              Contact Me
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 