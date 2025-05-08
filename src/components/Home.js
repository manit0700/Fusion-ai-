import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Container>
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Portfolio
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          I'm Manit Dankhara - Full Stack Developer
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          A passionate developer focused on creating beautiful and functional web applications
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;