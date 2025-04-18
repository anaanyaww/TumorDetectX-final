// src/pages/AboutPage.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        About This Project
      </Typography>
      
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Brain Tumor MRI Classification System
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" paragraph>
          This application uses a deep learning model to classify brain MRI scans into four categories: 
          Glioma, Meningioma, Pituitary tumors, and normal brain scans (no tumor).
        </Typography>
        
        <Typography variant="body1" paragraph>
          Built with TensorFlow and transfer learning techniques using the Xception architecture, 
          our model achieves 99.24% test accuracy and features a rapid inference time of only 23ms per image.
        </Typography>
        
        <Typography variant="body1" paragraph>
          The system provides healthcare professionals with a tool to assist in the preliminary 
          analysis of brain MRI scans, highlighting potential areas of concern while maintaining 
          high precision and recall rates (both exceeding 98%).
        </Typography>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Disclaimer
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" paragraph>
          This application is intended for educational and research purposes only. It should not be used 
          as a replacement for professional medical diagnosis or advice.
        </Typography>
        
        <Typography variant="body1" paragraph>
          While our model demonstrates high accuracy in research settings, it has not been certified 
          for clinical use. Always consult with qualified healthcare professionals for medical concerns.
        </Typography>
      </Paper>
    </Container>
  );
}

export default AboutPage;