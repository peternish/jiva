# django imports
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

# rest imports
from rest_framework.test import APITestCase
from rest_framework import status

# model imports
from .models import JadwalTenagaMedis
from account.models import Account
from klinik.models import Cabang, Klinik, OwnerProfile, TenagaMedisProfile

# other imports
import os
import datetime


TEST_USER_PASSWORD = os.getenv("SECRET_KEY")


class JadwalTenagaMedisTestSetUp(APITestCase, TestCase):
    def setUp(self) -> None:
        # urls
        self.jadwal_tenaga_medis_list_url = "jadwal:jadwal-tenaga-medis-list"
        self.create_jadwal_tenaga_medis_url = "jadwal:create-jadwal-tenaga-medis"
        self.jadwal_tenaga_medis_url = "jadwal:jadwal-tenaga-medis"
        
        # owner
        self.owner_account = Account.objects.create_user(
            email="owner@email.com",
            full_name="Gordon Matthew Thomas Sumner",
            password=TEST_USER_PASSWORD,
        )
        self.owner_profile = OwnerProfile.objects.create(account=self.owner_account)

        # klinik 
        sik = SimpleUploadedFile("Surat Izin Klinik.txt", b"Berizin Resmi")
        self.klinik = Klinik.objects.create(
            name="Klinik Maju Jaya Makmur", owner=self.owner_profile, sik=sik
        )

        # cabang
        self.cabang = Cabang.objects.create(
            klinik=self.klinik, location="Bantar Gebang"
        )

        # tenaga medis
        self.tenaga_medis_account = Account.objects.create_user(
            email="tenaga_medis@email.com",
            full_name="dr. DisRespect",
            password=TEST_USER_PASSWORD,
        )
        self.tenaga_medis_profile = TenagaMedisProfile.objects.create(
            account=self.tenaga_medis_account, cabang=self.cabang, sip="sip"
        )

        # owner login
        login_url = reverse("account:login")
        response = self.client.post(
            login_url,
            {
                "email": self.owner_account.email, 
                "password": TEST_USER_PASSWORD 
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in response.data)
        self.assertTrue("refresh" in response.data)
        self.token = response.data["access"]
        self.auth = "Bearer " + self.token
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)


class JadwalTenagaMedisModelTest(JadwalTenagaMedisTestSetUp):
    def test_create_jadwal_tenaga_medis_object(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(10, 0, 0),
            end_time=datetime.time(11, 0, 0),
            quota=5,
            day="mon"
        )
        jadwal_tenaga_medis.save()
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.first()
        self.assertEqual(jadwal_tenaga_medis.tenaga_medis, self.tenaga_medis_profile)
        self.assertEqual(jadwal_tenaga_medis.start_time, datetime.time(10, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.end_time, datetime.time(11, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.quota, 5)
        self.assertEqual(jadwal_tenaga_medis.day, "mon")
        self.assertEqual(str(jadwal_tenaga_medis), f"{self.tenaga_medis_profile.account}'s Jadwal")
