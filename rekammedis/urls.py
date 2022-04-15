from django.urls import path
from rekammedis import views

app_name = "ehr"

urlpatterns = [
    path("<str:nik>/", views.RekamMedisApi.as_view(), name="rekam-medis"),
    path("<int:id>/", views.RekamMedisDetilApi.as_view(), name="detil-rekam-medis")
]
