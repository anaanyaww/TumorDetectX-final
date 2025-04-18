// src/pages/NotFound.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

function NotFound() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 5, mt: 6, textAlign: 'center' }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to="/"
          sx={{ mt: 3 }}
        >
          Return to Home
        </Button>
      </Paper>
    </Container>
  );
}

export default NotFound;