from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from klinik.serializers import CabangSerializer
from klinik.models import Cabang


class CabangListApi(APIView):
    def get(self, request: Request, format=None):
        klinik_id = request.data.get("klinik")
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
