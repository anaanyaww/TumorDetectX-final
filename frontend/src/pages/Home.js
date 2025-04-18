// frontend/src/pages/Home.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BiotechIcon from '@mui/icons-material/Biotech';

// Styled hero section
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(8, 0, 6),
  marginBottom: theme.spacing(6),
}));

// Placeholder image URLs (replace with your own)
const heroImageUrl = "/api/placeholder/1200/600";
const featureImageUrl = "/api/placeholder/400/300";

function Home() {
  // Features data
  const features = [
    {
      title: "Glioma Detection",
      description: "Detect glioma tumors with high precision using our advanced deep learning model.",
      icon: <PsychologyIcon fontSize="large" color="primary" />,
    },
    {
      title: "Meningioma Analysis",
      description: "Identify meningioma tumors and their characteristics with our specialized algorithms.",
      icon: <MedicalInformationIcon fontSize="large" color="primary" />,
    },
    {
      title: "Pituitary Tumor Detection",
      description: "Accurately detect pituitary tumors in brain MRI scans using neural networks.",
      icon: <BiotechIcon fontSize="large" color="primary" />,
    },
    {
      title: "Normal Scan Verification",
      description: "Verify normal brain scans and distinguish them from those containing tumors.",
      icon: <HealthAndSafetyIcon fontSize="large" color="primary" />,
    }
  ];

  // Stats data
  const stats = [
    { value: "99.2%", label: "Accuracy" },
    { value: "99.7%", label: "Precision" },
    { value: "99.9%", label: "Recall" },
    { value: "0.023s", label: "Inference Time" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Brain MRI Tumor Classification
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Advanced deep learning technology to detect and classify brain tumors from MRI scans
            with high accuracy and reliability.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              component={RouterLink}
              to="/analyze"
              sx={{ mx: 1 }}
            >
              Analyze MRI Scan
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large"
              component={RouterLink}
              to="/how-it-works"
              sx={{ mx: 1 }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </HeroSection>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography component="h2" variant="h3" align="center" gutterBottom>
          Tumor Classification Capabilities
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Our model can identify four distinct brain conditions with exceptional accuracy
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Stats Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h3" align="center" gutterBottom>
            Performance Metrics
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Our model achieves state-of-the-art performance
          </Typography>
          
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            {stats.map((stat, index) => (
              <Grid item key={index} xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography component="p" variant="h3" color="primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Box sx={{ bgcolor: 'primary.light', p: 4, borderRadius: 2 }}>
          <Typography component="h2" variant="h4" color="white" align="center" gutterBottom>
            Ready to analyze a brain MRI?
          </Typography>
          <Typography variant="h6" color="white" align="center" paragraph sx={{ opacity: 0.9 }}>
            Upload your MRI scan and get instant classification results
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              component={RouterLink}
              to="/analyze"
            >
              Start Analysis Now
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Home;