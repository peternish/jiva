# django imports
from email.policy import HTTP
from jiva_be.utils import IsStafPermission
from .serializers import AccountSerializer, StafAccountSerializer, StafProfileSerializer, TenagaMedisAccountSerializer
from .models import Account
from klinik.models import Cabang, OwnerProfile, StafProfile
from django.db import models
from urllib.request import Request

# rest imports
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.decorators import api_view
from rest_framework.views import APIView


def get_object(model: models.Model, pk: int):
    try:
        return model.objects.get(pk=pk)
    except model.DoesNotExist:
        return None

def get_profile(model: models.Model, account):
    try:
        return model.objects.get(account=account)
    except model.DoesNotExist:
        return None

@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def register(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.save()
        account = Account.objects.get(email=email)
        profile = OwnerProfile(account=account)
        profile.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StafListApi(APIView):
    permission_classes = [
        IsStafPermission
    ]

    def post(self, request, location):
        cabang_location = location
        serializer = StafAccountSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.save()
            account = Account.objects.get(email=email)
            try:
                cabang = Cabang.objects.get(location = cabang_location)
            except Cabang.DoesNotExist:
                return Response({ "error" : f"no 'cabang' found with location : {cabang_location}" }, status=status.HTTP_404_NOT_FOUND)
            profile = StafProfile(account=account, cabang=cabang)
            profile.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, location):
        cabang = Cabang.objects.get(location = location)
        staf_profiles = StafProfile.objects.filter(cabang=cabang)
        serializer = StafProfileSerializer(staf_profiles, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StafApi(APIView):

    permission_classes = [
        IsStafPermission,
    ]

    def get(self, request: Request, pk: int, format=None):
        account = get_object(Account, pk)
        staf_profile = get_profile(StafProfile, account)
        serializer = StafProfileSerializer(staf_profile)
        if staf_profile is not None:
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request: Request, pk: int, format=None):
        account = get_object(Account, pk)
        if account is None:
            return Response({ 'error' : 'Not Found'},status=status.HTTP_404_NOT_FOUND)
        serializer = StafAccountSerializer(instance= account, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int, format=None):
        account = get_object(Account, pk)
        if account is not None:
            account.delete()
            return Response({ 'success' : 'Delete Success'}, status=status.HTTP_200_OK)
        else:
            return Response({ 'error' : 'Not Found'},status=status.HTTP_404_NOT_FOUND)