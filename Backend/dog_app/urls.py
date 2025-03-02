from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_dog_breed, name='predict_dog_breed'),

]