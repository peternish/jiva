from urllib.request import Request

from yaml import serialize
from rekammedis.models import Pasien, RekamanMedis
from rekammedis.serializers import PasienSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class PasienApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request: Request, format=None):
        from pprint import pprint
        pprint(request.data)
        nik = request.data["nik"]
        pasien = Pasien.objects.get(nik=nik)
        serializer = PasienSerializer(pasien)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PasienDetailApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request: Request, nik: str, format=None):
        pasien = Pasien.objects.get(nik=nik)
        serializer = PasienSerializer(pasien)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RekamMedisApi(APIView):
    pass


class RekamMedisDetilApi(APIView):
    pass
