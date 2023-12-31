# django imports
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

# rest imports
from rest_framework.test import APITestCase
from rest_framework import status

# model imports
from .models import JadwalTenagaMedis, JadwalPasien
from account.models import Account
from klinik.models import Cabang, Klinik, OwnerProfile, TenagaMedisProfile, LamaranPasien

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
        self.available_jadwal_tenaga_medis_url = "jadwal:available-jadwal-tenaga-medis"

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
            {"email": self.owner_account.email, "password": TEST_USER_PASSWORD},
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
            day="mon",
        )
        jadwal_tenaga_medis.save()
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.first()
        self.assertEqual(jadwal_tenaga_medis.tenaga_medis, self.tenaga_medis_profile)
        self.assertEqual(jadwal_tenaga_medis.start_time, datetime.time(10, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.end_time, datetime.time(11, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.quota, 5)
        self.assertEqual(jadwal_tenaga_medis.day, "mon")
        self.assertEqual(
            str(jadwal_tenaga_medis), f"{self.tenaga_medis_profile.account}'s Jadwal"
        )


class JadwalTenagaMedisListAPITest(JadwalTenagaMedisTestSetUp):
    def test_get_jadwal_tenaga_medis_list(self):
        for i in range(5):
            jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
                tenaga_medis=self.tenaga_medis_profile,
                start_time=datetime.time(i + 1, 0, 0),
                end_time=datetime.time(i + 2, 0, 0),
                quota=5,
                day="mon",
            )
            jadwal_tenaga_medis.save()
        url = reverse(
            self.jadwal_tenaga_medis_list_url, kwargs={"cabang_id": self.cabang.id}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), JadwalTenagaMedis.objects.count())

    def test_get_jadwal_tenaga_medis_list_cabang_not_found(self):
        url = reverse(self.jadwal_tenaga_medis_list_url, kwargs={"cabang_id": 1999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateJadwalTenagaMedisAPITest(JadwalTenagaMedisTestSetUp):
    def test_create_jadwal_tenaga_medis(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        data = {
            "start_time": "8:00:00",
            "end_time": "9:00:00",
            "quota": 5,
            "day": "mon",
        }
        url = reverse(
            self.create_jadwal_tenaga_medis_url,
            kwargs={"tenaga_medis_id": self.tenaga_medis_account.id},
        )
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)

    def test_create_jadwal_tenaga_medis_invalid(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        data = {
            # all missing fields
        }
        url = reverse(
            self.create_jadwal_tenaga_medis_url,
            kwargs={"tenaga_medis_id": self.tenaga_medis_account.id},
        )
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)

    def test_create_jadwal_tenaga_medis_invalid_time_range(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        data = {
            "start_time": "10:00:00",
            "end_time": "8:00:00",
            "quota": 5,
            "day": "mon",
        }
        url = reverse(
            self.create_jadwal_tenaga_medis_url,
            kwargs={"tenaga_medis_id": self.tenaga_medis_account.id},
        )
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)

    def test_create_jadwal_tenaga_medis_overlap(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(8, 0, 0),
            end_time=datetime.time(10, 0, 0),
            quota=5,
            day="mon",
        )
        jadwal_tenaga_medis.save()
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)
        data = {
            "start_time": "9:00:00",
            "end_time": "11:00:00",
            "quota": 5,
            "day": "mon",
        }
        url = reverse(
            self.create_jadwal_tenaga_medis_url,
            kwargs={"tenaga_medis_id": self.tenaga_medis_account.id},
        )
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)

    def test_create_jadwal_tenaga_medis_invalid_quota(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        data = {
            "start_time": "8:00:00",
            "end_time": "10:00:00",
            "quota": -5,
            "day": "mon",
        }
        url = reverse(
            self.create_jadwal_tenaga_medis_url,
            kwargs={"tenaga_medis_id": self.tenaga_medis_account.id},
        )
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)

    def test_create_jadwal_tenaga_medis_not_found(self):
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)
        data = {
            "start_time": "8:00:00",
            "end_time": "9:00:00",
            "quota": 5,
            "day": "mon",
        }
        url = reverse(
            self.create_jadwal_tenaga_medis_url, kwargs={"tenaga_medis_id": 1999}
        )
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)


class JadwalTenagaMedisAPITest(JadwalTenagaMedisTestSetUp):
    def test_get_jadwal_tenaga_medis(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon",
        )
        jadwal_tenaga_medis.save()
        url = reverse(
            self.jadwal_tenaga_medis_url,
            kwargs={"jadwal_tenaga_medis_id": jadwal_tenaga_medis.id},
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["tenaga_medis"]["account"]["id"], self.tenaga_medis_profile.id
        )
        self.assertEqual(response.data["start_time"], "06:00:00")
        self.assertEqual(response.data["end_time"], "08:00:00")
        self.assertEqual(response.data["quota"], 5)
        self.assertEqual(response.data["day"], "mon")

    def test_get_jadwal_tenaga_medis_not_found(self):
        url = reverse(
            self.jadwal_tenaga_medis_url, kwargs={"jadwal_tenaga_medis_id": 1999}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_jadwal_tenaga_medis(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon",
        )
        jadwal_tenaga_medis.save()
        data = {
            "start_time": "10:00:00",
            "end_time": "12:00:00",
            "quota": 10,
            "day": "fri",
        }
        url = reverse(
            self.jadwal_tenaga_medis_url,
            kwargs={"jadwal_tenaga_medis_id": jadwal_tenaga_medis.id},
        )
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.first()
        self.assertEqual(jadwal_tenaga_medis.start_time, datetime.time(10, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.end_time, datetime.time(12, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.quota, 10)
        self.assertEqual(jadwal_tenaga_medis.day, "fri")

    def test_update_jadwal_tenaga_medis_not_found(self):
        data = {
            "start_time": "10:00:00",
            "end_time": "12:00:00",
            "quota": 10,
            "day": "fri",
        }
        url = reverse(
            self.jadwal_tenaga_medis_url, kwargs={"jadwal_tenaga_medis_id": 1999}
        )
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_jadwal_tenaga_medis_invalid(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon",
        )
        jadwal_tenaga_medis.save()
        data = {
            "start_time": "not a time",
            "end_time": "not a time",
            "quota": "not a number",
            "day": "not a day",
        }
        url = reverse(
            self.jadwal_tenaga_medis_url,
            kwargs={"jadwal_tenaga_medis_id": jadwal_tenaga_medis.id},
        )
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.first()
        self.assertEqual(jadwal_tenaga_medis.start_time, datetime.time(6, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.end_time, datetime.time(8, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.quota, 5)
        self.assertEqual(jadwal_tenaga_medis.day, "mon")

    def test_update_jadwal_tenaga_medis_invalid_time_range(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon",
        )
        jadwal_tenaga_medis.save()
        data = {
            "start_time": "10:00:00",
            "end_time": "8:00:00",
            "quota": 10,
            "day": "fri",
        }
        url = reverse(
            self.jadwal_tenaga_medis_url,
            kwargs={"jadwal_tenaga_medis_id": jadwal_tenaga_medis.id},
        )
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.first()
        self.assertEqual(jadwal_tenaga_medis.start_time, datetime.time(6, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.end_time, datetime.time(8, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.quota, 5)
        self.assertEqual(jadwal_tenaga_medis.day, "mon")

    def test_update_jadwal_tenaga_medis_overlap(self):
        jadwal_tenaga_medis_1 = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon",
        )
        jadwal_tenaga_medis_1.save()
        jadwal_tenaga_medis_2 = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(8, 0, 0),
            end_time=datetime.time(10, 0, 0),
            quota=5,
            day="mon",
        )
        jadwal_tenaga_medis_2.save()
        data = {
            "start_time": "7:00:00",
            "end_time": "10:00:00",
            "quota": 5,
            "day": "mon",
        }
        url = reverse(
            self.jadwal_tenaga_medis_url,
            kwargs={"jadwal_tenaga_medis_id": jadwal_tenaga_medis_2.id},
        )
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.get(id=jadwal_tenaga_medis_2.id)
        self.assertEqual(jadwal_tenaga_medis.start_time, datetime.time(8, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.end_time, datetime.time(10, 0, 0))
        self.assertEqual(jadwal_tenaga_medis.quota, 5)
        self.assertEqual(jadwal_tenaga_medis.day, "mon")

    def test_update_jadwal_tenaga_medis_invalid_quota(self):
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(6, 0, 0),
            end_time=datetime.time(8, 0, 0),
            quota=5,
            day="mon",
        )
        jadwal_tenaga_medis.save()
        data = {
            "start_time": "6:00:00",
            "end_time": "8:00:00",
            "quota": -5,
            "day": "mon",
        }
        url = reverse(
            self.jadwal_tenaga_medis_url,
            kwargs={"jadwal_tenaga_medis_id": jadwal_tenaga_medis.id},
        )
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
            day="mon",
        )
        jadwal_tenaga_medis.save()
        self.assertEqual(JadwalTenagaMedis.objects.count(), 1)
        url = reverse(
            self.jadwal_tenaga_medis_url,
            kwargs={"jadwal_tenaga_medis_id": jadwal_tenaga_medis.id},
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 0)

    def test_delete_jadwal_tenaga_medis_not_found(self):
        url = reverse(
            self.jadwal_tenaga_medis_url, kwargs={"jadwal_tenaga_medis_id": 1999}
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class AvailableJadwalTenagaMedisAPITest(JadwalTenagaMedisTestSetUp):
    def setUp(self):
        super().setUp()
        self.sample_date = datetime.datetime.today()

    def test_get_available_jadwal_tenaga_medis(self):
        self.client.credentials(HTTP_AUTHORIZATION=None)
        tomorrow = self.sample_date + datetime.timedelta(days=1)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(8, 0, 0),
            end_time=datetime.time(10, 0, 0),
            quota=2,
            day=tomorrow.strftime("%a").lower(),
        )
        jadwal_tenaga_medis.save()
        lamaran_pasien = LamaranPasien.objects.create(
            nik="123", email="asdf@gamil.com", nama="Astolfo", fields=[{"nickname": "Antonio"}]
        )
        lamaran_pasien.save()
        jadwal_pasien = JadwalPasien.objects.create(
            date=tomorrow.date(),
            lamaranPasien=lamaran_pasien,
            jadwalTenagaMedis=jadwal_tenaga_medis,
        )
        jadwal_pasien.save()
        url = reverse(
            self.available_jadwal_tenaga_medis_url, kwargs={"cabang_id": self.cabang.id}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_available_jadwal_tenaga_medis_empty(self):
        self.client.credentials(HTTP_AUTHORIZATION=None)
        tomorrow = self.sample_date + datetime.timedelta(days=1)
        jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(8, 0, 0),
            end_time=datetime.time(10, 0, 0),
            quota=2,
            day=tomorrow.strftime("%a").lower(),
        )
        jadwal_tenaga_medis.save()
        url = reverse(
            self.available_jadwal_tenaga_medis_url, kwargs={"cabang_id": self.cabang.id}
        )
        response = self.client.get(url)
        for i in range(2):
            lamaran_pasien = LamaranPasien.objects.create(
                nik=f"{i+1}", email=f"asd{i+1}@gamil.com", nama=f"Astolfo{i+1}", fields=[{"nickname": "Antonio"}]
            )
            lamaran_pasien.save()
            jadwal_pasien = JadwalPasien.objects.create(
                date=response.data[0]["date"],
                lamaranPasien=lamaran_pasien,
                jadwalTenagaMedis=jadwal_tenaga_medis,
            )
            jadwal_pasien.save()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_available_jadwal_tenaga_medis_cabang_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=None)
        url = reverse(
            self.available_jadwal_tenaga_medis_url, kwargs={"cabang_id": 1999}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class JadwalPasienAPITestSetup(APITestCase, TestCase):
    def setUp(self) -> None:
        # urls
        self.jadwal_tenaga_medis_list_url = "jadwal:jadwal-tenaga-medis-list"
        self.create_jadwal_tenaga_medis_url = "jadwal:create-jadwal-tenaga-medis"
        self.jadwal_tenaga_medis_url = "jadwal:jadwal-tenaga-medis"

        self.jadwal_pasien_list_url = "jadwal:jadwal-pasien-list"
        self.jadwal_pasien_list_by_cabang_url = "jadwal:jadwal-pasien-list-by-cabang"
        self.create_jadwal_pasien_url = "jadwal:create-jadwal-pasien"
        self.jadwal_pasien_url = "jadwal:jadwal-pasien-detail"

        # owner
        self.owner_account = Account.objects.create_user(
            email="owner@email.com",
            full_name="Gordon Matthew Thomas Sumner",
            password=TEST_USER_PASSWORD,
        )
        self.owner_profile = OwnerProfile.objects.create(account=self.owner_account)
        self.owner_profile.save()

        # klinik
        sik = SimpleUploadedFile("Surat Izin Klinik.txt", b"Berizin Resmi")
        self.klinik = Klinik.objects.create(
            name="Klinik Maju Jaya Makmur", owner=self.owner_profile, sik=sik
        )
        self.klinik.save()

        # cabang
        self.cabang = Cabang.objects.create(
            klinik=self.klinik, location="Bantar Gebang"
        )
        self.cabang.save()

        # tenaga medis
        self.tenaga_medis_account = Account.objects.create_user(
            email="tenaga_medis@email.com",
            full_name="dr. DisRespect",
            password=TEST_USER_PASSWORD,
        )
        self.tenaga_medis_profile = TenagaMedisProfile.objects.create(
            account=self.tenaga_medis_account, cabang=self.cabang, sip="sip"
        )
        self.tenaga_medis_profile.save()

        # owner login
        url = reverse("account:login")
        resp = self.client.post(
            url,
            {"email": self.owner_account.email, "password": TEST_USER_PASSWORD},
            format="json",
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in resp.data)
        self.assertTrue("refresh" in resp.data)
        self.token = resp.data["access"]
        self.auth = "Bearer " + self.token
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)

        # Should have ID 1
        self.jadwal_tenaga_medis = JadwalTenagaMedis(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(1, 0, 0),
            end_time=datetime.time(2, 0, 0),
            quota=5,
            day="mon",
        )
        self.jadwal_tenaga_medis.save()

        # Should have ID 2
        jadwal_tenaga_medis_lain = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(2, 0, 0),
            end_time=datetime.time(6, 0, 0),
            quota=10,
            day="tue",
        )
        jadwal_tenaga_medis_lain.save()

        # Should have ID 1
        self.pas = LamaranPasien(nik=f"4206913371", email="emails@email.com", nama="Abdullah1", fields=[{"nickname": f"Abdul1"}])
        self.pas.save()

        # Should have ID starting from 2
        for _ in range(10):
            lam = LamaranPasien(
                nik=f"420691337{_+2}", email=f"email{_+2}@email.com", nama=f"Abdullah{_+2}", fields=[{"nama": f"Abdul{_+2}"}]
            )
            lam.save()

        # Should have ID 1
        jadwal_pasien = JadwalPasien.objects.create(
            date=datetime.date(1987, 4, 20),
            lamaranPasien=self.pas,
            jadwalTenagaMedis=self.jadwal_tenaga_medis,
        )
        jadwal_pasien.save()

        # Should have ID starting from 2
        for _ in range(10):
            date = datetime.datetime(2000, 4, 20)
            date += datetime.timedelta(days=(7 * _))
            jadwal_lain = JadwalPasien(
                date=date,
                lamaranPasien=LamaranPasien.objects.get(id=_ + 2),
                jadwalTenagaMedis=jadwal_tenaga_medis_lain,
            )
            jadwal_lain.save()

        self.mockdata = {"lamaranPasien": {
                        "nik": "123980295782",
                        "email": "surat@email.com",
                        "nama": "Abdullah",
                        "fields": [
                            {
                                "nickname": "Abdul"
                            }
                        ]
                    },
                "date": datetime.date(1666, 4, 20)}


class JadwalPasienModelTest(JadwalPasienAPITestSetup):
    def test_jadwal_pasien_str_method(self):
        jadwal_pasien = JadwalPasien.objects.first()
        self.assertEqual(str(jadwal_pasien), f"Jadwal pasien dengan NIK:{self.pas.nik}")


class JadwalPasienAPITest(JadwalPasienAPITestSetup):
    def test_create_jadwal_pasien(self):
        self.assertEqual(JadwalPasien.objects.count(), 11)
        self.assertEqual(JadwalTenagaMedis.objects.count(), 2)
        self.assertEqual(LamaranPasien.objects.count(), 11)

        url = reverse(
            self.create_jadwal_pasien_url,
            kwargs={
                "jadwal_tenaga_medis_pk": 1
            },
        )
        resp = self.client.post(url, data=self.mockdata, format='json')

        jadwal_pasien = JadwalPasien.objects.last()
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(jadwal_pasien.date, datetime.date(1666, 4, 20))
        self.assertEqual(jadwal_pasien.jadwalTenagaMedis.id, 1)
        self.assertEqual(LamaranPasien.objects.count(), 12)
        self.assertEqual(jadwal_pasien.lamaranPasien.id, 12)
        self.assertEqual(JadwalPasien.objects.count(), 12)

    def test_create_jadwal_pasien_fail(self):
        self.assertEqual(JadwalPasien.objects.count(), 11)
        data = {
            # all missing fields
        }
        url = reverse(
            self.create_jadwal_pasien_url,
            kwargs={"jadwal_tenaga_medis_pk": 1},
        )
        resp = self.client.post(url, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JadwalPasien.objects.count(), 11)
    
    def test_create_jadwal_pasien_not_found(self):
        self.assertEqual(JadwalPasien.objects.count(), 11)

        url = reverse(
            self.create_jadwal_pasien_url,
            kwargs={"jadwal_tenaga_medis_pk": 1999},
        )
        resp = self.client.post(url, data=self.mockdata, format='json')
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(JadwalPasien.objects.count(), 11)

    def test_create_jadwal_pasien_fail_quota(self):
        self.assertEqual(JadwalPasien.objects.count(), 11)

        url = reverse(
            self.create_jadwal_pasien_url,
            kwargs={"jadwal_tenaga_medis_pk": 2},
        )
        resp = self.client.post(url, data=self.mockdata, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JadwalPasien.objects.count(), 11)

    def test_get_jadwal_pasien(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_url, kwargs={"pk": 1})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 4) #id dan date, foreignKey gk keitung di data
        self.assertEqual(resp.data["id"], 1)
        self.assertEqual(
            resp.data["date"], datetime.date(1987, 4, 20).strftime("%Y-%m-%d")
        )
    
    def test_get_jadwal_pasien_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_url, kwargs={"pk": 1999})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_jadwal_pasien_list(self):
        self.assertEqual(JadwalPasien.objects.count(), 11)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_list_url, kwargs={"jadwal_tenaga_medis_pk": 2})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 10)  # sebanyak iterasi line 488

    def test_get_jadwal_pasien_list_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_list_url, kwargs={"jadwal_tenaga_medis_pk": 1999})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_jadwal_pasien_list_by_cabang(self):
        self.assertEqual(JadwalPasien.objects.count(), 11)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_list_by_cabang_url, kwargs={"cabang_pk": 1})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 11) #sebanyak iterasi line 576 + 1 diatasnya

    def test_get_jadwal_pasien_list_by_cabang_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_list_by_cabang_url, kwargs={"cabang_pk": 1999})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_patch_jadwal_pasien(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_url, kwargs={"pk": 1})
        self.assertEqual(JadwalPasien.objects.get(id=1).lamaranPasien.id, 1)
        resp = self.client.patch(uri, data={"date": datetime.date(2021, 4, 20)})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_patch_jadwal_pasien_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_url, kwargs={"pk": 1999})
        resp = self.client.patch(uri, data={"date": datetime.date(2021, 4, 20)})
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_patch_jadwal_pasien_bad_request(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_url, kwargs={"pk": 1})
        resp = self.client.patch(uri, data={"date": "not a date"})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_jadwal_pasien(self):
        self.assertEqual(JadwalPasien.objects.count(), 11)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_url, kwargs={"pk": 1})
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(JadwalPasien.objects.count(), 10)
    
    def test_delete_jadwal_pasien_not_found(self):
        self.assertEqual(JadwalPasien.objects.count(), 11)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.jadwal_pasien_url, kwargs={"pk": 1999})
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(JadwalPasien.objects.count(), 11)
