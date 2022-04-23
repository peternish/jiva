# rest imports
from typing_extensions import Required
from rest_framework import serializers

# model and serializer imports
from .models import JadwalTenagaMedis, JadwalPasien
from account.serializers import TenagaMedisProfileSerializer
from klinik.serializers import LamaranPasienSerializer

# other imports
from jadwal.utils import validate_time


class JadwalTenagaMedisSerializer(serializers.ModelSerializer):
    tenaga_medis = TenagaMedisProfileSerializer(read_only=True)

    class Meta:
        model = JadwalTenagaMedis
        fields = [
            "id",
            "tenaga_medis",
            "start_time",
            "end_time",
            "quota",
            "day",
        ]
        read_only_fields = [
            "id",
            "tenaga_medis",
        ]

    def create(self, validated_data):
        validation_errors = {}
        validation_errors.update(
            validate_time(
                tenaga_medis=validated_data["tenaga_medis"], data=validated_data
            )
        )
        if validated_data.get("quota") < 0:
            validation_errors.update({"quota": "should be a positive number"})
        if validation_errors:
            raise serializers.ValidationError(validation_errors)
        return super(JadwalTenagaMedisSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        validation_errors = {}
        validation_errors.update(
            validate_time(current_jadwal=instance, data=validated_data)
        )
        if validated_data.get("quota", instance.quota) < 0:
            validation_errors.update({"quota": "should be a positive number"})
        if validation_errors:
            raise serializers.ValidationError(validation_errors)
        instance.start_time = validated_data.get("start_time", instance.start_time)
        instance.end_time = validated_data.get("end_time", instance.end_time)
        instance.quota = validated_data.get("quota", instance.quota)
        instance.day = validated_data.get("day", instance.day)
        instance.save()
        return instance


class JadwalPasienSerializer(serializers.ModelSerializer):
    jadwalTenagaMedis = JadwalTenagaMedisSerializer(read_only=True)
    lamaranPasien = LamaranPasienSerializer(read_only=True)

    class Meta:
        model = JadwalPasien
        fields = ["id", "date", "jadwalTenagaMedis", "lamaranPasien"]
        read_only_fields = ["id", "jadwalTenagaMedis", "lamaranPasien"]