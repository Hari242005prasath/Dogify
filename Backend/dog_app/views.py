from django.shortcuts import render
from django.http import JsonResponse
import tensorflow as tf
import numpy as np
from tensorflow.keras.utils import load_img, img_to_array
import os

# Load the trained model
MODEL_PATH = r"C:\Users\HARIPRASATH\Downloads\Dogify\Backend\dog_app\..\tf_model.h5"

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
        tf.keras.layers.Dense(120, activation='softmax')  # Adjust based on your dataset
    ])
    return model

model = create_model()
model.load_weights(MODEL_PATH)

# Class labels (ensure they match the training labels)
id2label = {
    "0": "Chihuahua", "1": "Japanese_spaniel", "2": "Maltese_dog",
    "3": "Pekinese", "4": "Shih-Tzu", "5": "Blenheim_spaniel",
    "6": "Papillon", "7": "Toy_terrier", "8": "Rhodesian_ridgeback",
    "9": "Afghan_hound"
    # Extend this with all 120 breeds
}

# Prediction view
def predict_dog_breed(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        image = load_img(image_file, target_size=(224, 224))
        image_array = img_to_array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions[0])
        breed_name = id2label.get(str(predicted_class), "Unknown Breed")

        return JsonResponse({"breed": breed_name})

    return JsonResponse({"error": "No image provided"}, status=400)
