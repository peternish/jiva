# django imports
from jiva_be.utils import IsStafPermission
from .serializers import (
    AccountSerializer,
    StafAccountSerializer,
    StafProfileSerializer,
    TenagaMedisProfileSerializer,
    TokenObtainPairSerializer,
)
from .models import Account
from klinik.models import Cabang, OwnerProfile, StafProfile, TenagaMedisProfile
from django.db import models
from urllib.request import Request

# rest imports
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    qs = Account.objects.get(email=request.user)
    serializer = AccountSerializer(qs, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


class TokenObtainPairView(BaseTokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class StafListApi(APIView):
    permission_classes = [IsStafPermission]

    def post(self, request, cabang_id):
        serializer = StafAccountSerializer(data=request.data)
        if serializer.is_valid():
            try:
                cabang = Cabang.objects.get(id=cabang_id)
            except Cabang.DoesNotExist:
                return Response(
                    {"error": f"no 'cabang' found with id : {cabang_id}"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            email = serializer.save()
            account = Account.objects.get(email=email)
            profile = StafProfile(account=account, cabang=cabang)
            profile.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, cabang_id):
        cabang = Cabang.objects.get(id=cabang_id)
        staf_profiles = StafProfile.objects.filter(cabang=cabang)
        serializer = StafProfileSerializer(staf_profiles, many=True)
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
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = StafAccountSerializer(
            instance=account, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int, format=None):
        account = get_object(Account, pk)
        if account is not None:
            account.delete()
            return Response({"success": "Delete Success"}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TenagaMedisListApi(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, cabang_id):
        serializer = TenagaMedisProfileSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                cabang = Cabang.objects.get(id=cabang_id)
            except Cabang.DoesNotExist:
                return Response(
                    {"error": f"no 'cabang' found with id : {cabang_id}"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            account = Account.objects.create_user(
                email=request.data["account.email"],
                password=request.data["account.password"],
                full_name=request.data["account.full_name"],
            )
            serializer.save(cabang=cabang, account=account)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, cabang_id):
        cabang = Cabang.objects.get(id=cabang_id)
        teanga_medis_profiles = TenagaMedisProfile.objects.filter(cabang=cabang)
        serializer = TenagaMedisProfileSerializer(teanga_medis_profiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TenagaMedisApi(APIView):

    permission_classes = [
        IsStafPermission,
    ]

    def get(self, request: Request, pk: int, format=None):
        account = get_object(Account, pk)
        staf_profile = get_profile(TenagaMedisProfile, account)
        serializer = TenagaMedisProfileSerializer(staf_profile)
        if staf_profile is not None:
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request: Request, pk: int, format=None):
        account = get_object(Account, pk)
        profile = get_profile(TenagaMedisProfile, account=account)

        if not account or not profile:
            return Response(status=status.HTTP_404_NOT_FOUND)

        profile_serializer = TenagaMedisProfileSerializer(
            instance=profile, data=request.data, partial=True
        )
        if profile_serializer.is_valid(raise_exception=True):
            profile_serializer.save()
            return Response(profile_serializer.data)

        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk: int, format=None):
        account = get_object(Account, pk)
        if account is not None:
            account.delete()
            return Response({"success": "Delete Success"}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
