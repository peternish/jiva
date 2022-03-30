from django.db import models
from klinik.models import TenagaMedisProfile


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
