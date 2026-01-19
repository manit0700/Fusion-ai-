import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Code as CodeIcon,
  Web as WebIcon,
  Storage as StorageIcon,
  Brush as BrushIcon,
} from '@mui/icons-material';

const About = () => {
  const skills = [
    {
      category: 'Frontend Development',
      icon: <WebIcon />,
      items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Material-UI'],
    },
    {
      category: 'Backend Development',
      icon: <StorageIcon />,
      items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    },
    {
      category: 'Programming Languages',
      icon: <CodeIcon />,
      items: ['JavaScript', 'Python', 'Java', 'TypeScript'],
    },
    {
      category: 'Design & Tools',
      icon: <BrushIcon />,
      items: ['Git', 'VS Code', 'Figma', 'Responsive Design'],
    },
  ];

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
        About Me
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Who I Am
            </Typography>
            <Typography paragraph>
              I am a passionate developer with a strong foundation in web development
              and a keen eye for creating elegant solutions to complex problems.
              My journey in software development has equipped me with a diverse
              set of skills and a deep understanding of modern technologies.
            </Typography>
            <Typography paragraph>
              I believe in writing clean, maintainable code and creating
              user-friendly applications that make a difference. When I'm not
              coding, you can find me exploring new technologies, contributing
              to open-source projects, or sharing my knowledge with the developer
              community.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              My Skills
            </Typography>
            <Grid container spacing={2}>
              {skills.map((skillGroup, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <List>
                    <ListItem>
                      <ListItemIcon>{skillGroup.icon}</ListItemIcon>
                      <ListItemText
                        primary={skillGroup.category}
                        secondary={
                          <Box component="span" sx={{ display: 'block', mt: 1 }}>
                            {skillGroup.items.join(' • ')}
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About; 