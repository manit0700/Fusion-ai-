import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  Stack,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import profile from '../config/profile';

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
      setError('Please provide name, email, and phone.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError('');

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to send message.');
        }
        setStatus('success');
        if (form) form.reset();
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong.');
        setStatus('error');
      });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          textAlign: 'center',
          mb: 6,
          fontWeight: 'bold',
          background: 'linear-gradient(120deg, #e5f3ff 0%, #00e5ff 45%, #7cffA5 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Get in Touch
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4 }}>
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
                InputProps={{ sx: { backgroundColor: 'rgba(10, 15, 28, 0.6)' } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputProps={{ sx: { backgroundColor: 'rgba(10, 15, 28, 0.6)' } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="tel"
                InputProps={{ sx: { backgroundColor: 'rgba(10, 15, 28, 0.6)' } }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="message"
                label="Notes (Optional)"
                id="message"
                multiline
                rows={4}
                InputProps={{ sx: { backgroundColor: 'rgba(10, 15, 28, 0.6)' } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </Button>
              {status === 'success' && (
                <Typography variant="body2" color="primary">
                  Message sent successfully.
                </Typography>
              )}
              {status === 'error' && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Connect With Me
            </Typography>
            <Typography paragraph color="text.secondary">
              Reach out through email or phone for collaborations, internships, or project work.
            </Typography>

            <Stack spacing={2} sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon fontSize="small" />
                <Typography>{profile.email}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon fontSize="small" />
                <Typography>{profile.phone}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              {profile.githubUrl && (
                <IconButton
                  color="primary"
                  href={profile.githubUrl}
                  target="_blank"
                  aria-label="GitHub"
                >
                  <GitHubIcon fontSize="large" />
                </IconButton>
              )}
              {profile.linkedInUrl && (
                <IconButton
                  color="primary"
                  href={profile.linkedInUrl}
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
