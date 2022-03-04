from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from klinik import views

app_name = "klinik"

cabang_patterns = [
    path('', views.CabangListApi.as_view()),
    path('<int:pk>/', views.CabangDetailApi.as_view()),
]

cabang_patterns = format_suffix_patterns(cabang_patterns)

urlpatterns = [
    path("cabang/", include(cabang_patterns)),
]
