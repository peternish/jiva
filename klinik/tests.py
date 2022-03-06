from .models import Cabang, Klinik, OwnerProfile
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from account.models import Account
from django.core.files.uploadedfile import SimpleUploadedFile
import secrets
import os


class KlinikAPITest(APITestCase):

    def setUp(self):
        self.url = "klinik:klinik-detail"

        self.email = "test@example.com"
        self.account = Account.objects.create_user(
            email=self.email,
            full_name="Larissa Rochefort",
            password=os.getenv("SECRET_KEY"),
        )

        self.owner = OwnerProfile(account=self.account)
        self.owner.save()

        self.email2 = "test2@example.com"
        self.account2 = Account.objects.create_user(
            email=self.email2,
            full_name="Pavolia Reine",
            password=os.getenv("SECRET_KEY"),
        )

        self.owner2 = OwnerProfile(account=self.account2)
        self.owner2.save()

        # Should have ID 1
        test_file = SimpleUploadedFile("best_file_eva.txt", b"these are the file contents!")
        self.klinik = Klinik(
            name="klinik1",
            owner=self.owner,
            sik = test_file
        )
        self.klinik.save()

        # Should have ID 2
        test_file2 = SimpleUploadedFile("not_the_best_file_eva.txt", b"these are the file contents!")
        self.klinik2 = Klinik(
            name="klinik2",
            owner=self.owner2,
            sik = test_file2
        )
        self.klinik2.save()

        url = reverse("account:login")
        resp = self.client.post(
            url,
            {"email": self.email, "password": os.getenv("SECRET_KEY")},
            format="json",
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in resp.data)
        self.assertTrue("refresh" in resp.data)
        self.token = resp.data["access"]


    def test_get_klinik(self):
        url = reverse(self.url, kwargs={"pk":1})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_get_klinik_fail(self):
        url = reverse(self.url, kwargs={"pk":999})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_klinik(self):
        klinik_list = list(Klinik.objects.all())
        klinik = secrets.choice(klinik_list)
        url = reverse(self.url, kwargs={"pk":klinik.id})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.put(url, data={"name": "apeture"})
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    def test_put_klinik_fail(self):
        url = reverse(self.url, kwargs={"pk":3})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.put(url, data={"name": "klinik3"})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_klinik(self):
        self.assertEqual(Klinik.objects.count(), 2)
        klinik_list = list(Klinik.objects.all())
        klinik = secrets.choice(klinik_list)
        url = reverse(self.url, kwargs={"pk": klinik.id})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(Klinik.objects.count(), 1)

    def test_delete_klinik_fail(self):
        self.assertEqual(Klinik.objects.count(), 2)
        url = reverse(self.url, kwargs={"pk": 999})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Klinik.objects.count(), 2)


class CabangAPITest(APITestCase):

    def setUp(self):
        self.url_list = reverse('klinik:cabang-list')
        self.url_detail = 'klinik:cabang-detail'

        self.email = "test@example.com"
        self.account = Account.objects.create_user(
            email=self.email,
            full_name="john doe",
            password=os.getenv("SECRET_KEY"),
        )
        self.account.save()

        self.owner = OwnerProfile(account=self.account)
        self.owner.save()

        self.email2 = "test2@example.com"
        self.account2 = Account.objects.create_user(
            email=self.email2,
            full_name="Pavolia Reine",
            password=os.getenv("SECRET_KEY"),
        )

        self.owner2 = OwnerProfile(account=self.account2)
        self.owner2.save()
        
        test_file = SimpleUploadedFile("best_file_eva.txt", b"these are the file contents!")
        self.klinik = Klinik(
            name="klinik1",
            owner=self.owner,
            sik = test_file
        )
        self.klinik.save()

        for _ in range(10):
            tmp = Cabang(
                location="",
                klinik=self.klinik
            )
            tmp.save()

        test_file2 = SimpleUploadedFile("not_the_best_file_eva.txt", b"these are the file contents!")
        self.klinik2 = Klinik(
            name="klinik2",
            owner=self.owner2,
            sik = test_file2
        )
        self.klinik2.save()

        for _ in range(10):
            tmp = Cabang(
                location="alam sutra",
                klinik=self.klinik2
            )
            tmp.save()

        url = reverse("account:login")
        resp = self.client.post(
            url,
            {"email": self.email, "password": os.getenv("SECRET_KEY")},
            format="json",
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in resp.data)
        self.assertTrue("refresh" in resp.data)
        self.token = resp.data["access"]

        self.alt_location = "alam baka"

    def test_get_cabang_list_from_klinik(self):
        self.assertEqual(Cabang.objects.count(), 20)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.get(self.url_list, data={"klinik": self.klinik.id})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 10)
        self.assertNotEqual(len(resp.data), 20)

    def test_get_cabang_list_from_klinik_without_klinik_fails(self):
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.get(self.url_list)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_cabang_list_from_klinik_klinik_not_found(self):
        self.assertEqual(Cabang.objects.count(), 20)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.get(self.url_list, data={"klinik": 0})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 0)
        self.assertNotEqual(len(resp.data), 10)
        self.assertNotEqual(len(resp.data), 20)

    def test_post_cabang_list(self):
        self.assertEqual(Cabang.objects.count(), 20)
        data = {
            "location": self.alt_location,
            "klinik": self.klinik.id
        }
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cabang.objects.count(), 21)

    def test_post_cabang_list_klinik_not_found(self):
        self.assertEqual(Cabang.objects.count(), 20)
        data = {
            "location": self.alt_location,
            "klinik": -1
        }
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Cabang.objects.count(), 20)

    def test_get_cabang_detail(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['id'], cabang.id)
        self.assertEqual(resp.data['klinik_id'], cabang.klinik_id)
        self.assertEqual(resp.data['location'], cabang.location)

    def test_get_cabang_detail_cabang_not_found(self):
        uri = reverse(self.url_detail, kwargs={"pk": 9999})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_cabang_detail(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.put(uri, data={"location": self.alt_location})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['id'], cabang.id)
        self.assertEqual(resp.data['location'], 'alam baka')
        self.assertNotEqual(resp.data['location'], cabang.location)

    def test_put_cabang_detail_bad_request(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.put(uri, data={"realm": self.alt_location})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_cabang_detail(self):
        self.assertEqual(Cabang.objects.count(), 20)
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(Cabang.objects.count(), 19)

    def test_delete_cabang_detail_not_found(self):
        self.assertEqual(Cabang.objects.count(), 20)
        uri = reverse(self.url_detail, kwargs={"pk": 9999})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Cabang.objects.count(), 20)
