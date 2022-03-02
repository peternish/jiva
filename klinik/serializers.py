from rest_framework import serializers
from klinik.models import Cabang


class CabangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cabang
        fields = ["id", "klinik_id", "location"]
        read_only_fields = ["id", "klinik_id"]
