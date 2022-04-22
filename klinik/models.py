from email.policy import default
from django.db import models
from account.models import Account


class Profile(models.Model):
    ROLE_CHOICES = (
        ("owner", "Owner"),
        ("staf", "Staf"),
        ("tenaga_medis", "Tenaga Medis"),
    )
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    account = models.OneToOneField(Account, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.account.email}'s Profile"


class OwnerProfile(Profile):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.role = "owner"


class Klinik(models.Model):
    name = models.CharField(max_length=100)
    owner = models.OneToOneField(OwnerProfile, on_delete=models.CASCADE)
    sik = models.FileField()


class Cabang(models.Model):
    location = models.CharField(max_length=300)
    klinik: Klinik = models.ForeignKey(Klinik, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.location


class StafProfile(Profile):
    cabang = models.ForeignKey(
        Cabang, on_delete=models.CASCADE, related_name="staf")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.role = "staf"


class TenagaMedisProfile(Profile):
    cabang = models.ForeignKey(
        Cabang, on_delete=models.CASCADE, related_name="tenaga_medis"
    )
    sip = models.FileField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.role = "tenaga_medis"

class LamaranPasien(models.Model):
    nik = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    fields = models.JSONField("Fields", default=list)
    def __str__(self) -> str:
        return self.nik

class DynamicForm(models.Model):
    cabang = models.ForeignKey(Cabang, on_delete=models.CASCADE)
    formtype = models.CharField(max_length=100)
    fields = models.JSONField("Fields", default=list)
