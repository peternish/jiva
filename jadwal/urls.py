# django imports
from django.urls import path, include
from .views import *

# rest imports
from rest_framework.urlpatterns import format_suffix_patterns

app_name = "jadwal"

jadwal_tenaga_medis_patterns = [
    path(
        "<int:cabang_id>/",
        JadwalTenagaMedisListAPI.as_view(),
        name="jadwal-tenaga-medis-list",
    ),
    path(
        "create/<int:tenaga_medis_id>/",
        CreateJadwalTenagaMedisAPI.as_view(),
        name="create-jadwal-tenaga-medis",
    ),
    path(
        "id/<int:jadwal_tenaga_medis_id>/",
        JadwalTenagaMedisAPI.as_view(),
        name="jadwal-tenaga-medis",
    ),
    path(
        "available/<int:cabang_id>/",
        AvailableJadwalTenagaMedisAPI.as_view(),
        name="available-jadwal-tenaga-medis",
    ),
]

jadwal_tenaga_medis_patterns = format_suffix_patterns(jadwal_tenaga_medis_patterns)

jadwal_pasien_patterns = [
    path(
        "<int:jadwal_tenaga_medis_pk>/",
        JadwalPasienListAPI.as_view(),
        name="jadwal-pasien-list",
    ),
    path("id/<int:pk>/", JadwalPasienAPI.as_view(), name="jadwal-pasien-detail"),
    path(
        "create/<int:jadwal_tenaga_medis_pk>/",
        CreateJadwalPasienAPI.as_view(),
        name="create-jadwal-pasien",
    ),
    path(
        "bycabang/<int:cabang_pk>",
        JadwalPasienListByCabangAPI.as_view(),
        name="jadwal-pasien-list-by-cabang",
    ),
]

jadwal_pasien_patterns = format_suffix_patterns(jadwal_pasien_patterns)

urlpatterns = [
    path("tenaga-medis/", include(jadwal_tenaga_medis_patterns)),
    path("pasien/", include(jadwal_pasien_patterns)),
]
