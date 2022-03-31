# django imports
from django.db import models

# rest imports
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers

# model and serializer imports
from .models import JadwalTenagaMedis
from jadwal.serializers import JadwalTenagaMedisSerializer
from klinik.models import Cabang, TenagaMedisProfile

# other import
from urllib.request import Request
from jiva_be.utils import IsStafPermission
import json


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
                { "error": f"no 'cabang' found with id : {cabang_id}" },
                status=status.HTTP_404_NOT_FOUND,
            )
        tenaga_medis_profiles = TenagaMedisProfile.objects.filter(cabang=cabang)
        jadwal_query = []
        for tenaga_medis in tenaga_medis_profiles:
            jadwal_query += JadwalTenagaMedis.objects.filter(tenaga_medis=tenaga_medis)
        serializer = JadwalTenagaMedisSerializer(jadwal_query, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class CreateJadwalTenagaMedisAPI(APIView):

    permission_classes = [
        IsStafPermission
    ]

    def post(self, request: Request, tenaga_medis_id: int, format=None):
        tenaga_medis = get_object(TenagaMedisProfile, pk=tenaga_medis_id)
        if tenaga_medis is None:
            return Response(
                { "error": f"no 'tenaga medis' found with id : {tenaga_medis_id}" },
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = JadwalTenagaMedisSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save(tenaga_medis=tenaga_medis)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except serializers.ValidationError as errors:
                errors = json.loads(json.dumps(errors.__dict__["detail"]))
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JadwalTenagaMedisAPI(APIView):

    permission_classes = [
        IsStafPermission
    ]

    def get(self, request: Request, jadwal_tenaga_medis_id: int, format=None):
        jadwal_tenaga_medis = get_object(JadwalTenagaMedis, pk=jadwal_tenaga_medis_id)
        if jadwal_tenaga_medis is None:
            return Response(
                { "error": f"no 'jadwal tenaga medis' found with id : {jadwal_tenaga_medis_id}" },
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = JadwalTenagaMedisSerializer(jadwal_tenaga_medis)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, jadwal_tenaga_medis_id: int, format=None):
        jadwal_tenaga_medis = get_object(JadwalTenagaMedis, pk=jadwal_tenaga_medis_id)
        if jadwal_tenaga_medis is None:
            return Response(
                { "error": f"no 'jadwal tenaga medis' found with id : {jadwal_tenaga_medis_id}" },
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = JadwalTenagaMedisSerializer(instance=jadwal_tenaga_medis, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except serializers.ValidationError as errors:
                errors = json.loads(json.dumps(errors.__dict__["detail"]))
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request: Request, jadwal_tenaga_medis_id: int, format=None):
        jadwal_tenaga_medis = get_object(JadwalTenagaMedis, pk=jadwal_tenaga_medis_id)
        if jadwal_tenaga_medis is None:
            return Response(
                { "error": f"no 'jadwal tenaga medis' found with id : {jadwal_tenaga_medis_id}" },
                status=status.HTTP_404_NOT_FOUND,
            )
        jadwal_tenaga_medis.delete()
        return Response(
            { "success": "delete success" }, 
            status=status.HTTP_200_OK
        )
