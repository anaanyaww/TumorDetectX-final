// src/pages/MedicalInfo.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function MedicalInfo() {
  // Placeholder for actual MRI images - replace with real images
  const gliomaMriUrl = "/api/placeholder/500/300";
  const meningiomaMriUrl = "/api/placeholder/500/300";
  const pituitaryMriUrl = "/api/placeholder/500/300";
  const normalMriUrl = "/api/placeholder/500/300";
  
  // MRI sequence types information
  const mriSequences = [
    {
      type: "T1-weighted",
      appearance: "Fluid appears dark, fat appears bright",
      usage: "Good for anatomical detail and detecting enhancing lesions with contrast"
    },
    {
      type: "T2-weighted",
      appearance: "Fluid appears bright, fat appears bright",
      usage: "Excellent for detecting edema, inflammation, and demyelination"
    },
    {
      type: "FLAIR",
      appearance: "Most fluid suppressed, pathological fluid remains bright",
      usage: "Best for detecting lesions near cerebrospinal fluid spaces"
    },
    {
      type: "Diffusion-weighted (DWI)",
      appearance: "Restricted diffusion appears bright",
      usage: "Used for detecting acute ischemia and highly cellular tumors"
    },
    {
      type: "T1 with Gadolinium contrast",
      appearance: "Areas with disrupted blood-brain barrier appear bright",
      usage: "Highlights active tumor regions and vascular abnormalities"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        Medical Information: Brain Tumors & MRI
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Understanding brain tumors, MRI technology, and diagnostic considerations
      </Typography>
      
      {/* Types of Brain Tumors Section */}
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Types of Brain Tumors
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          Brain tumors are abnormal growths of cells in the brain. They can be primary (originating in the brain) 
          or secondary (metastasized from elsewhere in the body). Our classification system focuses on three 
          common types of primary brain tumors, as well as identifying normal brain tissue.
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Glioma */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="200"
                image={gliomaMriUrl}
                alt="Glioma MRI"
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Glioma
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Origin:</strong> Derived from glial cells (astrocytes, oligodendrocytes, or ependymal cells)
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Characteristics:</strong> Most common type of primary brain tumor, accounting for about 
                  33% of all brain tumors. They can be low-grade (slow-growing) or high-grade (fast-growing).
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>MRI Appearance:</strong> Often appears as a heterogeneously enhancing mass with surrounding 
                  edema. High-grade gliomas typically show irregular borders, necrosis, and significant 
                  contrast enhancement.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> Can occur anywhere in the brain but commonly found in the cerebral hemispheres, 
                  brainstem, and cerebellum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Meningioma */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="200"
                image={meningiomaMriUrl}
                alt="Meningioma MRI"
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Meningioma
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Origin:</strong> Arises from the meninges, the protective membranes covering the brain and spinal cord
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Characteristics:</strong> Second most common primary brain tumor, accounting for about 
                  30% of cases. Typically slow-growing and often benign (non-cancerous).
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>MRI Appearance:</strong> Usually appears as a well-defined, homogeneously enhancing 
                  extra-axial mass. Often shows a characteristic "dural tail" sign where the tumor 
                  appears to extend along the dura mater.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> Commonly found along the surface of the brain, especially near the falx cerebri, 
                  convexity, and skull base.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Pituitary Tumor */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="200"
                image={pituitaryMriUrl}
                alt="Pituitary Tumor MRI"
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Pituitary Tumor
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Origin:</strong> Develops in the pituitary gland at the base of the brain
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Characteristics:</strong> Accounts for about 10-15% of all intracranial neoplasms. 
                  Most are benign adenomas that may be hormone-secreting or non-secreting.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>MRI Appearance:</strong> Typically appears as a well-circumscribed enhancing mass 
                  within the sella turcica, which may extend upward into the suprasellar cistern. 
                  Micro-adenomas (less than 10mm) may be difficult to detect.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> Exclusively found in the sella turcica at the skull base, 
                  sometimes extending upward to compress the optic chiasm.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Normal Brain Tissue */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="200"
                image={normalMriUrl}
                alt="Normal Brain MRI"
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Normal Brain Tissue
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Characteristics:</strong> Normal brain tissue shows distinct boundaries between gray matter 
                  (primarily neuronal cell bodies) and white matter (primarily myelinated axons).
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>MRI Appearance:</strong> Shows clear differentiation between gray and white matter. 
                  Ventricles appear dark on T1-weighted images and bright on T2-weighted images. 
                  No abnormal enhancement or mass effect is present.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Importance:</strong> Being able to recognize normal brain tissue is essential for 
                  identifying pathological conditions and avoiding false positives.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      {/* MRI Technology Section */}
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Understanding MRI Technology
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          Magnetic Resonance Imaging (MRI) is a non-invasive imaging technology that produces detailed three-dimensional 
          anatomical images without using radiation. It's particularly useful for examining soft tissues in the brain.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          MRI Sequence Types
        </Typography>
        
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell><Typography variant="subtitle1" fontWeight="bold">Sequence Type</Typography></TableCell>
                <TableCell><Typography variant="subtitle1" fontWeight="bold">Appearance</Typography></TableCell>
                <TableCell><Typography variant="subtitle1" fontWeight="bold">Primary Use</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mriSequences.map((sequence, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                  <TableCell><Typography variant="body2" fontWeight="medium">{sequence.type}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{sequence.appearance}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{sequence.usage}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Interpreting Brain MRI Scans
        </Typography>
        
        <Typography variant="body1" paragraph>
          When examining brain MRI scans, radiologists look for several key features:
        </Typography>
        
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" variant="body1" paragraph>
            <strong>Signal Intensity:</strong> Different tissues appear with varying brightness levels on different MRI sequences
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            <strong>Enhancement Pattern:</strong> How the tissue absorbs contrast material can indicate blood-brain barrier disruption
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            <strong>Morphology:</strong> The shape, margins, and homogeneity of a lesion
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            <strong>Location:</strong> The anatomical position of abnormalities
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            <strong>Mass Effect:</strong> Whether the lesion displaces normal structures
          </Typography>
          <Typography component="li" variant="body1">
            <strong>Surrounding Edema:</strong> Presence of excess fluid around a lesion
          </Typography>
        </Box>
      </Paper>
      
      {/* AI in Medical Imaging Section */}
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          AI in Medical Imaging: Capabilities and Limitations
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          Artificial intelligence, particularly deep learning, has shown great promise in medical imaging analysis, 
          but it's important to understand both its strengths and limitations.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" gutterBottom color="primary.main">
                Capabilities
              </Typography>
              <Box component="ul" sx={{ pl: 4 }}>
                <Typography component="li" variant="body2" paragraph>
                  <strong>Pattern Recognition:</strong> AI excels at identifying patterns in images that may be subtle 
                  or difficult for humans to detect consistently
                </Typography>
                <Typography component="li" variant="body2" paragraph>
                  <strong>Consistency:</strong> AI systems don't experience fatigue or distraction, providing 
                  consistent analysis across large numbers of images
                </Typography>
                <Typography component="li" variant="body2" paragraph>
                  <strong>Speed:</strong> Can analyze images rapidly, potentially reducing diagnostic delays
                </Typography>
                <Typography component="li" variant="body2">
                  <strong>Quantification:</strong> Able to precisely measure features and changes over time
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" gutterBottom color="error.main">
                Limitations
              </Typography>
              <Box component="ul" sx={{ pl: 4 }}>
                <Typography component="li" variant="body2" paragraph>
                  <strong>Limited Contextual Understanding:</strong> AI typically doesn't incorporate patient history, 
                  symptoms, or other clinical factors
                </Typography>
                <Typography component="li" variant="body2" paragraph>
                  <strong>Training Data Dependence:</strong> Performance is limited by the quality and diversity 
                  of training data, potentially leading to biases
                </Typography>
                <Typography component="li" variant="body2" paragraph>
                  <strong>Edge Cases:</strong> May struggle with unusual presentations or rare conditions
                </Typography>
                <Typography component="li" variant="body2">
                  <strong>"Black Box" Nature:</strong> Deep learning models often can't explain their reasoning, 
                  making verification challenging
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Important Note:
          </Typography>
          <Typography variant="body2">
            Our AI system is designed to assist radiologists and healthcare professionals, not replace them. 
            The classifications provided should always be verified by qualified medical professionals and considered 
            alongside the patient's complete clinical picture.
          </Typography>
        </Box>
      </Paper>
      
      {/* FAQs Section */}
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="medium">
              What are the common symptoms of brain tumors?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Symptoms vary widely depending on tumor size, type, and location. Common symptoms include headaches 
              (especially in the morning), seizures, vision problems, balance issues, personality changes, 
              nausea/vomiting, and difficulty with speech or language. Some tumors may be asymptomatic 
              and discovered incidentally during imaging for other conditions.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="medium">
              How accurate is MRI for detecting brain tumors?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              MRI is highly sensitive for detecting brain tumors, with detection rates above 95% for most tumor types. 
              However, small tumors (under a few millimeters) or certain locations may be challenging to detect. 
              Additionally, MRI can sometimes struggle to differentiate between tumor types or between tumors and 
              other conditions like infection or inflammation, which is why biopsy is often necessary for definitive diagnosis.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="medium">
              What should I expect during a brain MRI?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              During a brain MRI, you'll lie on a movable table that slides into the MRI machine, which is a large 
              tube-shaped magnet. The procedure is painless but noisy (earplugs are typically provided). You'll need 
              to remain still for 30-60 minutes. Some exams require an injection of contrast material. If you have 
              claustrophobia, you might be prescribed a mild sedative or be offered an open MRI machine if available.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="medium">
              How does this AI system compare to a radiologist's diagnosis?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Our AI system achieves 99.24% accuracy on test datasets, which is comparable to experienced radiologists 
              in tumor detection. However, radiologists bring contextual understanding, clinical correlation, and experience 
              with edge cases that AI currently cannot match. The AI is best used as a supplementary tool to assist 
              radiologists, potentially helping with triage, providing a "second opinion," or highlighting areas for closer 
              examination.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="medium">
              What other tests might be needed besides MRI?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              While MRI provides excellent anatomical detail, additional tests are often needed for comprehensive diagnosis:
              <ul>
                <li>Biopsy: To determine tumor type and grade definitively</li>
                <li>CT scan: Sometimes used for emergency evaluations or for patients who cannot undergo MRI</li>
                <li>MR Spectroscopy: To analyze the chemical composition of tumor tissue</li>
                <li>Functional MRI: To map critical brain areas before surgery</li>
                <li>PET scan: To measure metabolic activity and distinguish between tumor and radiation necrosis</li>
                <li>Angiography: To visualize blood vessels feeding the tumor</li>
                <li>Lumbar puncture: In some cases, to examine cerebrospinal fluid</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
      
      {/* References Section */}
      <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          References & Further Reading
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Medical Organizations
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 4 }}>
          <Typography component="li" variant="body2" paragraph>
            <Link href="https://www.abta.org/" target="_blank" rel="noopener">
              American Brain Tumor Association
            </Link>
            {" — Comprehensive information on brain tumor types, treatments, and support resources"}
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            <Link href="https://www.braintumour.ca/" target="_blank" rel="noopener">
              Brain Tumour Foundation of Canada
            </Link>
            {" — Educational resources and patient support programs"}
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            <Link href="https://www.cancer.gov/types/brain" target="_blank" rel="noopener">
              National Cancer Institute - Brain Tumors
            </Link>
            {" — Information on brain tumor diagnosis, treatment, and research"}
          </Typography>
          <Typography component="li" variant="body2">
            <Link href="https://www.who.int/news-room/fact-sheets/detail/cancer" target="_blank" rel="noopener">
              World Health Organization - Cancer
            </Link>
            {" — Global statistics and health information on cancer including brain tumors"}
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom>
          Scientific Literature
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" variant="body2" paragraph>
            Louis DN, Perry A, Reifenberger G, et al. The 2016 World Health Organization Classification of Tumors of the Central Nervous System: a summary. Acta Neuropathol. 2016;131(6):803-820.
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            Bakas S, Reyes M, Jakab A, et al. Identifying the Best Machine Learning Algorithms for Brain Tumor Segmentation, Progression Assessment, and Overall Survival Prediction in the BRATS Challenge. arXiv preprint arXiv:1811.02629. 2018.
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            Hosny A, Parmar C, Quackenbush J, Schwartz LH, Aerts HJWL. Artificial intelligence in radiology. Nat Rev Cancer. 2018;18(8):500-510.
          </Typography>
          <Typography component="li" variant="body2">
            Tandel GS, Biswas M, Kakde OG, et al. A Review on a Deep Learning Perspective in Brain Cancer Classification. Cancers (Basel). 2019;11(1):111.
          </Typography>
        </Box>
      </Paper>
      
      <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.lighter', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom align="center">
          Medical Disclaimer
        </Typography>
        <Typography variant="body2" align="center">
          The information provided on this website is for educational purposes only and is not intended as a substitute 
          for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare 
          provider with any questions regarding a medical condition. Never disregard professional medical advice or 
          delay seeking it because of something you have read on this website.
        </Typography>
      </Box>
    </Container>
  );
}

export default MedicalInfo;