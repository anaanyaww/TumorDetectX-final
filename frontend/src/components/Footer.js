// frontend/src/components/Footer.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Brain MRI Analysis Tool
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: 'grey.400' }}>
              An advanced neural network-powered tool for analyzing brain MRI scans
              and detecting various types of brain tumors with high accuracy.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/" color="inherit">
                Home
              </Link>
              <Link component={RouterLink} to="/analyze" color="inherit">
                Analyze MRI
              </Link>
              <Link component={RouterLink} to="/how-it-works" color="inherit">
                How It Works
              </Link>
              <Link component={RouterLink} to="/about" color="inherit">
                About
              </Link>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Disclaimer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: 'grey.400' }}>
              This tool is for educational and research purposes only. It should not replace 
              professional medical diagnosis. Always consult with healthcare professionals for 
              medical advice.
            </Typography>
          </Grid>
        </Grid>
        
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ color: 'grey.500' }}>
            © {new Date().getFullYear()} Brain MRI Analysis Tool. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;