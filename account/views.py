# django imports
from .serializers import AccountSerializer
from .models import Account
from klinik.models import OwnerProfile

# rest imports
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.decorators import api_view


@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def register(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.save()
        account = Account.objects.get(email=email)
        owner_profile = OwnerProfile(account=account)
        owner_profile.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
