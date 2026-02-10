import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import profile from '../config/profile';

const Projects = () => {
  const { githubUsername, githubUrl } = profile;
  const gh = (repo) =>
    githubUsername ? `https://github.com/${githubUsername}/${repo}` : githubUrl;

  const projects = [
    {
      title: 'ABCframework',
      description:
        'A framework with separate frontend and backend. Built with React and Node; focuses on modularity and scalability.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'Node.js'],
      liveLink: '#',
      githubLink: gh('ABCframework'),
    },
    {
      title: 'CartoonifyFix',
      description:
        'iOS project to cartoonify photos and refine outputs with better edge detection.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['Swift', 'iOS'],
      liveLink: '#',
      githubLink: gh('CartoonifyFix'),
    },
    {
      title: 'Convert_Photos_Cartoon_Images',
      description:
        'Converts photos into cartoon images using image processing techniques.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['Python', 'OpenCV'],
      liveLink: '#',
      githubLink: gh('Convert_Photos_Cartoon_Images'),
    },
    {
      title: 'Email_Generator',
      description:
        'Automates email generation with templates, CSV pipelines, and a clean CLI.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['Python', 'CLI'],
      liveLink: '#',
      githubLink: gh('Email_Generator'),
    },
    {
      title: 'Image-to-Text-Converter',
      description:
        'Flutter app that extracts text from images via OCR, with export options.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['Flutter', 'Dart'],
      liveLink: '#',
      githubLink: gh('Image-to-Text-Converter'),
    },
    {
      title: 'ai_stock_analysis_and_investment_portfolie',
      description:
        'AI-driven stock analysis and portfolio optimization with notebooks, backend, and frontend.',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['Python', 'React', 'ML'],
      liveLink: '#',
      githubLink: gh('ai_stock_analysis_and_investment_portfolie'),
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
        My Projects
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {project.technologies.map((tech, i) => (
                    <Typography
                      key={i}
                      variant="caption"
                      sx={{
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {tech}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={project.liveLink} target="_blank">
                  Live Demo
                </Button>
                <Button size="small" color="primary" href={project.githubLink} target="_blank">
                  GitHub
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects;