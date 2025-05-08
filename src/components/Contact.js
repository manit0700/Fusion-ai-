import React from 'react';
import { Container, Typography, Box, TextField, Button, Grid } from '@mui/material';

function Contact() {
  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Me
        </Typography>
        <Box component="form" sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" size="large">
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Or reach me at:
          </Typography>
          <Typography variant="body1">
            Email: your.email@example.com
          </Typography>
          <Typography variant="body1">
            LinkedIn: linkedin.com/in/yourprofile
          </Typography>
          <Typography variant="body1">
            GitHub: github.com/yourusername
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Contact;