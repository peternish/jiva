from tkinter import CASCADE
from django.db import models


class Account(models.Model):
    pass


class Profile(models.Model):
    role = models.CharField(max_length=30, default='tenaga_medis')
    account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE)


class OwnerProfile(Profile):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.role = 'owner'


class Klinik(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        OwnerProfile,
        on_delete=models.CASCADE)


class Cabang(models.Model):
    location = models.CharField(max_length=300)
    klinik = models.ForeignKey(
        Klinik,
        on_delete=models.CASCADE)
