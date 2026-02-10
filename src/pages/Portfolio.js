import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Avatar,
  Paper,
  Divider,
  IconButton,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import profile from '../config/profile';

const drift = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
  100% { transform: translateY(0px); }
`;

const Portfolio = () => {
  const {
    name,
    title,
    githubUsername,
    githubUrl,
    linkedInUrl,
    email,
    phone,
    summary,
    availability,
    location,
    avatarUrl,
    education,
    experience,
    projects,
    skills,
    activities,
  } = profile;
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

  const gh = (repo) => {
    if (!repo) return null;
    if (repo.startsWith('http://') || repo.startsWith('https://')) return repo;
    return githubUsername ? `https://github.com/${githubUsername}/${repo}` : githubUrl;
  };

  const describeRepo = (repo) => {
    if (!repo) return 'Project repository.';
    if (repo.description && repo.description.trim()) return repo.description;

    const pretty = repo.name
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();
    const slug = repo.name.toLowerCase();

    const keywordRules = [
      { test: /stock|portfolio|invest/, desc: 'Stock analysis + backtesting.' },
      { test: /image|ocr|text.*convert|convert.*text/, desc: 'OCR image-to-text tool.' },
      { test: /email|mailer|mail/, desc: 'Email generation utility.' },
      { test: /cartoon|toon/, desc: 'Photo cartoonification tool.' },
      { test: /price|pricing|cost/, desc: 'Price tracking tool.' },
      { test: /framework|starter|boiler/, desc: 'Modular app framework.' },
      { test: /assistant|agent|rag|llama|fusion/, desc: 'RAG-based AI assistant.' },
      { test: /converter|convert/, desc: `Conversion tool for ${pretty}.` },
    ];

    const match = keywordRules.find((rule) => rule.test.test(slug));
    if (match) return match.desc;

    if (repo.language) {
      return `${repo.language} project for ${pretty}.`;
    }
    return `Project for ${pretty}.`;
  };

  const repoBullets = (repo) => [
    `Primary language: ${repo.language || 'Not specified'}`,
    `Stars: ${repo.stargazers_count ?? 0}`,
    `Updated: ${new Date(repo.updated_at).toLocaleDateString()}`,
  ];

  const resolveRepoUrl = (project) => {
    if (!project) return null;
    if (project.repo) {
      const direct = gh(project.repo);
      if (direct && (project.repo.startsWith('http://') || project.repo.startsWith('https://'))) {
        return direct;
      }
    }
    return project.repo ? gh(project.repo) : githubUrl;
  };


  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 180, md: 260 },
          height: { xs: 180, md: 260 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.4), transparent 70%)',
          top: { xs: 60, md: 110 },
          right: { xs: -50, md: -40 },
          filter: 'blur(1px)',
          animation: `${drift} 9s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: { xs: 140, md: 220 },
          height: { xs: 140, md: 220 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,138,0,0.45), transparent 70%)',
          bottom: { xs: 120, md: 160 },
          left: { xs: -40, md: -20 },
          animation: `${drift} 11s ease-in-out infinite`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="overline" sx={{ letterSpacing: 3, color: 'var(--muted)' }}>
              Portfolio Overview
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                mt: 2,
                fontSize: { xs: '2.6rem', md: '3.6rem' },
                lineHeight: 1.05,
                background: 'linear-gradient(120deg, #e5f3ff 0%, #00e5ff 45%, #7cffA5 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {name}
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mt: 2, maxWidth: 520 }}>
              {title}
            </Typography>
            <Typography sx={{ mt: 3, maxWidth: 560, color: 'var(--muted)' }}>
              {summary}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" component={Link} to="/projects">
                View Projects
              </Button>
              <Button variant="outlined" color="primary" component={Link} to="/contact">
                Start a Conversation
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<PictureAsPdfIcon />}
                href={`${process.env.PUBLIC_URL}/Manit_Dankhara.pdf`}
                target="_blank"
                rel="noopener"
              >
                Resume
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {githubUrl && (
                <IconButton
                  component="a"
                  href={githubUrl}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </IconButton>
              )}
              {linkedInUrl && (
                <IconButton
                  component="a"
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </IconButton>
              )}
              {email && (
                <IconButton component="a" href={`mailto:${email}`} aria-label="Email">
                  <MailOutlineIcon />
                </IconButton>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={avatarUrl || undefined}
                    sx={{ width: 64, height: 64, bgcolor: 'primary.main', color: '#0a0f1c' }}
                  >
                    {name?.[0] || 'M'}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Current Focus</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {availability}
                    </Typography>
                  </Box>
                </Stack>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Location
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {location}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Contact
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <MailOutlineIcon fontSize="small" />
                      <Typography variant="body2">{email}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PhoneIcon fontSize="small" />
                      <Typography variant="body2">{phone}</Typography>
                    </Stack>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Core Stack
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                    {['Python', 'React', 'APIs', 'ML', 'Docker'].map((item) => (
                      <Chip key={item} label={item} size="small" />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: { xs: 6, md: 8 } }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Education
              </Typography>
              {(education || []).map((edu) => (
                <Box key={edu.school}>
                  <Typography variant="subtitle1">{edu.school}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.degree}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {edu.year}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Experience
              </Typography>
              {(experience || []).map((exp) => (
                <Box key={exp.role}>
                  <Typography variant="subtitle1">{exp.role}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.org} • {exp.dates}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Activities
              </Typography>
              {(activities || []).map((activity) => (
                <Box key={activity.org}>
                  <Typography variant="subtitle1">{activity.org}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.dates}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 3 }}>
          <Typography variant="h4" gutterBottom>
            Project Highlights
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 620 }}>
            AI research tools, OCR pipelines, and intelligent assistants built with scalable systems.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {(projects || []).map((project) => {
            const repoUrl = resolveRepoUrl(project);
            return (
            <Grid item xs={12} md={4} key={project.title}>
              <Card elevation={0} sx={{ height: '100%', overflow: 'hidden' }}>
                <Box
                  sx={{
                    height: 140,
                    background:
                      'linear-gradient(140deg, rgba(0,229,255,0.28), rgba(255,138,0,0.24))',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {project.date}
                  </Typography>
                </Box>
                <CardContent>
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
                </CardContent>
              </Card>
            </Grid>
          );
          })}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Skills
          </Typography>
          <Typography color="text.secondary">A full stack of languages, frameworks, and tools.</Typography>
        </Box>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {(skills?.languages || []).map((item) => (
              <Chip key={item} label={item} />
            ))}
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {(skills?.frameworks || []).map((item) => (
              <Chip key={item} label={item} />
            ))}
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {(skills?.databasesCloud || []).map((item) => (
              <Chip key={item} label={item} />
            ))}
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {(skills?.tools || []).map((item) => (
              <Chip key={item} label={item} />
            ))}
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {(skills?.professional || []).map((item) => (
              <Chip key={item} label={item} />
            ))}
          </Stack>
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Latest GitHub Updates
          </Typography>
          <Typography color="text.secondary">
            {githubUsername
              ? `Pulling recent work from @${githubUsername}.`
              : 'Set your GitHub username in src/config/profile.js to enable this feed.'}
          </Typography>
        </Box>
        {loadingRepos ? (
          <Typography variant="body2" color="text.secondary">
            Loading repos…
          </Typography>
        ) : repos.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No repositories found or username not set.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {repos.map((repo) => (
              <Grid item xs={12} md={4} key={repo.id}>
                <Card elevation={0} sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </Typography>
                    {describeRepo(repo) && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {describeRepo(repo)}
                      </Typography>
                    )}
                    <Stack spacing={0.8} sx={{ mb: 2 }}>
                      {repoBullets(repo).map((bullet) => (
                        <Typography key={bullet} variant="body2" color="text.secondary">
                          • {bullet}
                        </Typography>
                      ))}
                    </Stack>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {repo.language && <Chip label={repo.language} size="small" />}
                      <Chip label={`★ ${repo.stargazers_count}`} size="small" />
                      <Chip
                        label={`Updated ${new Date(repo.updated_at).toLocaleDateString()}`}
                        size="small"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 }, position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            background: 'linear-gradient(135deg, rgba(0,229,255,0.22), rgba(255,138,0,0.18))',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Ready to build something meaningful?
              </Typography>
              <Typography sx={{ opacity: 0.9, maxWidth: 520 }}>
                I’m open to new roles, collaborations, and product challenges. Let’s create an experience
                that feels thoughtful, sharp, and memorable.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Button variant="contained" color="primary" component={Link} to="/contact">
                  Start a Conversation
                </Button>
                {email && (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<MailOutlineIcon />}
                    href={`mailto:${email}`}
                  >
                    {email}
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Portfolio;
