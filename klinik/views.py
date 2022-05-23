# django imports
from django.db import models
from django.http import QueryDict

# rest imports
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.views import APIView

# model and serializer imports
from klinik.models import Cabang, Klinik, OwnerProfile, DynamicForm, LamaranPasien
from jadwal.models import JadwalTenagaMedis
from .serializers import (
    DynamicFormSerializer,
    KlinikSerializer,
    CabangSerializer,
    LamaranPasienSerializer,
)
from jadwal.serializers import JadwalPasienSerializer

# other import
from urllib.request import Request
from klinik.utils import send_confirmation_email
from os import getenv


def get_object(klass: models.Model, pk: int):
    try:
        return klass.objects.get(pk=pk)
    except klass.DoesNotExist:
        return None


class KlinikAPI(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get_klinik(self, request: Request):
        owner = OwnerProfile.objects.get(account__email=request.user)
        try:
            klinik = Klinik.objects.get(owner=owner)
            return klinik
        except Klinik.DoesNotExist:
            return None

    def post(self, request):
        owner = OwnerProfile.objects.get(account__email=request.user)
        serializer = KlinikSerializer(data=request.data)
        klinik_exist = Klinik.objects.filter(owner=owner).count() > 0
        if serializer.is_valid() and owner is not None and not klinik_exist:
            serializer.save(owner=owner)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request: Request, format=None):
        klinik = self.get_klinik(request)
        serializer = KlinikSerializer(klinik)
        if klinik is not None:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request: Request, format=None):
        klinik = self.get_klinik(request)
        serializer = KlinikSerializer(klinik, data=request.data, partial=True)
        if serializer.is_valid() and klinik is not None:
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, format=None):
        klinik = self.get_klinik(request)
        if klinik is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        klinik.delete()
        return Response(status=status.HTTP_200_OK)


class CabangListApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request: Request, format=None):
        owner = OwnerProfile.objects.get(account__email=request.user)
        klinik = Klinik.objects.get(owner=owner)
        branches = Cabang.objects.all()
        branches = branches.filter(klinik=klinik)
        serializer = CabangSerializer(branches, many=True)
        return Response(serializer.data)

    def post(self, request: Request, format=None):
        owner = OwnerProfile.objects.get(account__email=request.user)
        klinik = Klinik.objects.get(owner=owner)
        serializer = CabangSerializer(data=request.data)
        if serializer.is_valid() and klinik is not None:
            serializer.save(klinik=klinik)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CabangDetailApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request: Request, pk: int, format=None):
        cabang = get_object(Cabang, pk)
        serializer = CabangSerializer(cabang)
        if cabang is not None:
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request: Request, pk: int, format=None):
        cabang = get_object(Cabang, pk)
        serializer = CabangSerializer(cabang, data=request.data)
        if serializer.is_valid() and cabang is not None:
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int, format=None):
        cabang = get_object(Cabang, pk)
        if cabang is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        cabang.delete()
        return Response(status=status.HTTP_200_OK)


class DynamicFormListApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request: Request, cabang_pk: int, format=None) -> Response:
        cabang: Cabang = get_object(Cabang, cabang_pk)
        if cabang is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        schema = DynamicForm.objects.all()
        schema = schema.filter(cabang=cabang)
        serializer = DynamicFormSerializer(schema, many=True)
        return Response(serializer.data)

    def post(self, request: Request, cabang_pk: int, format=None) -> Response:
        cabang: Cabang = get_object(Cabang, cabang_pk)
        cabang_id = request.data.get("cabang")
        if cabang_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        cabang_payload: Cabang = get_object(Cabang, cabang_id)
        if cabang_payload is None or int(cabang_id) != cabang_pk:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DynamicFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cabang=cabang)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DynamicFormPublicApi(APIView):
    def get(self, request: Request, pk: int) -> Response:
        schema: DynamicForm = get_object(DynamicForm, pk)

        if schema is not None:
            serializer = DynamicFormSerializer(schema)
            return Response(data=serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)


class DynamicFormDetailApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def _is_legally_owned(
        self, request: Request, cabang: Cabang, schema: DynamicForm
    ) -> bool:
        owner: OwnerProfile = OwnerProfile.objects.get(account__email=request.user)
        klinik: Klinik = Klinik.objects.get(owner=owner)

        return cabang.pk == schema.cabang.pk and cabang.klinik.pk == klinik.pk

    def patch(self, request: Request, cabang_pk: int, pk: int, format=None):
        schema: DynamicForm = get_object(DynamicForm, pk)
        cabang: Cabang = get_object(Cabang, cabang_pk)
        if cabang is None or schema is None or schema.cabang.pk != cabang_pk:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DynamicFormSerializer(schema, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, cabang_pk: int, pk: int, format=None):
        schema: DynamicForm = get_object(DynamicForm, pk)
        if schema is None or schema.cabang.pk != cabang_pk:
            return Response(status=status.HTTP_404_NOT_FOUND)
        schema.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

class LamaranPasienApi(APIView):

    permission_classes = [
        IsAuthenticated,
    ]

    def post(self, request: Request):
        serializer = LamaranPasienSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request: Request, pk: int):
        try:
            lamaran_pasien = get_object(LamaranPasien, pk)
            serializer = LamaranPasienSerializer(lamaran_pasien)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except LamaranPasien.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request: Request, pk: int):
        lamaran_pasien = get_object(LamaranPasien, pk)
        serializer = LamaranPasienSerializer(lamaran_pasien, data=request.data)
        if serializer.is_valid() and lamaran_pasien is not None:
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int):
        lamaran_pasien = get_object(LamaranPasien, pk)
        if lamaran_pasien is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        lamaran_pasien.delete()
        return Response(status=status.HTTP_200_OK)
