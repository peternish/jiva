from dataclasses import fields
from imp import source_from_cache
from rest_framework import serializers
from yaml import serialize
from rekammedis.models import Pasien, RekamanMedis
from django.template.defaultfilters import slugify


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
