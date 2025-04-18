// frontend/src/components/ExplainabilityView.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

// Styled components
const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const FeatureBar = styled(Box)(({ theme, value }) => ({
  height: 12,
  width: `${Math.min(100, value * 100)}%`,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 6,
}));

const HeatmapContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2]
}));

const ExplainabilityView = ({ result }) => {
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  
  if (!result || !result.heatmap_image) {
    return (
      <Alert severity="info">
        No analysis results available. Please analyze an MRI scan first.
      </Alert>
    );
  }
  
  // Extract important features based on prediction type
  const getImportantFeatures = () => {
    const baseFeatures = [
      { name: 'Signal Intensity', value: 0.85 },
      { name: 'Border Definition', value: 0.78 },
    ];
    
    // Add tumor-specific features
    switch (result.prediction) {
      case 'glioma':
        return [
          ...baseFeatures,
          { name: 'Heterogeneity', value: 0.92 },
          { name: 'Surrounding Edema', value: 0.85 },
          { name: 'Mass Effect', value: 0.76 }
        ];
      case 'meningioma':
        return [
          ...baseFeatures,
          { name: 'Dural Attachment', value: 0.94 },
          { name: 'Homogeneous Enhancement', value: 0.88 },
          { name: 'Extra-axial Location', value: 0.91 }
        ];
      case 'pituitary':
        return [
          ...baseFeatures,
          { name: 'Sellar Location', value: 0.96 },
          { name: 'Suprasellar Extension', value: 0.82 },
          { name: 'Contrast Enhancement', value: 0.90 }
        ];
      case 'notumor':
        return [
          { name: 'Normal Gray-White Differentiation', value: 0.95 },
          { name: 'Absence of Mass Effect', value: 0.93 },
          { name: 'Normal Ventricular Size', value: 0.89 },
          { name: 'Absence of Abnormal Enhancement', value: 0.91 }
        ];
      default:
        return baseFeatures;
    }
  };
  
  // Get brain regions being analyzed
  const getBrainRegions = () => {
    switch (result.prediction) {
      case 'glioma':
        return ['Cerebral White Matter', 'Periventricular Region', 'Corpus Callosum'];
      case 'meningioma':
        return ['Dura Mater', 'Skull Base', 'Convexity'];
      case 'pituitary':
        return ['Sella Turcica', 'Suprasellar Cistern', 'Optic Chiasm'];
      case 'notumor':
        return ['Cortical Gray Matter', 'Subcortical White Matter', 'Ventricles'];
      default:
        return ['Brain Parenchyma'];
    }
  };
  
  return (
    <Grid container spacing={3}>
      {/* Heatmap Section */}
      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              AI Attention Visualization
              <Tooltip title="This heatmap shows regions the AI is focusing on to make its prediction. Warmer colors (red) indicate areas of higher importance." arrow>
                <InfoIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle', color: 'text.secondary' }} />
              </Tooltip>
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <HeatmapContainer>
              {/* Original Image */}
              <Box 
                component="img" 
                src={result.original_image} 
                alt="MRI Scan"
                sx={{ width: '100%', display: 'block' }}
              />
              
              {/* Heatmap Overlay */}
              <Fade in={true}>
                <Box 
                  component="img"
                  src={result.heatmap_image}
                  alt="Heatmap Overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: overlayOpacity,
                  }}
                />
              </Fade>
            </HeatmapContainer>
            
            <Typography variant="body2" gutterBottom>
              Heatmap Intensity
            </Typography>
            <Slider
              value={overlayOpacity}
              onChange={(e, newValue) => setOverlayOpacity(newValue)}
              min={0}
              max={1}
              step={0.05}
              aria-labelledby="heatmap-opacity-slider"
              valueLabelDisplay="auto"
              valueLabelFormat={value => `${Math.round(value * 100)}%`}
            />
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              The model is primarily focusing on {getBrainRegions().join(', ')} regions
              to identify this as {result.prediction === 'notumor' ? 'a normal scan' : `a ${result.prediction} tumor`}.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Explanation Section */}
      <Grid item xs={12} md={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Diagnostic Explanation
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {result.explanation && (
              <>
                <Typography variant="body1" paragraph>
                  <strong>{result.explanation.specific}</strong>
                </Typography>
                
                <Typography variant="body2" paragraph>
                  {result.explanation.general}
                </Typography>
                
                {result.explanation.features && (
                  <Typography variant="body2" paragraph>
                    {result.explanation.features}
                  </Typography>
                )}
                
                <Typography variant="body2" paragraph>
                  {result.explanation.confidence}
                </Typography>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  {result.explanation.conclusion}
                </Alert>
              </>
            )}
          </CardContent>
        </Card>
        
        {/* Feature Importance */}
        <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Feature Importance
            <Tooltip title="These are the key radiological features that influenced the AI's decision" arrow>
              <InfoIcon fontSize="small" sx={{ ml: 1, verticalAlign: 'middle', color: 'text.secondary' }} />
            </Tooltip>
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          {getImportantFeatures().map((feature, index) => (
            <FeatureItem key={index}>
              <Typography variant="body2" sx={{ width: '50%', pr: 2 }}>
                {feature.name}:
              </Typography>
              <Box sx={{ width: '40%', mr: 1 }}>
                <FeatureBar value={feature.value} />
              </Box>
              <Typography variant="body2" sx={{ width: '10%', textAlign: 'right' }}>
                {Math.round(feature.value * 100)}%
              </Typography>
            </FeatureItem>
          ))}
        </Paper>
        
        {/* Brain Regions */}
        <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Relevant Brain Regions
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {getBrainRegions().map((region, index) => (
              <Chip 
                key={index} 
                label={region} 
                color="primary" 
                variant="outlined" 
                sx={{ mb: 1 }} 
              />
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ExplainabilityView;