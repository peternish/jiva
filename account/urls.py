# django imports
from django.urls import path
from .views import register
from account import views
from django.urls import path, include

# rest imports
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



app_name = "account"

staf_patterns = [
    path("<slug:location>/", views.StafListApi.as_view(), name="staf-list"),
    path("id/<int:pk>/", views.StafApi.as_view(), name="staf-detail"),
]

staf_patterns = format_suffix_patterns(staf_patterns)

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("staf/", include(staf_patterns))
]