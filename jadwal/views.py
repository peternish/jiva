# django imports
from django.db import models

# rest imports
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers

# model and serializer imports
from .models import JadwalTenagaMedis, JadwalPasien
from jadwal.serializers import JadwalTenagaMedisSerializer, JadwalPasienSerializer
from klinik.models import Cabang, LamaranPasien, TenagaMedisProfile

# other import
from urllib.request import Request
from jiva_be.utils import IsStafPermission
import json
from datetime import datetime, timedelta
from .utils import filter_available_jadwal


def get_object(klass: models.Model, pk: int):
    try:
        return klass.objects.get(pk=pk)
    except klass.DoesNotExist:
        return None


class JadwalTenagaMedisListAPI(APIView):

    permission_classes = [IsStafPermission]

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


class CreateJadwalTenagaMedisAPI(APIView):

    permission_classes = [IsStafPermission]

    def post(self, request: Request, tenaga_medis_id: int, format=None):
        tenaga_medis = get_object(TenagaMedisProfile, pk=tenaga_medis_id)
        if tenaga_medis is None:
            return Response(
                {"error": f"no 'tenaga medis' found with id : {tenaga_medis_id}"},
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

    permission_classes = [IsStafPermission]

    def get(self, request: Request, jadwal_tenaga_medis_id: int, format=None):
        jadwal_tenaga_medis = get_object(JadwalTenagaMedis, pk=jadwal_tenaga_medis_id)
        if jadwal_tenaga_medis is None:
            return Response(
                {
                    "error": f"no 'jadwal tenaga medis' found with id : {jadwal_tenaga_medis_id}"
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = JadwalTenagaMedisSerializer(jadwal_tenaga_medis)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, jadwal_tenaga_medis_id: int, format=None):
        jadwal_tenaga_medis = get_object(JadwalTenagaMedis, pk=jadwal_tenaga_medis_id)
        if jadwal_tenaga_medis is None:
            return Response(
                {
                    "error": f"no 'jadwal tenaga medis' found with id : {jadwal_tenaga_medis_id}"
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = JadwalTenagaMedisSerializer(
            instance=jadwal_tenaga_medis, data=request.data, partial=True
        )
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
                {
                    "error": f"no 'jadwal tenaga medis' found with id : {jadwal_tenaga_medis_id}"
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        jadwal_tenaga_medis.delete()
        return Response({"success": "delete success"}, status=status.HTTP_200_OK)


class AvailableJadwalTenagaMedisAPI(APIView):
    def get(self, request: Request, cabang_id: int, format=None):
        cabang = get_object(Cabang, pk=cabang_id)
        if cabang is None:
            return Response(
                {"error": f"no 'cabang' found with id : {cabang_id}"},
                status=status.HTTP_404_NOT_FOUND,
            )
        current_date = datetime.today()
        current_day = current_date.weekday()
        start_query_day = current_day + 1 if current_day < 6 else 0
        query_days = [x[0] for x in JadwalTenagaMedis.DAY_CHOICES][start_query_day:]
        tenaga_medis_profiles = TenagaMedisProfile.objects.filter(cabang=cabang)
        jadwal_tenaga_medis_query = []
        for tenaga_medis in tenaga_medis_profiles:
            jadwal_tenaga_medis_query += JadwalTenagaMedis.objects.filter(tenaga_medis=tenaga_medis, day__in=query_days)
        start_date = current_date + timedelta(days=1)
        end_date = current_date + timedelta(days=7 if current_day == 6 else 6 - current_day)
        available_jadwal_list = filter_available_jadwal(
            jadwal_tenaga_medis_query=jadwal_tenaga_medis_query,
            start_date=start_date,
            end_date=end_date
        )
        serializer = JadwalTenagaMedisSerializer(available_jadwal_list, many=True)
        timedelta_inc = 0
        for jadwal in serializer.data:
            jadwal["date"] = (start_date + timedelta(days=timedelta_inc)).date()
            timedelta_inc += 1
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class JadwalPasienListAPI(APIView):

    permission_classes = [IsStafPermission]

    def get(self, request: Request, jadwal_tenaga_medis_pk: int):
        jadwal_tenaga_medis: JadwalTenagaMedis = get_object(
            JadwalTenagaMedis, jadwal_tenaga_medis_pk
        )

        if jadwal_tenaga_medis is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        schema = JadwalPasien.objects.all()
        schema = schema.filter(jadwalTenagaMedis=jadwal_tenaga_medis)
        serializer = JadwalPasienSerializer(schema, many=True)
        return Response(serializer.data)


class CreateJadwalPasienAPI(APIView):

    permission_classes = [IsStafPermission]

    def post(self, request: Request, jadwal_tenaga_medis_pk: int, pasien_pk: int):
        jadwal_tenaga_medis: JadwalTenagaMedis = get_object(
            JadwalTenagaMedis, jadwal_tenaga_medis_pk
        )
        lamaran_pasien: LamaranPasien = get_object(LamaranPasien, pasien_pk)
        
        if jadwal_tenaga_medis is None and lamaran_pasien is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        count = JadwalPasien.objects.filter(jadwalTenagaMedis=jadwal_tenaga_medis).count()
        if count >= jadwal_tenaga_medis.quota:
            return Response(
                { "error": f"Telah melewati batas kuota JadwalTenagaMedis ({count} >= {jadwal_tenaga_medis.quota})" }
                , status=status.HTTP_400_BAD_REQUEST)

        serializer = JadwalPasienSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                jadwalTenagaMedis=jadwal_tenaga_medis, lamaranPasien=lamaran_pasien
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JadwalPasienAPI(APIView):

    permission_classes = [IsStafPermission]

    def get(self, request: Request, pk: int):
        try:
            jadwal_pasien = get_object(JadwalPasien, pk)
            serializer = JadwalPasienSerializer(jadwal_pasien)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except JadwalPasien.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request: Request, pk: int):
        jadwal_pasien = get_object(JadwalPasien, pk)
        serializer = JadwalPasienSerializer(jadwal_pasien, data=request.data)
        if serializer.is_valid() and jadwal_pasien is not None:
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int):
        jadwal_pasien = get_object(LamaranPasien, pk)
        if jadwal_pasien is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        jadwal_pasien.delete()
        return Response(status=status.HTTP_200_OK)
