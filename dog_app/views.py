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
genai.configure(api_key="AIzaSyBEjuyLDRRxkYef3KzBkbDO_xzEpDJMlTs")

# Load the trained disease prediction model
MODEL_PATH = "C:\\Users\\HARIPRASATH\\Downloads\\HC\\healthcare\\model.h5"
model = tf.keras.models.load_model(MODEL_PATH, compile=False)

# List of disease classes
disease_classes=['Actinic Keratoses',
   'Basal Cell Carcinoma',
   'Benign Keratosis',
   'Dermatofibroma',
   'Melanoma',
   'Melanocytic Nevi',
   'Vascular naevus'
]
@csrf_exempt

def generate_skin_report(request):
    if request.method == "POST" and request.FILES.get("image"):
        image_file = request.FILES["image"]

        try:
            # Preprocess the image
            image = Image.open(image_file).convert("RGB")
            image = image.resize((224, 224))  # Resize to model input size
            image_array = np.array(image) / 255.0  # Normalize
            image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

            # Predict the disease
            predictions = model.predict(image_array)
            predicted_class = disease_classes[np.argmax(predictions)]

            # Generate treatment plan using Gemini API
            prompt = (
                f"Provide a concise and meaningful treatment plan for {predicted_class} within a single page.\n\n"
                f"### Disease Name:\n"
                f"- {predicted_class}\n\n"
                f"### Treatments:\n"
                f"1. First treatment method\n"
                f"2. Second treatment method\n"
                f"3. Third treatment method\n\n"
                f"### Remedies:\n"
                f"1. Home remedy 1\n"
                f"2. Home remedy 2\n"
                f"3. Home remedy 3\n\n"
                f"### Precautions:\n"
                f"1. Important precaution 1\n"
                f"2. Important precaution 2\n"
                f"3. Important precaution 3\n"
                f"\nEnsure proper formatting and clarity in the response." 
            )

            gemini_model = genai.GenerativeModel("gemini-1.5-flash")
            response = gemini_model.generate_content(prompt)
            generated_text = response.text if hasattr(response, "text") else "No response generated."

            # Clean and format text
            cleaned_text = re.sub(r"\*\*(.*?)\*\*", r"\1", generated_text)  # Remove markdown bold
            cleaned_text = re.sub(r"\* (.*?)", r"- \1", cleaned_text)  # Convert bullet points

            # Generate PDF
            pdf_buffer = BytesIO()
            pdf = canvas.Canvas(pdf_buffer, pagesize=letter)
            margin = 50
            width, height = letter
            max_width = width - (2 * margin)
            y_position = height - 50  # Initial position

            # Title
            pdf.setFont("Helvetica-Bold", 16)
            pdf.drawCentredString(width / 2, y_position, "Skin Disease Report")
            y_position -= 40

            # Predicted Disease
            pdf.setFont("Helvetica-Bold", 12)
            pdf.drawString(margin, y_position, f"Predicted Disease: {predicted_class}")
            y_position -= 30

            # Treatment Plan Heading
            pdf.setFont("Helvetica-Bold", 13)
            pdf.drawString(margin, y_position, "Treatment Plan:")
            y_position -= 25

            # Content Formatting
            pdf.setFont("Helvetica", 11)
            for line in cleaned_text.split("\n"):
                wrapped_lines = simpleSplit(line, "Helvetica", 11, max_width)
                for wrapped_line in wrapped_lines:
                    if y_position <= margin:
                        pdf.showPage()
                        pdf.setFont("Helvetica", 11)
                        y_position = height - 50
                    pdf.drawString(margin, y_position, wrapped_line)
                    y_position -= 16  # Proper line spacing
                y_position -= 12  # Extra spacing between sections

            pdf.save()
            pdf_buffer.seek(0)

            # Return PDF as response
            response = HttpResponse(pdf_buffer, content_type="application/pdf")
            response["Content-Disposition"] = 'attachment; filename="skin_disease_report.pdf"'
            return response

        except Exception as e:
            return JsonResponse({"error": f"Error processing image: {str(e)}"}, status=500)

    return render(request, "generate_report.html")


def home(request):
    return render(request,'generate_report.html')