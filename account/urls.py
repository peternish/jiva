# django imports
from django.urls import path
from .views import register

# rest imports
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

app_name='account'

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
]