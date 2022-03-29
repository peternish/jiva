# django imports
from django.urls import path, include
from .views import *

# rest imports
from rest_framework.urlpatterns import format_suffix_patterns

app_name = "jadwal"

jadwal_tenaga_medis_patterns = [
    path("<int:cabang_id>/", JadwalTenagaMedisListAPI.as_view(), name="jadwal-tenaga-medis-list"),
]

jadwal_tenaga_medis_patterns = format_suffix_patterns(jadwal_tenaga_medis_patterns)

urlpatterns = [
    path("tenaga-medis/", include(jadwal_tenaga_medis_patterns)),
]
