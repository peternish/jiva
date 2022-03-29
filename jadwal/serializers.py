# rest imports
from rest_framework import serializers

# model imports
from .models import JadwalTenagaMedis


class JadwalTenagaMedisSerializer(serializers.ModelSerializer):
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
            "tenaga_medis"
        ]

    def update(self, instance, validated_data):
        instance.start_time = validated_data.get("start_time", instance.start_time)
        instance.end_time = validated_data.get("end_time", instance.end_time)
        instance.quota = validated_data.get("quota", instance.quota)
        instance.day = validated_data.get("day", instance.day)
        instance.save()
        return instance
