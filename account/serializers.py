from rest_framework import serializers
from .models import Account
from django.contrib.auth.hashers import make_password


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["id", "full_name", "email", "password", "date_joined", "last_login"]

        read_only_fields = ["id", "date_joined", "last_login"]

        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data.get("password"))
        return super(AccountSerializer, self).create(validated_data)
