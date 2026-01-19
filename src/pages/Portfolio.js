// Portfolio component
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Chip, Stack, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import profile from '../config/profile';

const skills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX', 'MUI', 'APIs'
];

const highlights = [
  { title: 'AI Stock Analysis', description: 'AI-driven stock analysis and portfolio optimizer using Python and React.' },
  { title: 'Image to Text Converter', description: 'Flutter app that converts images to text with OCR and exports results.' },
  { title: 'Email Generator', description: 'Automated email generation tool with templates and CSV pipelines.' }
];

const Portfolio = () => {
  const { name, title, githubUsername, githubUrl, linkedInUrl } = profile;
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  useEffect(() => {
    if (!githubUsername) {
      setLoadingRepos(false);
      return;
    }
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
      .then((r) => r.json())
      .then((data) => setRepos(Array.isArray(data) ? data : []))
      .catch(() => setRepos([]))
      .finally(() => setLoadingRepos(false));
  }, [githubUsername]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Avatar sx={{ width: 96, height: 96, mx: 'auto', mb: 2 }}>{name?.[0] || 'M'}</Avatar>
        <Typography variant="h3" component="h1" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" component={Link} to="/projects">
            View Projects
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/contact">
            Contact Me
          </Button>
          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            href={`${process.env.PUBLIC_URL}/Manit_Dankhara.pdf`}
            target="_blank"
            rel="noopener"
          >
            Download Resume
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
          {githubUrl && (
            <Button component="a" href={githubUrl} target="_blank" rel="noopener" aria-label="GitHub">
              <GitHubIcon />
            </Button>
          )}
          {linkedInUrl && (
            <Button component="a" href={linkedInUrl} target="_blank" rel="noopener" aria-label="LinkedIn">
              <LinkedInIcon />
            </Button>
          )}
        </Stack>
      </Box>

      {/* Skills */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Skills
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} sx={{ mb: 1 }} />
          ))}
        </Stack>
      </Box>

      {/* Highlights */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Highlights
        </Typography>
        <Grid container spacing={3}>
          {highlights.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* GitHub Feed */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Latest GitHub Updates
        </Typography>
        {loadingRepos ? (
          <Typography variant="body2" color="text.secondary">Loading repos…</Typography>
        ) : repos.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No repositories found or username not set.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {repos.map((repo) => (
              <Grid item xs={12} md={4} key={repo.id}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {repo.description || 'No description'}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {repo.language && <Chip label={repo.language} size="small" />}
                      <Chip label={`★ ${repo.stargazers_count}`} size="small" />
                      <Chip label={`Updated ${new Date(repo.updated_at).toLocaleDateString()}`} size="small" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Portfolio;