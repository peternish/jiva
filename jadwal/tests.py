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


class JadwalTenagaMedisListAPITest(JadwalTenagaMedisTestSetUp):
    def test_get_jadwal_tenaga_medis_list(self):
        for i in range(5):
            jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
                tenaga_medis=self.tenaga_medis_profile,
                start_time=datetime.time(i+1, 0, 0),
                end_time=datetime.time(i+2, 0, 0),
                quota=5,
                day="mon"
            )
            jadwal_tenaga_medis.save()
        url = reverse(self.jadwal_tenaga_medis_list_url, kwargs={ "cabang_id" : self.cabang.id })
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), JadwalTenagaMedis.objects.count())

    def test_get_jadwal_tenaga_medis_list_cabang_not_found(self):
        url = reverse(self.jadwal_tenaga_medis_list_url, kwargs={ "cabang_id" : 1999 })
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    

class CreateJadwalTenagaMedisAPI(JadwalTenagaMedisTestSetUp):
    def test_create_jadwal_tenaga_medis(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        data = {
            "start_time" : "8:00:00",
            "end_time" : "9:00:00",
            "quota" : 5,
            "day" : "mon"
        }
        url = reverse(self.create_jadwal_tenaga_medis_url, kwargs={ "tenaga_medis_id" : self.tenaga_medis_profile.id })
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)

    def test_create_jadwal_tenaga_medis_invalid(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        data = {
            "start_time" : "8:00:00",
            "end_time" : "9:00:00",
        }
        url = reverse(self.create_jadwal_tenaga_medis_url, kwargs={ "tenaga_medis_id" : self.tenaga_medis_profile.id })
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)

    def test_create_jadwal_tenaga_medis_invalid_time_range(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        data = {
            "start_time" : "10:00:00",
            "end_time" : "8:00:00",
            "quota" : 5,
            "day" : "mon"
        }
        url = reverse(self.create_jadwal_tenaga_medis_url, kwargs={ "tenaga_medis_id" : self.tenaga_medis_profile.id })
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
    
    def test_create_jadwal_tenaga_medis_overlap(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(8, 0, 0),
            end_time=datetime.time(10, 0, 0),
            quota=5,
            day="mon"
        )
        jadwal_tenaga_medis.save()
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)
        data = {
            "start_time" : "9:00:00",
            "end_time" : "11:00:00",
            "quota" : 5,
            "day" : "mon"
        }
        url = reverse(self.create_jadwal_tenaga_medis_url, kwargs={ "tenaga_medis_id" : self.tenaga_medis_profile.id })
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)
    
    def test_create_jadwal_tenaga_medis_not_found(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        data = {
            "start_time" : "8:00:00",
            "end_time" : "9:00:00",
            "quota" : 5,
            "day" : "mon"
        }
        url = reverse(self.create_jadwal_tenaga_medis_url, kwargs={ "tenaga_medis_id" : 1999 })
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)


class JadwalTenagaMedisAPI(JadwalTenagaMedisTestSetUp):
    def test_get_jadwal_tenaga_medis(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon"
        )
        jadwal_tenaga_medis.save()
        url = reverse(self.jadwal_tenaga_medis_url, kwargs={ "jadwal_tenaga_medis_id" : jadwal_tenaga_medis.id })
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["tenaga_medis"]["account"]["id"], self.tenaga_medis_profile.id)
        self.assertEqual(response.data["start_time"], "06:00:00")
        self.assertEqual(response.data["end_time"], "08:00:00")
        self.assertEqual(response.data["quota"], 5)
        self.assertEqual(response.data["day"], "mon")
    
    def test_get_jadwal_tenaga_medis_not_found(self):
        url = reverse(self.jadwal_tenaga_medis_url, kwargs={ "jadwal_tenaga_medis_id" : 1999 })
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_update_jadwal_tenaga_medis(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon"
        )
        jadwal_tenaga_medis.save()
        data = {
            "start_time" : "10:00:00",
            "end_time" : "12:00:00",
            "quota" : 10,
            "day" : "fri"
        }
        url = reverse(self.jadwal_tenaga_medis_url, kwargs={ "jadwal_tenaga_medis_id" : jadwal_tenaga_medis.id })
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.first()
        self.assertEqual(jadwal_tenaga_medis.start_time, datetime.time(10, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.end_time, datetime.time(12, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.quota, 10)
        self.assertEqual(jadwal_tenaga_medis.day, "fri")
    
    def test_update_jadwal_tenaga_medis_not_found(self):
        data = {
            "start_time" : "10:00:00",
            "end_time" : "12:00:00",
            "quota" : 10,
            "day" : "fri"
        }
        url = reverse(self.jadwal_tenaga_medis_url, kwargs={ "jadwal_tenaga_medis_id" : 1999 })
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_update_jadwal_tenaga_medis_invalid(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon"
        )
        jadwal_tenaga_medis.save()
        data = {
            "start_time" : "not a valid time",
            "end_time" : "not a valid time",
            "quota" : "not a number",
            "day" : "not a day"
        }
        url = reverse(self.jadwal_tenaga_medis_url, kwargs={ "jadwal_tenaga_medis_id" : jadwal_tenaga_medis.id })
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.first()
        self.assertEqual(jadwal_tenaga_medis.start_time, datetime.time(6, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.end_time, datetime.time(8, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.quota, 5)
        self.assertEqual(jadwal_tenaga_medis.day, "mon")

    def test_delete_jadwal_tenaga_medis(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon"
        )
        jadwal_tenaga_medis.save()
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)
        url = reverse(self.jadwal_tenaga_medis_url, kwargs={ "jadwal_tenaga_medis_id" : jadwal_tenaga_medis.id })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
    
    def test_delete_jadwal_tenaga_medis_not_found(self):
        url = reverse(self.jadwal_tenaga_medis_url, kwargs={ "jadwal_tenaga_medis_id" : 1999 })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
