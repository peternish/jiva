from rest_framework import serializers
from klinik.models import Klinik, Cabang


class KlinikSerializer(serializers.ModelSerializer):
    class Meta:
        model = Klinik
        fields = ["id", "owner_id", "name", "sik"]
        read_only_fields = ["id", "owner_id"]


class CabangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cabang
        fields = ["id", "klinik_id", "location"]
        read_only_fields = ["id", "klinik_id"]
