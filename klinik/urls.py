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
    # path("<int:cabang_pk>/dform/<int:pk>/",
    #      views.CabangDetailApi.as_view(), name="dform-detail"),
]

cabang_patterns = format_suffix_patterns(cabang_patterns + dform_patterns)


urlpatterns = [
    path("cabang/", include(cabang_patterns)),
    path("", include(klinik_patterns)),
]
