# rest imports
from rest_framework import serializers

# model and serializer imports
from .models import JadwalTenagaMedis
from account.serializers import TenagaMedisProfileSerializer

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
        time_validation_errors = validate_time(tenaga_medis=validated_data["tenaga_medis"], data=validated_data)
        if time_validation_errors:
            raise serializers.ValidationError(time_validation_errors)
        return super(JadwalTenagaMedisSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        time_validation_errors = validate_time(current_jadwal=instance, data=validated_data)
        if time_validation_errors:
            raise serializers.ValidationError(time_validation_errors)
        instance.start_time = validated_data.get("start_time", instance.start_time)
        instance.end_time = validated_data.get("end_time", instance.end_time)
        instance.quota = validated_data.get("quota", instance.quota)
        instance.day = validated_data.get("day", instance.day)
        instance.save()
        return instance
