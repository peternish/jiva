from urllib.request import Request
from .serializers import KlinikSerializer
from .models import Klinik
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

def get_object(klass: APIView, pk: int):
    try:
        return klass.objects.get(pk=pk)
    except klass.DoesNotExist:
        return None

class KlinikAPI(APIView):
    def get(self, request:Request, pk: int, format=None):
        klinik = get_object(Klinik, pk)
        serializer = KlinikSerializer(klinik)
        if klinik is not None:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request: Request, pk: int, format=None):
        klinik = get_object(Klinik, pk)
        serializer = KlinikSerializer(klinik, data=request.data)
        if serializer.is_valid() and klinik is not None:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int, format=None):
        klinik = get_object(Klinik, pk)
        if klinik is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        klinik.delete()
        return Response(status=status.HTTP_200_OK)
    