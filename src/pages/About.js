import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import profile from '../config/profile';

const About = () => {
  const { summary, education, experience, skills, activities } = profile;

  const skillGroups = [
    { label: 'Languages', items: skills.languages },
    { label: 'Frameworks/Libraries', items: skills.frameworks },
    { label: 'Databases/Cloud', items: skills.databasesCloud },
    { label: 'Tools', items: skills.tools },
    { label: 'Professional', items: skills.professional },
  ];

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
        About Me
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Profile
            </Typography>
            <Typography paragraph color="text.secondary">
              {summary}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
            <Stack spacing={2}>
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
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Experience
            </Typography>
            <Stack spacing={3}>
              {(experience || []).map((exp) => (
                <Box key={`${exp.org}-${exp.role}`}>
                  <Typography variant="subtitle1">{exp.role}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.org} • {exp.dates}
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    {(exp.bullets || []).map((bullet) => (
                      <Typography key={bullet} variant="body2" color="text.secondary">
                        {bullet}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Skill Matrix
            </Typography>
            <Stack spacing={3}>
              {skillGroups.map((group) => (
                <Box key={group.label}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {group.label}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {group.items.map((item) => (
                      <Chip key={item} label={item} size="small" />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Activities & Leadership
            </Typography>
            <Stack spacing={2}>
              {(activities || []).map((activity) => (
                <Box key={activity.org}>
                  <Typography variant="subtitle1">{activity.org}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.dates}
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    {(activity.bullets || []).map((item) => (
                      <Typography key={item} variant="body2" color="text.secondary">
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
