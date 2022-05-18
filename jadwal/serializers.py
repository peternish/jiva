# rest imports
from rest_framework import serializers

from klinik.models import LamaranPasien

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
    lamaranPasien = LamaranPasienSerializer(required=False)

    class Meta:
        model = JadwalPasien
        fields = ["id", "date", "jadwalTenagaMedis", "lamaranPasien"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        """
        Overriding the default create method of the Model serializer.
        :param validated_data: data containing all the details of JadwalPasien
        :return: returns a successfully created JadwalPasien
        """

        lamaranPasienData = validated_data.pop('lamaranPasien')
        lamaranPasien = LamaranPasienSerializer.create(LamaranPasienSerializer(), validated_data=lamaranPasienData)

        jadwalPasien = JadwalPasien.objects.create(lamaranPasien=lamaranPasien, jadwalTenagaMedis=validated_data.pop('jadwalTenagaMedis'),
                            date=validated_data.pop('date'))
                            
        return jadwalPasien
