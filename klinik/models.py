from django.db import models


class Account(models.Model):
    pass


class Profile(models.Model):
    role = models.CharField(max_length=30, default='tenaga_medis')
    account = models.ForeignKey(
        Account,
        on_delete=models.DO_NOTHING)


class OwnerProfile(Profile):
    pass


class Klinik(models.Model):
    pass


class Cabang(models.Model):
    pass
