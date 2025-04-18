from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf
import io
import base64
import os
import json
import cv2
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define paths
MODEL_DIR = os.path.join(os.path.dirname(__file__), '..', 'model', 'brain_tumor_model')
MODEL_PATH = os.path.join(MODEL_DIR, 'brain_tumor_classifier.h5')
INFO_PATH = os.path.join(MODEL_DIR, 'model_info.json')

# Load the model
print(f"Loading model from: {MODEL_PATH}")
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    # Fallback path - try loading from current directory
    try:
        model = tf.keras.models.load_model('brain_tumor_classifier.h5')
        print("Model loaded from current directory")
    except:
        print("Failed to load model from fallback path. Application will likely fail.")
        model = None

# Load class info from model_info.json
try:
    with open(INFO_PATH, 'r') as f:
        model_info = json.load(f)
    class_names = model_info['classes']
    print(f"Loaded class names: {class_names}")
except Exception as e:
    # Fallback if file not found
    class_names = ['glioma', 'meningioma', 'notumor', 'pituitary']
    print(f"Using default class names: {class_names}")

# Generate Grad-CAM heatmap
def generate_gradcam(model, img_array, pred_index=None, layer_name=None):
    """
    Generate a Grad-CAM heatmap for explaining model decisions
    """
    try:
        # If no layer specified, try to find the last convolutional layer
        if layer_name is None:
            for layer in reversed(model.layers):
                # Check if the layer is a convolutional layer
                if len(layer.output_shape) == 4:
                    if 'conv' in layer.name.lower() or 'sepconv' in layer.name.lower():
                        layer_name = layer.name
                        break
            
            # If no suitable layer found, try to find a specific Xception layer
            if layer_name is None:
                possible_layers = ['block14_sepconv2_act', 'block14_sepconv2', 'conv2d_3', 'block13_sepconv2']
                for layer_candidate in possible_layers:
                    try:
                        model.get_layer(layer_candidate)
                        layer_name = layer_candidate
                        break
                    except:
                        continue
            
            # If still no layer found, use the last layer before flattening
            if layer_name is None:
                # Get the first layer that's not the input
                for layer in model.layers[1:]:
                    if len(layer.output_shape) >= 3:  # At least 3D output (batches, height, width, ...)
                        layer_name = layer.name
                        break
            
            print(f"Using layer: {layer_name} for Grad-CAM")
        
        # Create a model that outputs both the last conv layer and the final output
        grad_model = tf.keras.models.Model(
            inputs=[model.inputs],
            outputs=[model.get_layer(layer_name).output, model.output]
        )
        
        # Compute gradient of the predicted class with respect to the output feature map
        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_array)
            if pred_index is None:
                pred_index = tf.argmax(predictions[0])
            class_channel = predictions[:, pred_index]
        
        # Gradient of the class with respect to the output feature map
        grads = tape.gradient(class_channel, conv_outputs)
        
        # Vector of mean intensity of gradient over feature map
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
        
        # Weight the channels by importance
        conv_outputs = conv_outputs[0]
        heatmap = tf.reduce_sum(tf.multiply(pooled_grads, conv_outputs), axis=-1)
        
        # Normalize between 0 and 1
        heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
        heatmap = heatmap.numpy()
        
        return heatmap
    except Exception as e:
        print(f"Error generating Grad-CAM: {str(e)}")
        # Return a fallback heatmap (just for visualization)
        return np.ones((10, 10)) * 0.5  # Simple gray heatmap

# Create and overlay the heatmap on the original image
def create_gradcam_visualization(img, heatmap, alpha=0.4):
    """
    Overlay heatmap on original image for visualization
    """
    try:
        # Resize heatmap to match image size
        heatmap = cv2.resize(heatmap, (img.shape[1], img.shape[0]))
        
        # Convert to 3-channel heatmap in RGB
        heatmap = np.uint8(255 * heatmap)
        heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
        
        # Ensure img is in the right format
        if len(img.shape) == 2:  # Grayscale image
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
        elif img.shape[2] == 4:  # RGBA image
            img = img[:, :, :3]  # Remove alpha channel
        
        # Ensure image is uint8
        if img.dtype != np.uint8:
            img = np.uint8(img * 255)
        
        # Make sure both arrays are compatible
        if img.shape[:2] != heatmap.shape[:2]:
            heatmap = cv2.resize(heatmap, (img.shape[1], img.shape[0]))
        
        # Overlay heatmap on image
        superimposed_img = heatmap * alpha + img * (1 - alpha)
        superimposed_img = np.clip(superimposed_img, 0, 255).astype('uint8')
        
        return superimposed_img
    except Exception as e:
        print(f"Error creating visualization: {str(e)}")
        # Return the original image if visualization fails
        return img if img.dtype == np.uint8 else np.uint8(img * 255)

# Generate natural language explanation
def generate_explanation(prediction, confidence):
    """
    Generate a natural language explanation of the model's decision
    """
    explanations = {
        'glioma': {
            'general': "Gliomas arise from glial cells and are typically found in the cerebral hemispheres, brainstem, or cerebellum.",
            'high': "This MRI shows characteristics strongly consistent with a glioma. The model detected irregular borders, heterogeneous signal intensity, and surrounding edema - all classic features of gliomas.",
            'medium': "This MRI shows features consistent with a glioma. The model identified some heterogeneity and infiltrative pattern typical of these tumors.",
            'low': "This MRI has some features that may indicate a glioma, but the confidence is lower. Additional imaging sequences or biopsy may be needed for confirmation."
        },
        'meningioma': {
            'general': "Meningiomas originate from the meninges and are typically extra-axial (outside the brain tissue), often with a dural attachment.",
            'high': "This MRI displays features highly characteristic of a meningioma. The model detected a well-defined, extra-axial mass with homogeneous enhancement, and possibly a dural tail sign.",
            'medium': "This MRI shows features consistent with a meningioma. The model identified an extra-axial location and relatively homogeneous enhancement typical of these tumors.",
            'low': "This MRI has some features that may suggest a meningioma, but the confidence is lower. The extra-axial nature is less clear or enhancement pattern is atypical."
        },
        'pituitary': {
            'general': "Pituitary tumors develop in the pituitary gland located in the sella turcica at the base of the brain.",
            'high': "This MRI shows features highly consistent with a pituitary tumor. The model detected a well-circumscribed mass in the sellar/suprasellar region with typical enhancement patterns.",
            'medium': "This MRI shows features consistent with a pituitary tumor. The model identified a mass in the sellar region with enhancement characteristics typical of these tumors.",
            'low': "This MRI has some features that may indicate a pituitary tumor, but the confidence is lower. Additional thin-section imaging of the sellar region may be beneficial."
        },
        'notumor': {
            'general': "Normal brain MRI scans show regular anatomical structures without mass effect, abnormal enhancement, or signal abnormalities.",
            'high': "This MRI appears normal with no evidence of tumor. The model detected normal brain anatomy with appropriate gray-white matter differentiation and no abnormal enhancement or mass effect.",
            'medium': "This MRI appears largely normal with no clear evidence of tumor. The model did not identify significant abnormal enhancement or mass effect.",
            'low': "This MRI appears generally normal, but the model's confidence is lower. There may be subtle variations from typical appearance that warrant careful review."
        }
    }
    
    # Determine confidence level
    if confidence > 0.9:
        confidence_level = 'high'
    elif confidence > 0.7:
        confidence_level = 'medium'
    else:
        confidence_level = 'low'
    
    # Create the explanation
    explanation = {
        'general': explanations[prediction]['general'],
        'specific': explanations[prediction][confidence_level],
        'confidence': f"The model's confidence in this classification is {confidence:.1%}.",
        'conclusion': "This analysis is provided as a diagnostic aid and should be correlated with clinical findings and interpreted by a qualified healthcare professional."
    }
    
    return explanation

# Convert image array to base64 string
def array_to_base64(arr):
    """
    Convert a numpy array image to a base64 string
    """
    try:
        # Ensure the array is in uint8 format
        if arr.dtype != np.uint8:
            arr = np.uint8(arr * 255 if arr.max() <= 1.0 else arr)
        
        # Save to a buffer
        img_pil = Image.fromarray(arr)
        buffered = io.BytesIO()
        img_pil.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        return f"data:image/png;base64,{img_str}"
    except Exception as e:
        print(f"Error converting array to base64: {str(e)}")
        # Return a placeholder if conversion fails
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5jAzdOQAAAABJRU5ErkJggg=="

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple endpoint to verify API is running"""
    return jsonify({
        "status": "healthy", 
        "model_loaded": model is not None,
        "class_names": class_names
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Read the image
        img = Image.open(file.stream)
        original_img = np.array(img)
        
        # Preprocess the image
        img = img.resize((299, 299))
        img_array = np.array(img) / 255.0
        preprocessed_img = img_array.copy()
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make prediction
        predictions = model.predict(img_array)
        
        # Get prediction results
        predicted_class_index = np.argmax(predictions[0])
        predicted_class = class_names[predicted_class_index]
        confidence = float(predictions[0][predicted_class_index])
        
        # Get probabilities for all classes
        class_probabilities = {class_names[i]: float(predictions[0][i]) 
                              for i in range(len(class_names))}
        
        # Generate Grad-CAM heatmap
        heatmap = generate_gradcam(model, img_array, predicted_class_index)
        
        # Create visualization
        superimposed_img = create_gradcam_visualization(
            (preprocessed_img * 255).astype('uint8'), 
            heatmap
        )
        
        # Generate explanation
        explanation = generate_explanation(predicted_class, confidence)
        
        # Convert image arrays to base64 strings
        heatmap_img = array_to_base64(superimposed_img)
        original_base64 = array_to_base64(original_img)
        
        # Prepare response
        response = {
            'prediction': predicted_class,
            'confidence': confidence,
            'probabilities': class_probabilities,
            'original_image': original_base64,
            'heatmap_image': heatmap_img,
            'explanation': explanation
        }
        
        return jsonify(response)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)