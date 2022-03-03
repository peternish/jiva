from rest_framework import serializers
from klinik.models import Klinik


class KlinikSerializer(serializers.ModelSerializer):
    class Meta:
        model = Klinik
        fields = ["id", "owner_id", "name"]
        read_only_fields = ["id", "owner_id"]