from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from klinik import views

app_name = "klinik"

klinik_patterns = [
    path("", views.KlinikAPI.as_view(), name="klinik-list"),
]

klinik_patterns = format_suffix_patterns(klinik_patterns)

cabang_patterns = [
    path("", views.CabangListApi.as_view(), name="cabang-list"),
    path("<int:pk>/", views.CabangDetailApi.as_view(), name="cabang-detail"),
]

dform_patterns = [
    path(
        "<int:cabang_pk>/dform/", views.DynamicFormListApi.as_view(), name="dform-list"
    ),
    path(
        "dform/<int:pk>/",
        views.DynamicFormPublicApi.as_view(),
        name="dform-public",
    ),
    path(
        "<int:cabang_pk>/dform/<int:pk>/",
        views.DynamicFormDetailApi.as_view(),
        name="dform-detail",
    )
]

cabang_patterns = format_suffix_patterns(cabang_patterns + dform_patterns)


pasien_patterns = [
    path("", views.LamaranPasienApi.as_view(), name="pasien-list"),
    path("<int:pk>/", views.LamaranPasienApi.as_view(), name="pasien-detail"),
]

pasien_patterns = format_suffix_patterns(pasien_patterns)

urlpatterns = [
    path("pasien/", include(pasien_patterns)),
    path("cabang/", include(cabang_patterns)),
    path("", include(klinik_patterns)),
]
