from .serializers import KlinikSerializer
from .models import Klinik
from .forms import KlinikForm
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(["POST"])
def create_klinik(request):
    pass

def update_klinik(request):
    pass

def remove_klinik(request):
    pass

def get_klinik(request):
    pass