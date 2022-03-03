# django imports
from django.urls import path, include
from klinik import views

app_name = "klinik"

klinik_patterns = [
    path("all", views.get_all_cabang, name="get_all_cabang"),
    path("fetch", views.get_cabang, name="get_cabang"),
    path("register", views.create_cabang, name="create_cabang"),
    path("revise", views.update_cabang, name="update_cabang"),
    path("remove", views.remove_cabang, name="remove_cabang"),
]

urlpatterns = [
    path("cabang/", include(klinik_patterns)),
]
