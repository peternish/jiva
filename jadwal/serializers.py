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

    
