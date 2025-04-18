// frontend/src/pages/AnalyzePage.js
import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ExplainIcon from '@mui/icons-material/Psychology';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ExplainabilityView from '../components/ExplainabilityView';

// API endpoint for predictionsconst API_URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/predict';


// Styled components
const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[50],
  border: `2px dashed ${theme.palette.grey[300]}`,
  cursor: 'pointer',
  transition: 'border .3s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ResultCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
}));

// Custom tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analysis-tabpanel-${index}`}
      aria-labelledby={`analysis-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function AnalyzePage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setError(null);
    
    // Validate file
    if (!selectedFile) return;
    
    if (!selectedFile.type.includes('image/')) {
      setError('Please select an image file');
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };
  
  // Handle analysis submission
  const handleSubmit = async () => {
    if (!file) {
      setError('Please select an MRI scan image first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Send to API
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Process result
      setResult(response.data);
      console.log("API Response:", response.data);
      
      // Reset to first tab to show results
      setTabValue(0);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError(err.response?.data?.error || 'Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Format the probability data for the chart
  const formatProbabilityData = (probabilities) => {
    if (!probabilities) return [];
    
    return Object.keys(probabilities).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      probability: probabilities[key] * 100,
    }));
  };
  
  // Get diagnosis color based on result
  const getDiagnosisColor = (prediction) => {
    if (!prediction) return 'grey.500';
    
    if (prediction === 'notumor') {
      return 'success.main';
    }
    return 'error.main';
  };
  
  // Get diagnosis message
  const getDiagnosisMessage = (prediction) => {
    if (!prediction) return '';
    
    if (prediction === 'notumor') {
      return 'No tumor detected';
    }
    
    const tumorTypes = {
      glioma: 'Glioma tumor detected',
      meningioma: 'Meningioma tumor detected',
      pituitary: 'Pituitary tumor detected'
    };
    
    return tumorTypes[prediction] || 'Tumor detected';
  };
  
  // Get diagnosis icon
  const getDiagnosisIcon = (prediction) => {
    if (!prediction) return null;
    
    if (prediction === 'notumor') {
      return <CheckCircleIcon color="success" fontSize="large" />;
    }
    
    return <WarningIcon color="error" fontSize="large" />;
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        Brain MRI Analysis
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph></Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Upload a brain MRI scan to detect and classify potential tumors with AI-powered explanations
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Upload Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography component="h2" variant="h5" gutterBottom>
              Upload MRI Scan
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <UploadBox>
              <Box component="label" sx={{ display: 'block', cursor: 'pointer' }}>
                <CloudUploadIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Drop your MRI scan here
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or click to browse files
                </Typography>
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Box>
            </UploadBox>
            
            {preview && (
              <Box mt={3} textAlign="center">
                <Typography variant="subtitle1" gutterBottom>
                  Selected Image:
                </Typography>
                <Box
                  component="img"
                  src={preview}
                  alt="MRI Scan Preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    mt: 1,
                    border: '1px solid #ddd',
                    borderRadius: 1
                  }}
                />
              </Box>
            )}
            
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={!file || loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? 'Analyzing...' : 'Analyze MRI Scan'}
              </Button>
            </Box>
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Paper>
        </Grid>
        
        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h5" gutterBottom>
              Analysis Results
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {loading ? (
              <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Analyzing MRI scan...
                </Typography>
                <Box sx={{ width: '80%', mt: 3 }}>
                  <LinearProgress />
                </Box>
              </Box>
            ) : result ? (
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Tab Navigation */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange} 
                    aria-label="analysis tabs"
                    variant="fullWidth"
                  >
                    <Tab 
                      label="Results" 
                      id="analysis-tab-0" 
                      aria-controls="analysis-tabpanel-0" 
                    />
                    <Tab 
                      label="Explain AI" 
                      id="analysis-tab-1" 
                      aria-controls="analysis-tabpanel-1"
                      icon={<ExplainIcon />}
                      iconPosition="start"
                    />
                  </Tabs>
                </Box>
                
                {/* Results Tab */}
                <TabPanel value={tabValue} index={0}>
                  {/* Diagnosis */}
                  <Box mb={4} display="flex" alignItems="center" justifyContent="center">
                    {getDiagnosisIcon(result.prediction)}
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ ml: 1, color: getDiagnosisColor(result.prediction) }}
                    >
                      {getDiagnosisMessage(result.prediction)}
                    </Typography>
                  </Box>
                  
                  {/* Confidence */}
                  <Box mb={4} textAlign="center">
                    <Typography variant="body1" gutterBottom>
                      Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong>
                    </Typography>
                  </Box>
                  
                  {/* Probability Chart */}
                  <Typography variant="h6" gutterBottom>
                    Class Probabilities
                  </Typography>
                  <Box height={300} mb={2}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={formatProbabilityData(result.probabilities)}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'Probability']} />
                        <Legend />
                        <Bar
                          dataKey="probability"
                          fill="#8884d8"
                          radius={[0, 4, 4, 0]}
                          label={{ position: 'right', formatter: (value) => `${value.toFixed(1)}%` }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                  
                  {/* Switch to Explainability */}
                  <Box textAlign="center" mt={3}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setTabValue(1)}
                      startIcon={<ExplainIcon />}
                    >
                      See AI Explanation
                    </Button>
                  </Box>
                </TabPanel>
                
                {/* Explainability Tab */}
                <TabPanel value={tabValue} index={1}>
                  <ExplainabilityView result={result} />
                </TabPanel>
                
                {/* Additional Information */}
                <Box mt="auto">
                  <Alert severity="info">
                    <Typography variant="body2">
                      This analysis is provided for educational purposes only. Please consult with a healthcare professional for medical advice.
                    </Typography>
                  </Alert>
                </Box>
              </Box>
            ) : (
              <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, color: 'text.secondary' }}>
                <Typography variant="body1" align="center">
                  Upload an MRI scan and click "Analyze" to see results here.
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 2, maxWidth: '80%' }}>
                  Our model detects and classifies brain tumors into three categories: Glioma, Meningioma, and Pituitary tumors, as well as identifies normal brain scans.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Additional information section */}
      <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          About the Analysis
        </Typography>
        <Typography variant="body2" paragraph>
          This tool uses a deep learning model based on the Xception architecture, trained on thousands of MRI scans to identify brain tumors with 99.2% accuracy.
        </Typography>
        <Typography variant="body2" paragraph>
          The model can detect four distinct categories: Glioma tumors, Meningioma tumors, Pituitary tumors, and normal brain scans (no tumor).
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>New:</strong> Our explainable AI technology now provides visual explanations of the model's decisions, highlighting the specific regions of the MRI scan that influenced the classification, making the AI's reasoning transparent and interpretable.
        </Typography>
      </Paper>
    </Container>
  );
}

export default AnalyzePage;