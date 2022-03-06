from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from klinik import views

app_name = "klinik"

klinik_patterns = [
    path("", views.KlinikList.as_view(), name="klinik-list"),
    path("<int:pk>/", views.KlinikAPI.as_view(), name="klinik-detail"),
]

klinik_patterns = format_suffix_patterns(klinik_patterns)

cabang_patterns = [
    path("", views.CabangListApi.as_view(), name="cabang-list"),
    path("<int:pk>/", views.CabangDetailApi.as_view(), name="cabang-detail"),
]

cabang_patterns = format_suffix_patterns(cabang_patterns)

urlpatterns = [
    path("cabang/", include(cabang_patterns)),
    path("", include(klinik_patterns)),
]