from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rekammedis import views

app_name = "ehr"

urlpatterns = [
    path("<str:nik>/", views.RekamMedisApi.as_view(), name="rekam-medis"),
    path("<int:id>/", views.RekamMedisDetilApi.as_view(), name="detil-rekam-medis")
]
