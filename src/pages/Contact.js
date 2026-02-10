import React from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          textAlign: 'center',
          mb: 6,
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
        }}
      >
        Get in Touch
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Contact Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="message"
                label="Message"
                id="message"
                multiline
                rows={4}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Message
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Connect With Me
            </Typography>
            <Typography paragraph>
              Feel free to reach out to me through any of these platforms.
              I'm always open to discussing new projects, creative ideas,
              or opportunities to be part of your visions.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <IconButton
                color="primary"
                href={require('../config/profile').default.githubUrl}
                target="_blank"
                aria-label="GitHub"
              >
                <GitHubIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="primary"
                href={require('../config/profile').default.linkedInUrl}
                target="_blank"
                aria-label="LinkedIn"
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="primary"
                href="https://twitter.com/yourusername"
                target="_blank"
                aria-label="Twitter"
              >
                <TwitterIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="primary"
                href={`mailto:${require('../config/profile').default.email}`}
                aria-label="Email"
              >
                <EmailIcon fontSize="large" />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;