import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from PIL import Image

# Load the model only once
MODEL_PATH = "dog_app/weights.best.Resnet.hdf5"
try:
    model = load_model(MODEL_PATH)
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

# Define the Dog Breeds (Ensure these match your model's output classes)
BREEDS = ["Labrador", "Beagle", "Golden Retriever", "Bulldog", "Poodle", "German Shepherd"]

@api_view(["POST"])
def predict_dog_breed(request):
    if "file" not in request.FILES:
        return JsonResponse({"error": "No file uploaded"}, status=400)
    
    file = request.FILES["file"]

    # Validate file type
    try:
        img = Image.open(file)
        img.verify()  # Verify image integrity
    except Exception:
        return JsonResponse({"error": "Invalid image file"}, status=400)

    # Save file temporarily
    file_path = default_storage.save(f"uploads/{file.name}", ContentFile(file.read()))
    img_path = default_storage.path(file_path)  # Get the full path

    try:
        # Load and preprocess the image
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Ensure model is loaded
        if model is None:
            return JsonResponse({"error": "Model not loaded"}, status=500)

        # Make a prediction
        preds = model.predict(img_array)
        breed_idx = np.argmax(preds)
        predicted_breed = BREEDS[breed_idx]

        return JsonResponse({"breed": predicted_breed, "confidence": float(np.max(preds))})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    finally:
        # Delete file after processing
        if os.path.exists(img_path):
            os.remove(img_path)
from django.http import JsonResponse



from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.contrib import messages




def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save() 
            messages.success(request, 'Registration complete! You can now login.')
            return redirect('login')  
        else:
            messages.error(request, 'Error: Unable to register. Please check the form.')
    else:
        form = UserCreationForm()

    return render(request, 'register.html', {'form': form})




def login_view(request):
    print("🚀 login_view function triggered")  
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        print(f"🔍 Attempting login with: {username}, {password}")  # Debugging

        user = authenticate(request, username="keerthi", password="keer12")
        print(user)
        if user is not None:
            print("✅ Authentication successful!")  # Debugging
            login(request, user)
            return redirect('http://localhost:3000/')
        else:
            print("❌ Authentication failed!")  # Debugging
            messages.error(request, 'Invalid credentials. Please try again.')

    return render(request, 'login.html')

