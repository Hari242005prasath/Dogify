from django.urls import path
from . import views

urlpatterns = [
    path('generate_skin_report/', views.generate_skin_report, name='generate_skin_report'),  
    path('predict/', views.predict_dog_breed, name='predict_dog_breed'),

]