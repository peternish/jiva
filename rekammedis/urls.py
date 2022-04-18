from django.urls import path
from rekammedis import views

app_name = "ehr"

urlpatterns = [
    path("/", views.RekamMedisApi.as_view(), name="rekam-medis"),
    path("pasien/", views.PasienApi.as_view(), name="pasien"),
    path("pasien/<str:nik>/", views.PasienDetailApi.as_view(), name="pasien-detail"),
    path("rekaman/<int:id>/", views.RekamMedisDetilApi.as_view(),
         name="detil-rekam-medis")
]
