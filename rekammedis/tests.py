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
    def aws_credentials() -> None:
        """Mocked AWS Credentials for moto."""
        os.environ['AWS_ACCESS_KEY_ID'] = 'testing'
        os.environ['AWS_SECRET_ACCESS_KEY'] = 'testing'
        os.environ['AWS_SECURITY_TOKEN'] = 'testing'
        os.environ['AWS_SESSION_TOKEN'] = 'testing'

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

        sample_file = b"this is a file example"
        mock_file = SimpleUploadedFile("sip_example.txt", sample_file)
        mock_file2 = SimpleUploadedFile("sip_example2.txt", sample_file)

        self.klinik = Klinik(name="klinik", owner=self.owner, sik=mock_file)
        self.klinik.save()

        self.cabang = Cabang(location=secrets.token_hex(), klinik=self.klinik)
        self.cabang.save()

        self.medic = TenagaMedisProfile(
            account=self.account, sip=mock_file2, cabang=self.cabang)
        self.medic.save()

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

        self.uri = "ehr:rekam-medis"
        self.uri_detil = "ehr:detil-rekam-medis"

        self.nik = "0123456789012345"
        self.fields = [
            {
                "type": "text",
                "required": False,
                "label": "Field 1",
                "className": "form-control",
                "name": "text-1648102772033-0",
                "access": False,
                "subtype": "text",
            },
            {
                "type": "text",
                "required": True,
                "label": "Field 2",
                "className": "form-control",
                "name": "text-1648102772980-0",
                "access": False,
                "subtype": "text",
            },
        ]

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
        self.assertEqual(Pasien.objects.count(), 0)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.uri, kwargs={"nik": self.nik})
        data = {
            "fields": self.fields,
        }
        resp = self.client.post(uri, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pasien.objects.count(), 1)
        self.assertEqual(RekamanMedis.objects.count(), 1)

    def test_post_rekaman_medis_but_unauthorized(self):
        self.assertEqual(Pasien.objects.count(), 0)
        uri = reverse(self.uri, kwargs={"nik": self.nik})
        data = {
            "fields": self.fields,
        }
        resp = self.client.post(uri, data=data)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Pasien.objects.count(), 0)

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
