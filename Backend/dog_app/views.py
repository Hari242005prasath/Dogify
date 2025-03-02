from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import google.generativeai as genai
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import re
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.charts.piecharts import Pie


# Configure Google API Key



import tensorflow as tf
import numpy as np
from django.http import JsonResponse
from django.shortcuts import render
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# Define the correct path for the model file
MODEL_PATH = r"C:\Users\HARIPRASATH\Downloads\Dogify\tf_model.h5"

# Define the model architecture (MUST MATCH the original training model)
def create_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(224, 224, 3)),
        tf.keras.layers.MaxPooling2D(2,2),
        tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2,2),
        tf.keras.layers.Conv2D(128, (3,3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2,2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(512, activation='relu'),
        tf.keras.layers.Dense(120, activation='softmax')  # Adjust based on your classes
    ])
    return model

# Load model and weights
model = create_model()
model.load_weights(MODEL_PATH)

# Class labels (Make sure these match the training labels)
id2label = {
    "0": "Chihuahua", "1": "Japanese_spaniel", "2": "Maltese_dog",
    "3": "Pekinese", "4": "Shih-Tzu", "5": "Blenheim_spaniel",
    "6": "Papillon", "7": "Toy_terrier", "8": "Rhodesian_ridgeback",
    "9": "Afghan_hound"
    # Add all 120 breeds from your dataset
}

# Function to predict the dog breed
def predict_dog_breed(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        image = load_img(image_file, target_size=(224, 224))
        image_array = img_to_array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        # Make prediction
        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions[0])
        breed_name = id2label.get(str(predicted_class), "Unknown Breed")

        return JsonResponse({"breed": breed_name})

    return JsonResponse({"error": "No image provided"}, status=400)
