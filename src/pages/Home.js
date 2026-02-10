import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid, Stack, Paper, Divider, Chip, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import profile from '../config/profile';

const capabilities = [
  {
    title: 'Product UI Engineering',
    description: 'Interface design with clean layout systems, accessibility, and crisp interactions.',
  },
  {
    title: 'AI-Enabled Features',
    description: 'From OCR to automation, I integrate ML workflows into usable products.',
  },
  {
    title: 'Reliable Delivery',
    description: 'Structured planning, readable code, and ship-ready execution.',
  },
];

const workflow = [
  'Clarify the product goal and user flow',
  'Prototype the interface and data model',
  'Ship, iterate, and harden performance',
];

const Home = () => {
  const {
    name,
    title,
    summary,
    location,
    githubUsername,
    githubUrl,
    email,
    phone,
    avatarUrl,
  } = profile;
  const [allRepos, setAllRepos] = useState([]);
  const gh = (repo) => {
    if (!repo) return null;
    if (repo.startsWith('http://') || repo.startsWith('https://')) return repo;
    return githubUsername ? `https://github.com/${githubUsername}/${repo}` : githubUrl;
  };

  const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

  const resolveRepoUrl = (project) => {
    if (!project) return null;
    if (project.repo) {
      const direct = gh(project.repo);
      if (direct && (project.repo.startsWith('http://') || project.repo.startsWith('https://'))) {
        return direct;
      }
    }

    const repoHint = project.repo || project.title;
    const repoHintNorm = normalize(repoHint);

    const exact = allRepos.find((repo) => repo.name.toLowerCase() === (project.repo || '').toLowerCase());
    if (exact) return exact.html_url;

    const fuzzy = allRepos.find((repo) => {
      const repoNorm = normalize(repo.name);
      return repoNorm.includes(repoHintNorm) || repoHintNorm.includes(repoNorm);
    });
    if (fuzzy) return fuzzy.html_url;

    return project.repo ? gh(project.repo) : githubUrl;
  };

  useEffect(() => {
    if (!githubUsername) return;
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)
      .then((r) => r.json())
      .then((data) => setAllRepos(Array.isArray(data) ? data : []))
      .catch(() => setAllRepos([]));
  }, [githubUsername]);
  const stats = [
    { label: 'Projects shipped', value: String(profile.projects?.length || 3) },
    { label: 'Focus areas', value: 'Backend + AI' },
    { label: 'Status', value: profile.availability || 'Open to roles' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="overline" sx={{ letterSpacing: 3, color: 'var(--muted)' }}>
            Futuristic Portfolio
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mt: 2,
              fontSize: { xs: '2.6rem', md: '3.8rem' },
              lineHeight: 1.05,
              background: 'linear-gradient(120deg, #e5f3ff 0%, #00e5ff 45%, #7cffA5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {name}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 3, maxWidth: 560, color: 'var(--muted)' }}>
            {summary}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" component={Link} to="/projects">
              Explore Projects
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/contact">
              Contact Me
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href={`${process.env.PUBLIC_URL}/Manit_Dankhara.pdf`}
              target="_blank"
              rel="noopener"
            >
              Resume
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Signal Snapshot
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {name}
                </Typography>
                <Typography variant="subtitle1">{title}</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Avatar
                src={avatarUrl || undefined}
                alt={`${name} portrait`}
                sx={{
                  width: 64,
                  height: 64,
                  border: '2px solid rgba(0, 229, 255, 0.4)',
                  boxShadow: '0 0 30px rgba(0, 229, 255, 0.25)',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                }}
              >
                {name?.[0] || 'M'}
              </Avatar>
            </Stack>
            <Stack spacing={2}>
              {stats.map((stat) => (
                <Box key={stat.label}>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h6">{stat.value}</Typography>
                </Box>
              ))}
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Location
            </Typography>
            <Typography sx={{ mb: 2 }}>{location}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Preferred Contact
            </Typography>
            <Stack spacing={0.5}>
              <Typography>{email || 'you@example.com'}</Typography>
              <Typography>{phone || '(000) 000-0000'}</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: { xs: 6, md: 8 } }}>
        {capabilities.map((cap) => (
          <Grid item xs={12} md={4} key={cap.title}>
            <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {cap.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cap.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: { xs: 6, md: 8 } }}>
        <Typography variant="h4" gutterBottom>
          Featured Projects
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 620, mb: 3 }}>
          A snapshot of the products and experiments that define my current focus.
        </Typography>
        <Grid container spacing={3}>
          {(profile.projects || []).map((project) => {
            const repoUrl = resolveRepoUrl(project);
            return (
            <Grid item xs={12} md={4} key={project.title}>
              <Paper elevation={0} sx={{ p: 0, overflow: 'hidden', height: '100%' }}>
                <Box
                  sx={{
                    px: 3,
                    py: 3,
                    background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(255,138,0,0.2))',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {project.date}
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  {project.summary && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.summary}
                    </Typography>
                  )}
                  <Stack spacing={0.8} sx={{ mb: 2 }}>
                    {(project.bullets || []).slice(0, 3).map((bullet) => (
                      <Typography key={bullet} variant="body2" color="text.secondary">
                        • {bullet}
                      </Typography>
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {(project.tags || []).map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                  {repoUrl && (
                    <Button
                      size="small"
                      sx={{ mt: 2 }}
                      href={repoUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      View Repo
                    </Button>
                  )}
                </Box>
              </Paper>
            </Grid>
          );
          })}
        </Grid>
      </Box>

      <Grid container spacing={4} sx={{ mt: { xs: 6, md: 8 } }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Workflow
            </Typography>
            <Stack spacing={2}>
              {workflow.map((step, index) => (
                <Box key={step}>
                  <Typography variant="caption" color="text.secondary">
                    Step {index + 1}
                  </Typography>
                  <Typography>{step}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Core Stack
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Figma'].map((tool) => (
                <Chip key={tool} label={tool} />
              ))}
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {summary}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          mt: { xs: 6, md: 8 },
          p: { xs: 4, md: 6 },
          background: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(255,138,0,0.16))',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Let’s build the next interface.
            </Typography>
            <Typography color="text.secondary">
              I’m open to full-time roles, product collaborations, and experimental builds.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Button variant="contained" color="primary" component={Link} to="/contact">
                Start a Project
              </Button>
              <Button variant="outlined" color="primary" component={Link} to="/portfolio">
                View Full Portfolio
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
