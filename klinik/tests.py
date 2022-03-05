from klinik.models import Cabang, Klinik, OwnerProfile
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import login
from rest_framework import status
from account.models import Account
import secrets
import os


class CabangAPITest(APITestCase):

    # def get_token(self, email=None, password=None, access=True):
    #     email = self.email if (email is None) else email
    #     password = self.password if (password is None) else password

    #     # path/url where of API where you get the access token
    #     url = reverse("account:login")
    #     resp = self.client.post(
    #         url, {"email": email, "password": password}, format="json"
    #     )
    #     self.assertEqual(resp.status_code, status.HTTP_200_OK)
    #     self.assertTrue("access" in resp.data)
    #     self.assertTrue("refresh" in resp.data)
    #     token = resp.data["access"] if access else resp.data["refresh"]
    #     return token

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

        self.email2 = "test@abc.xyz"
        self.account2 = Account.objects.create_user(
            email=self.email2,
            full_name="john deed",
            password=os.getenv("SECRET_KEY"),
        )
        self.account2.save()
        self.owner2 = OwnerProfile(account=self.account2)
        self.owner2.save()
        # Should have ID 2
        self.klinik2 = Klinik(
            name="klinik2",
            owner=self.owner2
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
            url, {"email": self.email, "password": os.getenv("SECRET_KEY")}, format="json"
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in resp.data)
        self.assertTrue("refresh" in resp.data)
        self.token = resp.data["access"]

        self.alt_location = "alam baka"

    def test_get_cabang_list_from_klinik(self):
        self.assertEqual(Cabang.objects.count(), 20)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        resp = self.client.get(self.url_list, data={"klinik": self.klinik.id})

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 10)
        self.assertNotEqual(len(resp.data), 20)

    def test_get_cabang_list_from_klinik_without_auth_fails(self):
        resp = self.client.get(self.url_list)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_cabang_list(self):
        self.assertEqual(Cabang.objects.count(), 20)
        data = {
            "location": self.alt_location,
            "klinik": self.klinik.id
        }
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cabang.objects.count(), 21)

    def test_post_cabang_list_klinik_not_found(self):
        self.assertEqual(Cabang.objects.count(), 20)
        data = {
            "location": self.alt_location,
            "klinik": -1
        }
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Cabang.objects.count(), 20)

    def test_get_cabang_detail(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['id'], cabang.id)
        self.assertEqual(resp.data['klinik_id'], cabang.klinik_id)
        self.assertEqual(resp.data['location'], cabang.location)

    def test_get_cabang_detail_cabang_not_found(self):
        uri = reverse(self.url_detail, kwargs={"pk": 9999})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_cabang_detail(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        resp = self.client.put(uri, data={"location": self.alt_location})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['id'], cabang.id)
        self.assertEqual(resp.data['location'], 'alam baka')
        self.assertNotEqual(resp.data['location'], cabang.location)

    def test_put_cabang_detail_bad_request(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        resp = self.client.put(uri, data={"realm": self.alt_location})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_cabang_detail(self):
        self.assertEqual(Cabang.objects.count(), 20)
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(Cabang.objects.count(), 19)

    def test_delete_cabang_detail_not_found(self):
        self.assertEqual(Cabang.objects.count(), 20)
        uri = reverse(self.url_detail, kwargs={"pk": 9999})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Cabang.objects.count(), 20)
