from dataclasses import fields
from rest_framework import serializers
from klinik.models import Klinik, Cabang, DynamicForm, LamaranPasien
from django.template.defaultfilters import slugify


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

    def create(self, validated_data):
        validated_data["location"] = slugify(validated_data["location"])
        return super(CabangSerializer, self).create(validated_data)

class LamaranPasienSerializer(serializers.ModelSerializer):
    class Meta:
        model = LamaranPasien
        fields = ["id", "nik", "fields"]
        read_only_fields = ["id", "nik"]

    fields = serializers.ListField(child=serializers.JSONField())

class DynamicFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = DynamicForm
        fields = ["id", "cabang_id", "formtype", "fields"]
        read_only_fields = ["id", "cabang_id"]

    fields = serializers.ListField(child=serializers.JSONField())
