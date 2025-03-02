from django.urls import path
from . import views

urlpatterns = [
    path('generate_skin_report/', views.generate_skin_report, name='generate_skin_report'),  

]