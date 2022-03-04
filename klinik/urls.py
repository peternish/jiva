from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from klinik import views

app_name = "klinik"

klinik_patterns = [
    path('/<int:pk>/', views.KlinikAPI.as_view(), name="klinik_detail"),
]

klinik_patterns = format_suffix_patterns(klinik_patterns)

urlpatterns = [
    path("klinik/", include(klinik_patterns)),
]
