from urllib.request import Request
from .serializers import KlinikSerializer
from .models import Klinik
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

class KlinikAPI(APIView):
    def get_object(self, pk: int):
        try:
            return Klinik.objects.get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request: Request, pk: int, format=None):
        klinik = self.get_object(pk)
        serializer = KlinikSerializer(klinik, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int, format=None):
        klinik = self.get_object(pk)
        klinik.delete()
        return Response(status=status.HTTP_200_OK)
    