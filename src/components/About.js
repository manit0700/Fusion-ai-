import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

function About() {
  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Me
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                My Background
              </Typography>
              <Typography variant="body1" paragraph>
                Hello! I'm Manit Dankhara, a passionate developer with expertise in web development.
                [Add your background information here]
              </Typography>
              <Typography variant="body1" paragraph>
                [Add more details about your education, experience, etc.]
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Typography variant="body1">
                • Frontend: React, JavaScript, HTML, CSS
              </Typography>
              <Typography variant="body1">
                • Backend: Node.js, Express
              </Typography>
              <Typography variant="body1">
                • Database: MongoDB, MySQL
              </Typography>
              <Typography variant="body1">
                • Tools: Git, VS Code, Docker
              </Typography>
              <Typography variant="body1">
                • [Add more skills]
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default About;