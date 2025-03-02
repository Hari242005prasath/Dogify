from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_dog_breed, name='predict_dog_breed'),
    path("login/", views.login_view,name='login'),
    path("register/", views.register_view,name='register'),



]