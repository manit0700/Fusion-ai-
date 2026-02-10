import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Stack,
  Chip,
} from '@mui/material';
import profile from '../config/profile';

const Projects = () => {
  const { githubUsername, githubUrl, projects } = profile;
  const [allRepos, setAllRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  const gh = useCallback((repo) => {
    if (!repo) return null;
    if (repo.startsWith('http://') || repo.startsWith('https://')) return repo;
    return githubUsername ? `https://github.com/${githubUsername}/${repo}` : githubUrl;
  }, [githubUrl, githubUsername]);

  const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

  const resolveRepoUrl = useCallback((project) => {
    if (!project) return null;
    if (project.repo) {
      const direct = gh(project.repo);
      if (direct && (project.repo.startsWith('http://') || project.repo.startsWith('https://'))) {
        return direct;
      }
    }
    return project.repo ? gh(project.repo) : githubUrl;
  }, [gh, githubUrl]);

  useEffect(() => {
    if (!githubUsername) {
      setLoadingRepos(false);
      return;
    }
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)
      .then((r) => r.json())
      .then((data) => {
        const repos = Array.isArray(data) ? data : [];
        const filtered = repos.filter((repo) => !repo.fork);
        setAllRepos(filtered);
      })
      .catch(() => setAllRepos([]))
      .finally(() => setLoadingRepos(false));
  }, [githubUsername]);

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

  const displayProjects = useMemo(() => {
    const featured = (projects || []).map((project) => ({
      ...project,
      repoUrl: resolveRepoUrl(project),
      isFeatured: true,
    }));

    const featuredKeys = new Set(
      featured.map((project) => normalize(project.repoUrl || project.title))
    );

    const repoProjects = (allRepos || [])
      .filter((repo) => !repo.fork)
      .filter((repo) => !featuredKeys.has(normalize(repo.html_url)) && !featuredKeys.has(normalize(repo.name)))
      .map((repo) => ({
        title: repo.name,
        date: `Updated ${new Date(repo.updated_at).toLocaleDateString()}`,
        summary: describeRepo(repo),
        tags: repo.language ? [repo.language] : [],
        bullets: repoBullets(repo),
        repoUrl: repo.html_url,
        isFeatured: false,
      }));

    return [...featured, ...repoProjects];
  }, [projects, allRepos, resolveRepoUrl]);

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
        Projects
      </Typography>

      <Grid container spacing={4}>
        {displayProjects.map((project) => {
          const repoUrl = project.repoUrl || resolveRepoUrl(project);
          return (
          <Grid item key={`${project.title}-${project.date || ''}`} xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 0 40px rgba(0, 229, 255, 0.25)',
                },
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  background:
                    'linear-gradient(140deg, rgba(0,229,255,0.22), rgba(255,138,0,0.2))',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Box>
                  <Typography variant="h6">{project.title}</Typography>
                  {project.date && (
                    <Typography variant="caption" color="text.secondary">
                      {project.date}
                    </Typography>
                  )}
                </Box>
                {repoUrl && (
                  <Button size="small" color="primary" href={repoUrl} target="_blank">
                    Repo
                  </Button>
                )}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
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
              </CardContent>
            </Card>
          </Grid>
        );
        })}
      </Grid>

      {loadingRepos && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Loading more GitHub projects…
        </Typography>
      )}
    </Container>
  );
};

export default Projects;
