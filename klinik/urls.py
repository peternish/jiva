from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from klinik import views

cabang_patterns = [
    path('cabang/', views.CabangListApi.as_view()),
    path('cabang/<int:pk>/', views.CabangDetailApi.as_view()),
]

cabang_patterns = format_suffix_patterns(cabang_patterns)

urlpatterns = [
    path("cabang/", include(cabang_patterns)),
]
