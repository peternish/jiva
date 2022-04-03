from django.db import models
from klinik.models import TenagaMedisProfile, LamaranPasien


class JadwalTenagaMedis(models.Model):
    DAY_CHOICES = (
        ("mon", "Monday"),
        ("tue", "Tuesday"),
        ("wed", "Wednesday"),
        ("thu", "Thursday"),
        ("fri", "Friday"),
        ("sat", "Saturday"),
        ("sun", "Sunday"),
    )

    tenaga_medis = models.ForeignKey(
        TenagaMedisProfile, 
        on_delete=models.CASCADE, 
        related_name="jadwal_tenaga_medis"
    )
    start_time = models.TimeField()
    end_time = models.TimeField()
    quota = models.IntegerField()
    day = models.CharField(max_length=3, choices=DAY_CHOICES)

    def __str__(self) -> str:
        return f"{self.tenaga_medis.account}'s Jadwal"


class JadwalPasien(models.Model):
    date = models.DateField()
    lamaranPasien = models.OneToOneField(
        LamaranPasien, on_delete=models.CASCADE)
    jadwalTenagaMedis = models.ForeignKey(
        JadwalTenagaMedis, on_delete=models.CASCADE, related_name="jadwal_pasien")
    def __str__(self) -> str:
        return f"Jadwal pasien dengan NIK:{self.lamaranPasien.nik}"