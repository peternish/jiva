# django imports
from django.urls import path
from .views import register, TokenObtainPairView

# rest imports
from rest_framework_simplejwt.views import TokenRefreshView

app_name = "account"

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
]
