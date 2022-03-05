from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from account.models import Account
from django.core.files.uploadedfile import SimpleUploadedFile

from klinik.models import Klinik, OwnerProfile
import random


class KlinikAPITest(APITestCase):

    def setUp(self):

        self.account = Account.objects.create_user(
            email="test@example.com",
            full_name="Larissa Rochefort",
            password="asdqwe123",
        )
        self.account.save()

        self.owner = OwnerProfile(account=self.account)
        self.owner.save()

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
            owner=self.owner,
            sik = test_file2
        )
        self.klinik2.save()

    def test_get_klinik(self):
        url = reverse("klinik:klinik-detail", kwargs={"pk":1})
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_get_klinik_fail(self):
        url = reverse("klinik:klinik-detail", kwargs={"pk":999})
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_klinik(self):
        klinik_list = list(Klinik.objects.all())
        klinik = random.choice(klinik_list)
        url = reverse("klinik:klinik-detail", kwargs={"pk":klinik.id})
        resp = self.client.put(url, data={"name": "apeture"})
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    def test_put_klinik_fail(self):
        url = reverse("klinik:klinik-detail", kwargs={"pk":3})
        resp = self.client.put(url, data={"name": "klinik3"})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_klinik(self):
        self.assertEqual(Klinik.objects.count(), 2)
        klinik_list = list(Klinik.objects.all())
        klinik = random.choice(klinik_list)
        url = reverse("klinik:klinik-detail", kwargs={"pk": klinik.id})
        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(Klinik.objects.count(), 1)

    def test_delete_klinik_fail(self):
        self.assertEqual(Klinik.objects.count(), 2)
        url = reverse("klinik:klinik-detail", kwargs={"pk": 999})
        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Klinik.objects.count(), 2)
