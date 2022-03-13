# Django imports
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from klinik.models import StafProfile, TenagaMedisProfile, Profile, Klinik
from .models import Account
from django.contrib.auth.hashers import make_password

# Rest imports
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as BaseTokenObtainPairSerializer

class AccountSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    cabang = serializers.SerializerMethodField()
    klinik = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ["id", "full_name", "email", "password", "date_joined", "last_login", "role", "cabang", "klinik"]

        read_only_fields = ["id", "date_joined", "last_login", "role", "cabang", "klinik"]

        extra_kwargs = {"password": {"write_only": True}}

    def get_role(self, obj):
        profile = Profile.objects.get(account=obj)
        return profile.role
    
    def get_cabang(self, obj):
        profile = Profile.objects.get(account=obj)
        role = profile.role

        if (role == "owner"): 
            return None
        elif(role == "tenaga_medis"):
            tenaga_medis_profile = TenagaMedisProfile.objects.get(account=obj)
            return tenaga_medis_profile.cabang.id
        elif(role == "staf"):
            staf_profile = StafProfile.objects.get(account=obj)
            return staf_profile.cabang.id
    
    def get_klinik(self, obj):
        profile = Profile.objects.get(account=obj)
        role = profile.role

        if (role == "owner"):
            return None
        elif(role == "tenaga_medis"):
            tenaga_medis_profile = TenagaMedisProfile.objects.get(account=obj)
            return tenaga_medis_profile.cabang.klinik.id
        elif(role == "staf"):
            staf_profile = StafProfile.objects.get(account=obj)
            return staf_profile.cabang.klinik.id
        
    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data.get("password"))
        return super(AccountSerializer, self).create(validated_data)

class TokenObtainPairSerializer(BaseTokenObtainPairSerializer):
    default_error_messages = {
        "no_active_account": _("Akun tidak ditemukan")
    }

class StafAccountSerializer(serializers.ModelSerializer):
    role = serializers.CharField(default='staf')

    class Meta:
        model = Account
        fields = ["id", "full_name", "email", "password", "date_joined", "last_login", "role"]

        read_only_fields = ["id", "date_joined", "last_login"]

        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data.get("password"))
        validated_data.pop('role')
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
        read_only_fields = ['account']
    
    def update(self, instance, validated_data):
        account = instance.account
        sip = validated_data.pop('sip', None)
        account_data = validated_data.get('account', {})
        if sip:
            instance.sip = sip
        if account:
            account.email = account_data.get('email', account.email)
            account.full_name = account_data.get('full_name', account.full_name)
            account.password = account_data.get('password', account.password)
            account.save()
        return instance
