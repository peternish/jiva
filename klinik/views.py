from django.http import HttpRequest
from klinik import serializers
from klinik.serializers import CabangSerializer
from klinik.models import Cabang, Klinik
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.decorators import api_view


@api_view(["GET"])
def get_all_cabang(request: Request) -> Response:
    id_klinik = request.query_params.get("klinik")
    # TODO: Handle klinik None
    query = Cabang.objects.filter(klinik__id=id_klinik)
    serialized = CabangSerializer(
        query, many=True, context={'request': request})
    return Response(status=status.HTTP_200_OK, data=serialized)


@api_view(["GET"])
def get_cabang(request: Request) -> Response:
    id_cabang = request.query_params.get("cabang")
    # TODO: Handle cabang None
    query = Cabang.objects.get(id=id_cabang)
    serialized = CabangSerializer(query, context={'request': request})
    return Response(status=status.HTTP_200_OK, data=serialized)


@api_view(["POST"])
def create_cabang(request: Request) -> Response:
    klinik = request.params.get("klinik")
    location = request.params.get("location")
    if location is None:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    Cabang.objects.create(klinik__id=klinik, location=location)
    # TODO: Handle create fail
    return Response(status=status.HTTP_201_CREATED)
    pass


def update_cabang(request: Request) -> Response:
    pass


def remove_cabang(request: Request) -> Response:
    pass
