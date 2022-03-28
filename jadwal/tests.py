# django imports
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile

# rest imports
from rest_framework.test import APITestCase

# model imports
from .models import JadwalTenagaMedis
from account.models import Account
from klinik.models import Cabang, Klinik, OwnerProfile, TenagaMedisProfile

# other imports
import os
import datetime


TEST_USER_EMAIL = "owner@email.com"
TEST_USER_FULL_NAME = "Budi Budiman"
TEST_USER_PASSWORD = os.getenv("SECRET_KEY")


class JadwalTenagaMedisTestSetUp(APITestCase, TestCase):
    def setUp(self) -> None:
        # owner
        self.owner_account = Account.objects.create_user(
            email=TEST_USER_EMAIL,
            full_name=TEST_USER_FULL_NAME,
            password=TEST_USER_PASSWORD,
        )
        self.owner_profile = OwnerProfile.objects.create(account=self.owner_account)

        # klinik 
        sik = SimpleUploadedFile("Surat Izin Klinik.txt", b"Berizin Resmi")
        self.klinik = Klinik.objects.create(
            name="My Klinik", owner=self.owner_profile, sik=sik
        )

        # cabang
        self.cabang = Cabang.objects.create(
            klinik=self.klinik, location="Cabang 1"
        )

        # tenaga medis 1
        self.tenaga_medis_1_account = Account.objects.create_user(
            email="tenaga_medis_1@email.com",
            full_name="Tenaga Medis 1",
            password=TEST_USER_PASSWORD,
        )
        self.tenaga_medis_1_profile = TenagaMedisProfile.objects.create(
            account=self.tenaga_medis_1_account, cabang=self.cabang, sip="sip"
        )

        # tenaga medis 2
        self.tenaga_medis_2_account = Account.objects.create_user(
            email="tenaga_medis_2@email.com",
            full_name="Tenaga Medis 2",
            password=TEST_USER_PASSWORD,
        )
        self.tenaga_medis_1_profile = TenagaMedisProfile.objects.create(
            account=self.tenaga_medis_2_account, cabang=self.cabang, sip="sip"
        )

class JadwalTenagaMedisModelTest(JadwalTenagaMedisTestSetUp):
    def test_create_jadwal_tenaga_medis(self):
        jadwal_tenaga_medis_1 = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_1_profile,
            start_time=datetime.time(10, 0, 0),
            end_time=datetime.time(11, 0, 0),
            quota=5,
            day="mon"
        )
        jadwal_tenaga_medis_1.save()
        self.assertEquals(JadwalTenagaMedis.objects.all().count(), 1)
        self.assertEquals(JadwalTenagaMedis.objects.all().first().tenaga_medis, self.tenaga_medis_1_profile)
        self.assertEquals(str(jadwal_tenaga_medis_1), f"{self.tenaga_medis_1_profile.account}'s Jadwal")
