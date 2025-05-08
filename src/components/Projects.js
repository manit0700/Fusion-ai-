import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import PreviewIcon from '@mui/icons-material/Preview';

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Image to Text Converter",
      description: "A mobile application that converts images to text using OCR technology. Built with Flutter for cross-platform functionality on iOS and Android.",
      image: "/project1.jpg",
      demoLink: "#",
      githubLink: "https://github.com/manitdankhara/Image-to-Text-Converter"
    },
    {
      id: 2,
      title: "Cartoonify",
      description: "An application that transforms photos into cartoon-style images using computer vision and image processing techniques.",
      image: "/project2.jpg",
      demoLink: "#",
      githubLink: "https://github.com/manitdankhara/Convert_Photos_Cartoon_Images"
    },
    {
      id: 3,
      title: "Email Generator",
      description: "An automated tool for generating and managing email templates. Streamlines the email creation process for marketing and communication.",
      image: "/project3.jpg",
      demoLink: "#",
      githubLink: "https://github.com/manitdankhara/Email_Generator"
    },
    {
      id: 4,
      title: "CartoonifyFix",
      description: "An improved version of the Cartoonify application with bug fixes and enhanced features for better image transformation results.",
      image: "/project4.jpg",
      demoLink: "#",
      githubLink: "https://github.com/manitdankhara/CartoonifyFix"
    }
  ];

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Projects
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.image}
                  alt={project.title}
                  sx={{ backgroundColor: '#f5f5f5' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={project.demoLink} target="_blank" startIcon={<PreviewIcon />}>
                    Demo
                  </Button>
                  <Button 
                    size="small" 
                    href={project.githubLink} 
                    target="_blank" 
                    startIcon={<GitHubIcon />}
                    variant="outlined"
                    color="primary"
                  >
                    GitHub
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Projects;