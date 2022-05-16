from django.db import models
from klinik.models import TenagaMedisProfile


class Pasien(models.Model):
    nik = models.CharField(max_length=20, unique=True)
    full_name = models.TextField("Nama Lengkap")

    def __str__(self) -> str:
        return self.nik


class RekamanMedis(models.Model):
    fields = models.JSONField("Fields", default=list)
    time_created = models.DateField(auto_now_add=True)
    author = models.ForeignKey(TenagaMedisProfile, on_delete=models.CASCADE)
    patient = models.ForeignKey(Pasien, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.patient) + ": " + str(self.time_created)
