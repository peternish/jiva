from klinik.models import Cabang, Klinik, OwnerProfile
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from account.models import Account
import secrets
import os


class CabangAPITest(APITestCase):

    def setUp(self):
        self.url_list = reverse('klinik:cabang-list')
        self.url_detail = 'klinik:cabang-detail'

        self.account = Account.objects.create_user(
            email="test@example.com",
            full_name="john doe",
            password=os.getenv("SECRET_KEY"),
        )
        self.account.save()

        self.owner = OwnerProfile(account=self.account)
        self.owner.save()

        # Should have ID 1
        self.klinik = Klinik(
            name="klinik1",
            owner=self.owner
        )
        self.klinik.save()

        for _ in range(10):
            tmp = Cabang(
                location="",
                klinik=self.klinik
            )
            tmp.save()

        # Should have ID 2
        self.klinik2 = Klinik(
            name="klinik2",
            owner=self.owner
        )
        self.klinik2.save()

        for _ in range(10):
            tmp = Cabang(
                location="alam sutra",
                klinik=self.klinik2
            )
            tmp.save()

        self.alt_location = "alam baka"

    def test_get_cabang_list_from_klinik(self):
        self.assertEqual(Cabang.objects.count(), 20)
        resp = self.client.get(self.url_list, data={"klinik": self.klinik.id})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 10)
        self.assertNotEqual(len(resp.data), 20)

    def test_get_cabang_list_from_klinik_without_klinik_fails(self):
        resp = self.client.get(self.url_list)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_cabang_list_from_klinik_klinik_not_found(self):
        self.assertEqual(Cabang.objects.count(), 20)
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
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cabang.objects.count(), 21)

    def test_post_cabang_list_klinik_not_found(self):
        self.assertEqual(Cabang.objects.count(), 20)
        data = {
            "location": self.alt_location,
            "klinik": -1
        }
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Cabang.objects.count(), 20)

    def test_get_cabang_detail(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['id'], cabang.id)
        self.assertEqual(resp.data['klinik_id'], cabang.klinik_id)
        self.assertEqual(resp.data['location'], cabang.location)

    def test_get_cabang_detail_cabang_not_found(self):
        uri = reverse(self.url_detail, kwargs={"pk": 9999})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_cabang_detail(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        resp = self.client.put(uri, data={"location": self.alt_location})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['id'], cabang.id)
        self.assertEqual(resp.data['location'], 'alam baka')
        self.assertNotEqual(resp.data['location'], cabang.location)

    def test_put_cabang_detail_bad_request(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        resp = self.client.put(uri, data={"realm": self.alt_location})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_cabang_detail(self):
        self.assertEqual(Cabang.objects.count(), 20)
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(Cabang.objects.count(), 19)

    def test_delete_cabang_detail_not_found(self):
        self.assertEqual(Cabang.objects.count(), 20)
        uri = reverse(self.url_detail, kwargs={"pk": 9999})
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Cabang.objects.count(), 20)
