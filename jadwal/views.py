# django imports
from django.db import models

# rest imports
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

# model and serializer imports
from .models import JadwalTenagaMedis
from jadwal.serializers import JadwalTenagaMedisSerializer
from klinik.models import Cabang, TenagaMedisProfile

# other import
from urllib.request import Request
from jiva_be.utils import IsStafPermission


def get_object(klass: models.Model, pk: int):
    try:
        return klass.objects.get(pk=pk)
    except klass.DoesNotExist:
        return None


class JadwalTenagaMedisListAPI(APIView):

    permission_classes = [
        IsStafPermission
    ]

    def get(self, request: Request, cabang_id: int, format=None):
        cabang = get_object(Cabang, pk=cabang_id)
        if cabang is None:
            return Response(
                {"error": f"no 'cabang' found with id : {cabang_id}"},
                status=status.HTTP_404_NOT_FOUND,
            )
        tenaga_medis_profiles = TenagaMedisProfile.objects.filter(cabang=cabang)
        jadwal_query = []
        for tenaga_medis in tenaga_medis_profiles:
            jadwal_query += JadwalTenagaMedis.objects.filter(tenaga_medis=tenaga_medis)
        serializer = JadwalTenagaMedisSerializer(jadwal_query, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

