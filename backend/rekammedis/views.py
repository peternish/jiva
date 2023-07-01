from rekammedis.models import Pasien, RekamanMedis
from rekammedis.serializers import PasienSerializer, RekamanMedisSerializer
from klinik.models import TenagaMedisProfile
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class PasienApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request: Request, format=None):
        pasien = Pasien.objects.all()
        serializer = PasienSerializer(pasien, many=True)
        return Response(serializer.data)

    def post(self, request: Request, format=None):
        serializer = PasienSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class PasienDetailApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request: Request, nik: str, format=None):
        try:
            pasien = Pasien.objects.get(nik=nik)
            serializer = PasienSerializer(pasien)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Pasien.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RekamMedisApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request: Request, nik: str, format=None):
        try:
            pasien = Pasien.objects.get(nik=nik)
            ehr = RekamanMedis.objects.all()
            ehr = RekamanMedis.objects.filter(patient=pasien.id)
            serializer = RekamanMedisSerializer(ehr, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Pasien.DoesNotExist:
            return Response("Pasien not found", status=status.HTTP_404_NOT_FOUND)

    def post(self, request: Request, format=None) -> Response:
        serializer = RekamanMedisSerializer(data=request.data)
        nik = request.data.get("patient")
        try:
            author = TenagaMedisProfile.objects.get(
                account__email=request.user)
            patient = Pasien.objects.get(nik=nik)
            if serializer.is_valid():
                serializer.save(author=author, patient=patient)
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Pasien.DoesNotExist:
            return Response("Pasien not found", status=status.HTTP_404_NOT_FOUND)


class RekamMedisDetilApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def delete(self, request: Request, id: int, format=None):
        try:
            ehr = RekamanMedis.objects.get(id=id)
            ehr.delete()
            return Response(status=status.HTTP_200_OK)
        except RekamanMedis.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request: Request, id: int, format=None):
        try:
            ehr = RekamanMedis.objects.get(id=id)
            serializer = RekamanMedisSerializer(
                ehr, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except RekamanMedis.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request: Request, id: int, format=None):
        try:
            ehr = RekamanMedis.objects.get(id=id)
            serializer = RekamanMedisSerializer(ehr)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except RekamanMedis.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
