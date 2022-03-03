from django.http import HttpRequest
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


def get_cabang(request: Request) -> Response:
    id_cabang = request.query_params.get("cabang")
    # TODO: Handle cabang None
    query = Cabang.objects.get(id_cabang)
    serialized = CabangSerializer(query, context={'request': request})
    return Response(status=status.HTTP_200_OK, data=serialized)


def create_cabang(request: Request) -> Response:
    pass


def update_cabang(request: Request) -> Response:
    pass


def remove_cabang(request: Request) -> Response:
    pass
