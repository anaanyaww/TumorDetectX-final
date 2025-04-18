# Brain Tumor MRI Classification System

An advanced deep learning system for brain tumor classification with explainable AI capabilities.

## Project Overview

This project implements a high-performance brain tumor diagnostic system that can classify MRI scans into four categories: glioma, meningioma, pituitary, and normal (no tumor) with exceptional accuracy.

## Key Features

- **High Accuracy Classification**: Achieves 99.24% test accuracy on multi-class tumor classification
- **Rapid Inference**: Low latency predictions (23ms per inference) suitable for clinical settings
- **Explainable AI**: Transparent decision-making through visualization and natural language explanations
- **Full-Stack Implementation**: Complete web application with React frontend and Flask backend
- **Interactive Visualizations**: Heatmap overlays that highlight regions of interest in MRI scans

## Technical Implementation

### Deep Learning Model

- Implemented transfer learning with Xception architecture
- Utilized progressive fine-tuning techniques for optimal performance
- Achieved exceptional metrics across all classes:
  - Precision: >98%
  - Recall: >98%
  - F1 Score: >98%

### Explainable AI Features

- **Grad-CAM Visualization**: Heat maps highlighting regions influencing the model's decision
- **Feature Importance Analysis**: Quantified importance of radiological features
- **Natural Language Explanations**: Medical terminology-rich descriptions of findings
- **Interactive Opacity Control**: Adjustable visualization overlay for detailed examination

### Medical Domain Integration

- Incorporated expert medical knowledge about tumor characteristics
- Contextual explanations of MRI findings based on tumor type
- Region-specific analysis based on expected tumor locations

## Future Work

- **Expanded Classification**: Expand the model to identify additional tumor subtypes and grades for more granular diagnostic support
- **3D Analysis**: Integrate volumetric 3D analysis using MRI sequences beyond single-slice images
- **Mobile Deployment**: Develop mobile applications for remote diagnosis in resource-limited settings
- **Advanced XAI Methods**: Implement additional XAI techniques such as LIME or SHAP for comparative explanations
- **Clinical Validation**: Conduct clinical validation studies with radiologists to measure impact on diagnostic accuracy and confidence

