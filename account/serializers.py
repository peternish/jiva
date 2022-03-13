from rest_framework import serializers

from klinik.models import Cabang, StafProfile, TenagaMedisProfile
from klinik.serializers import CabangSerializer
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


class StafAccountSerializer(serializers.ModelSerializer):
    role = serializers.CharField(default="staf")

    class Meta:
        model = Account
        fields = [
            "id",
            "full_name",
            "email",
            "password",
            "date_joined",
            "last_login",
            "role",
        ]

        read_only_fields = ["id", "date_joined", "last_login"]

        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data.get("password"))
        validated_data.pop("role")
        return super(StafAccountSerializer, self).create(validated_data)


class StafProfileSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = StafProfile
        fields = ["role", "account"]


class TenagaMedisProfileSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = TenagaMedisProfile
        fields = ["account", "sip"]
        read_only_fields = ["account"]

    def update(self, instance, validated_data):
        account = instance.account
        sip = validated_data.pop("sip", None)
        account_data = validated_data.get("account", {})
        if sip:
            instance.sip = sip
        if account:
            account.email = account_data.get("email", account.email)
            account.full_name = account_data.get("full_name", account.full_name)
            account.password = account_data.get("password", account.password)
            account.save()
        return instance
