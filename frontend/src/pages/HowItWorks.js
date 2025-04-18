// src/pages/HowItWorks.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

// Styled step component
const StepItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

function HowItWorks() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        How It Works
      </Typography>
      
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          The Technology Behind Our Brain MRI Analysis
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          Our brain tumor classification system leverages deep learning and neural networks to analyze 
          MRI scans with high accuracy. Here's a simplified explanation of how the technology works:
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <StepItem elevation={1}>
              <Typography variant="h6" gutterBottom color="primary">
                1. Deep Learning Model
              </Typography>
              <Typography variant="body2">
                We use the Xception neural network architecture, pre-trained on ImageNet and fine-tuned 
                on thousands of brain MRI scans. This transfer learning approach allows the model to 
                recognize subtle patterns in medical images.
              </Typography>
            </StepItem>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StepItem elevation={1}>
              <Typography variant="h6" gutterBottom color="primary">
                2. Image Preprocessing
              </Typography>
              <Typography variant="body2">
                When you upload an MRI scan, our system automatically resizes it to 299×299 pixels 
                and normalizes the pixel values to make the image compatible with our neural network.
              </Typography>
            </StepItem>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StepItem elevation={1}>
              <Typography variant="h6" gutterBottom color="primary">
                3. Classification
              </Typography>
              <Typography variant="body2">
                The model analyzes the preprocessed image and classifies it into one of four categories: 
                Glioma tumor, Meningioma tumor, Pituitary tumor, or no tumor. It also provides a 
                confidence score for each category.
              </Typography>
            </StepItem>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StepItem elevation={1}>
              <Typography variant="h6" gutterBottom color="primary">
                4. Result Visualization
              </Typography>
              <Typography variant="body2">
                The system presents results in an easy-to-understand format, showing the predicted 
                class and a probability distribution across all possible classes, helping healthcare 
                professionals make informed decisions.
              </Typography>
            </StepItem>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Technical Specifications
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Model Architecture
              </Typography>
              <Typography variant="body2">
                • Transfer learning with Xception<br />
                • 21.1 million parameters<br />
                • Trained on 5,712 MRI images<br />
                • 4-class classification
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <Typography variant="body2">
                • 99.24% test accuracy<br />
                • 99.7% precision<br />
                • 99.9% recall<br />
                • 23ms inference time
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Implementation
              </Typography>
              <Typography variant="body2">
                • React.js frontend<br />
                • Flask Python backend<br />
                • TensorFlow/Keras model<br />
                • RESTful API architecture
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default HowItWorks;