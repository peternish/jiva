from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from klinik.serializers import CabangSerializer
from klinik.models import Cabang


class CabangListApi(APIView):
    def get(self, request: Request, format=None):
        klinik_id = request.query_params.get("klinik")
        if klinik_id is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        branches = Cabang.objects.all()
        branches = branches.filter(klinik__id=klinik_id)
        serializer = CabangSerializer(branches, many=True)
        return Response(serializer.data)

    def post(self, request: Request, format=None):
        serializer = CabangSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class CabangDetailApi(APIView):
    def get_object(self, pk: int):
        try:
            return Cabang.objects.get(pk=pk)
        except Cabang.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request: Request, pk: int, format=None):
        cabang = self.get_object(pk)
        serializer = CabangSerializer(cabang, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int, format=None):
        cabang = self.get_object(pk)
        cabang.delete()
        return Response(status=status.HTTP_200_OK)
