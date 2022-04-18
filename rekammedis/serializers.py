from rest_framework import serializers
from rekammedis.models import Pasien, RekamanMedis


class PasienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pasien
        fields = ["id", "nik", "full_name"]
        read_only_fields = ["id"]


class RekamanMedisSerializer(serializers.ModelSerializer):
    class Meta:
        model = RekamanMedis
        fields = ["id", "fields", "time_created", "author", "patient"]
        read_only_fields = ["id", "time_created", "author", "patient"]

    fields = serializers.ListField(child=serializers.JSONField())
