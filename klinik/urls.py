from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from klinik import views

app_name = "klinik"

klinik_patterns = [
    # path('<int:pk>/', views.KlinikAPI.get_object, name="klinik_get"),
    # path('put/<int:pk>/', views.KlinikAPI.put, name="klinik_put"),
    # path('delete/<int:pk>/', views.KlinikAPI.delete, name="klinik_delete")
    path('<int:pk>/', views.KlinikAPI.as_view(), name="klinik-detail"),
]

klinik_patterns = format_suffix_patterns(klinik_patterns)

urlpatterns = [
    # path('<int:pk>/', views.KlinikAPI.get_object, name="get"),
    # path('put/<int:pk>/', views.KlinikAPI.put, name="put"),
    # path('delete/<int:pk>/', views.KlinikAPI.delete, name="delete")
    path("klinik/", include(klinik_patterns)),
]
