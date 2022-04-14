from django.urls import reverse
from klinik.models import Cabang, Klinik, OwnerProfile, TenagaMedisProfile
from account.models import Account
from rest_framework import status
from rekammedis.models import Pasien, RekamanMedis
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
import os
import secrets


class RekamMedisAPITest(APITestCase):

    def setUp(self) -> None:
        self.email = "test2@example.com"
        self.account = Account.objects.create_user(
            email=self.email,
            full_name="Gary Harisson",
            password=os.getenv("SECRET_KEY"),
        )

        self.owner = OwnerProfile(account=self.account)
        self.owner.save()

        self.email = "test@example.com"
        self.account = Account.objects.create_user(
            email=self.email,
            full_name="John Doe",
            password=os.getenv("SECRET_KEY"),
        )

        self.medic = TenagaMedisProfile(account=self.account)
        self.medic.save()

        sample_file = b"this is a file example"
        mock_file = SimpleUploadedFile("sip_example.pdf", sample_file)
        self.klinik = Klinik(name="klinik", owner=self.owner, sik=mock_file)
        self.klinik.save()
        self.cabang = Cabang(location=secrets.token_hex(), klinik=self.klinik)
        self.cabang.save()

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
        self.auth = "Bearer " + self.token

        return super().setUp()

    def test_get_all_rekaman_medis_from_nik(self):
        pass

    def test_get_all_rekaman_medis_from_nik_but_nik_not_found(self):
        pass

    def test_get_all_rekaman_medis_from_nik_but_unauthorized(self):
        pass

    def test_get_rekaman_medis_from_id(self):
        pass

    def test_get_rekaman_medis_from_id_but_not_found(self):
        pass

    def test_get_rekaman_medis_from_id_but_unauthorized(self):
        pass

    def test_post_rekaman_medis(self):
        pass

    def test_post_rekaman_medis_but_unauthorized(self):
        pass

    def test_post_rekaman_medis_missing_schema_fields(self):
        pass

    def test_put_rekaman_medis(self):
        pass

    def test_put_rekaman_medis_but_unauthorized(self):
        pass

    def test_delete_rekaman_medis_from_id(self):
        pass

    def test_delete_rekaman_medis_from_id_but_not_found(self):
        pass

    def test_delete_rekaman_medis_from_id_but_unauthorized(self):
        pass
