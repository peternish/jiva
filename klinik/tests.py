from klinik.models import Cabang, Klinik, OwnerProfile, DynamicForm, LamaranPasien, TenagaMedisProfile
from account.models import Account
from jadwal.models import JadwalTenagaMedis, JadwalPasien
from klinik.utils import send_confirmation_email
from rest_framework.test import APITestCase
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from account.models import Account
from django.core.files.uploadedfile import SimpleUploadedFile
import secrets
import os
import datetime


def bearer_factory(token):
    return "Bearer " + token

TEST_USER_PASSWORD = os.getenv("SECRET_KEY")


class KlinikTestSetUp(APITestCase):
    def aws_credentials(self):
        """Mocked AWS Credentials for moto."""
        os.environ["AWS_ACCESS_KEY_ID"] = "testing"
        os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
        os.environ["AWS_SECURITY_TOKEN"] = "testing"
        os.environ["AWS_SESSION_TOKEN"] = "testing"

    def setUp(self):
        self.url_klinik_list = reverse("klinik:klinik-list")
        self.file_content = b"these are the file contents!"

        self.url_list = reverse("klinik:cabang-list")
        self.url_detail = "klinik:cabang-detail"

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

        self.email3 = "test3@example.com"
        self.account3 = Account.objects.create_user(
            email=self.email3,
            full_name="Pa Izuri",
            password=os.getenv("SECRET_KEY"),
        )

        self.owner3 = OwnerProfile(account=self.account3)
        self.owner3.save()

        # Should have ID 1
        test_file = SimpleUploadedFile("best_file_eva.txt", self.file_content)
        self.klinik = Klinik(name="klinik1", owner=self.owner, sik=test_file)
        self.klinik.save()
        for _ in range(10):
            tmp = Cabang(location="", klinik=self.klinik)
            tmp.save()

        # Should have ID 2
        test_file2 = SimpleUploadedFile("not_the_best_file_eva.txt", self.file_content)
        self.klinik2 = Klinik(name="klinik2", owner=self.owner2, sik=test_file2)
        self.klinik2.save()
        for _ in range(10):
            tmp = Cabang(location="alam sutra", klinik=self.klinik2)
            tmp.save()

        self.test_file3 = SimpleUploadedFile(
            "absolutely_not_the_best_file_eva.txt", self.file_content
        )

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
        self.auth = bearer_factory(self.token)

        resp = self.client.post(
            url,
            {"email": self.email3, "password": os.getenv("SECRET_KEY")},
            format="json",
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in resp.data)
        self.assertTrue("refresh" in resp.data)
        self.token3 = resp.data["access"]
        self.auth3 = bearer_factory(self.token3)

        self.alt_location = "alam baka"

        self.pasien_list = reverse("klinik:pasien-list")
        self.pasien_detail = "klinik:pasien-detail"

        self.json_test = [
            {
                "name": "John",
                "example": "example",
                "tags": ["esse", "sunt", "quis"],
                "friends": [
                    {"id": 0, "name": "Contreras Weeks"},
                    {"id": 1, "name": "Dawn Lott"},
                ],
            }
        ]

        # Should have ID 1
        self.pas = LamaranPasien(nik=f"4206913370", email="email@email.com", fields=[{"nama": f"Abdullah0"}])
        self.pas.save()

        # Should have ID starting from 2
        for _ in range(9):
            lam = LamaranPasien(nik=f"420691337{_+1}", email=f"email{_}@email.com", fields=[{"nama": f"Abdullah{_+1}"}])
            lam.save()
            # print(f"There's {LamaranPasien.objects.last().id}")

        # cabang
        self.cabang = Cabang.objects.create(
            klinik=self.klinik, location="Bantar Gebang"
        )
        self.cabang.save()


        # tenaga medis
        self.tenaga_medis_account = Account.objects.create_user(
            email="tenaga_medis@email.com",
            full_name="dr. DisRespect",
            password=TEST_USER_PASSWORD
        )

        self.tenaga_medis_profile = TenagaMedisProfile.objects.create(
            account=self.tenaga_medis_account, cabang=self.cabang, sip="sip"
        )
        self.tenaga_medis_profile.save()

        # Should have ID 1
        self.jadwal_tenaga_medis = JadwalTenagaMedis(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(1, 0, 0),
            end_time=datetime.time(2, 0, 0),
            quota=5,
            day="mon"
        )
        self.jadwal_tenaga_medis.save()

        # Should have ID 2
        jadwal_tenaga_medis_lain = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(2, 0, 0),
            end_time=datetime.time(6, 0, 0),
            quota=5,
            day="tue"
        )
        jadwal_tenaga_medis_lain.save()
        
        # Should have ID 1
        jadwal_pasien = JadwalPasien.objects.create(
            date = datetime.date(1987, 4, 20),
            lamaranPasien = self.pas,
            jadwalTenagaMedis = self.jadwal_tenaga_medis
        )
        jadwal_pasien.save()
        

        # Should have ID starting from 2
        for _ in range(9):
            date = datetime.datetime(2000, 4, 20)
            date += datetime.timedelta(days=(7*_))
            jadwal_lain = JadwalPasien(
            date = date,
            lamaranPasien = LamaranPasien.objects.get(id = _+2),
            jadwalTenagaMedis = jadwal_tenaga_medis_lain
            )
            jadwal_lain.save()

        self.pasien_compound = reverse("klinik:pasien-compound")


class KlinikModelTest(KlinikTestSetUp):
    def setUp(self):
        super().setUp()
        self.cabang = self.klinik.cabang_set.first()

    def test_profile_str(self):
        self.assertEquals(f"{self.owner.account.email}'s Profile", str(self.owner))

    def test_klinik_str(self):
        self.assertEquals(self.klinik.name, str(self.klinik))

    def test_cabang_str(self):
        self.assertEquals(self.cabang.location, str(self.cabang))

    def test_lamaran_pasien_str(self):
        lamaran = LamaranPasien(nik="1234")
        self.assertEquals(lamaran.nik, str(lamaran))

    def test_dynamicform_str(self):
        dynamicform = DynamicForm(cabang=self.cabang, formtype="example")
        self.assertEquals(
            f"{self.cabang.klinik}:{self.cabang}:example", str(dynamicform)
        )


class KlinikAPITest(KlinikTestSetUp):
    def aws_credentials(self):
        """Mocked AWS Credentials for moto."""
        os.environ["AWS_ACCESS_KEY_ID"] = "testing"
        os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
        os.environ["AWS_SECURITY_TOKEN"] = "testing"
        os.environ["AWS_SESSION_TOKEN"] = "testing"

    def test_get_klinik(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.get(self.url_klinik_list)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_get_klinik_fail(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth3)
        resp = self.client.get(self.url_klinik_list)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_patch_klinik(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.patch(
            self.url_klinik_list, data={"name": "apeture", "sik": self.test_file3}
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_patch_klinik_fail(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth3)
        resp = self.client.patch(self.url_klinik_list, data={"name": "klinik3"})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_klinik(self):
        self.assertEqual(Klinik.objects.count(), 2)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.delete(self.url_klinik_list)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(Klinik.objects.count(), 1)

    def test_delete_klinik_fail(self):
        self.assertEqual(Klinik.objects.count(), 2)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth3)
        resp = self.client.delete(self.url_klinik_list)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Klinik.objects.count(), 2)

    def test_post_klinik(self):
        self.assertEqual(Klinik.objects.count(), 2)
        data = {"name": "klinik3", "sik": self.test_file3}
        self.client.credentials(HTTP_AUTHORIZATION=self.auth3)
        resp = self.client.post(self.url_klinik_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Klinik.objects.count(), 3)

    def test_post_klinik_fail(self):
        self.assertEqual(Klinik.objects.count(), 2)
        data = {"name": "klinik2"}
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.post(self.url_klinik_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Klinik.objects.count(), 2)


class CabangAPITest(KlinikTestSetUp):
    def aws_credentials(self):
        """Mocked AWS Credentials for moto."""
        os.environ["AWS_ACCESS_KEY_ID"] = "testing"
        os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
        os.environ["AWS_SECURITY_TOKEN"] = "testing"
        os.environ["AWS_SESSION_TOKEN"] = "testing"

    def test_get_cabang_list_from_klinik(self):
        self.assertEqual(Cabang.objects.count(), 21)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.get(self.url_list, data={"klinik": self.klinik.id})

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 11)
        self.assertNotEqual(len(resp.data), 21)

    def test_get_cabang_list_from_klinik_without_auth_fails(self):
        resp = self.client.get(self.url_list)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_cabang_list(self):
        self.assertEqual(Cabang.objects.count(), 21)
        data = {"location": self.alt_location, "klinik": self.klinik.id}
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cabang.objects.count(), 22)

    def test_post_cabang_fail(self):
        self.assertEqual(Cabang.objects.count(), 21)
        data = {}
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Cabang.objects.count(), 21)

    def test_get_cabang_detail(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], cabang.id)
        self.assertEqual(resp.data["klinik_id"], cabang.klinik_id)
        self.assertEqual(resp.data["location"], cabang.location)

    def test_get_cabang_detail_cabang_not_found(self):
        uri = reverse(self.url_detail, kwargs={"pk": 9999})
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_cabang_detail(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.put(uri, data={"location": self.alt_location})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], cabang.id)
        self.assertEqual(resp.data["location"], "alam baka")
        self.assertNotEqual(resp.data["location"], cabang.location)

    def test_put_cabang_detail_bad_request(self):
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.put(uri, data={"realm": self.alt_location})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_cabang_detail(self):
        self.assertEqual(Cabang.objects.count(), 21)
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(Cabang.objects.count(), 20)

    def test_delete_cabang_detail_not_found(self):
        self.assertEqual(Cabang.objects.count(), 21)
        uri = reverse(self.url_detail, kwargs={"pk": 9999})
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Cabang.objects.count(), 21)


class LamaranPasienApiTest(KlinikTestSetUp):
    def aws_credentials(self):
        """Mocked AWS Credentials for moto."""
        os.environ["AWS_ACCESS_KEY_ID"] = "testing"
        os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
        os.environ["AWS_SECURITY_TOKEN"] = "testing"
        os.environ["AWS_SESSION_TOKEN"] = "testing"

    def test_get_lamaran_pasien(self):
        self.assertEqual(LamaranPasien.objects.count(), 10)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.pasien_detail, kwargs={"pk": 1})
        resp = self.client.get(uri)

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 4)
        self.assertEqual(resp.data["id"], 1)
        self.assertEqual(resp.data["nik"], "4206913370")

    def test_get_lamaran_pasien_without_auth_fails(self):
        uri = reverse(self.pasien_detail, kwargs={"pk": 1})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_lamaran_pasien(self):
        self.assertEqual(LamaranPasien.objects.count(), 10)
        data = {"nik": "13371337", "email": "pasienl@email.com", "fields": self.json_test}
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.post(self.pasien_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(resp.data["nik"], "13371337")
        self.assertEqual(LamaranPasien.objects.count(), 11)

    def test_post_lamaran_pasien_fail(self):
        self.assertEqual(LamaranPasien.objects.count(), 10)
        data = {"nama": "astaga"}
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.post(self.pasien_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(LamaranPasien.objects.count(), 10)

    def test_patch_lamaran_pasien(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        self.assertEqual(LamaranPasien.objects.count(), 10)
        uri = reverse(self.pasien_detail, kwargs={"pk": 1})
        resp = self.client.patch(uri, data={"nik":  "13371337", "email": "emaile@email.com", "fields": self.json_test})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], 1)

    def test_patch_lamaran_pasien_fail(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth3)
        self.assertEqual(LamaranPasien.objects.count(), 10)
        uri = reverse(self.pasien_detail, kwargs={"pk": 1})
        resp = self.client.patch(uri, data={"name": "whatdapatientdoing?"})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_lamaran_pasien(self):
        self.assertEqual(LamaranPasien.objects.count(), 10)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.pasien_detail, kwargs={"pk": 1})
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(LamaranPasien.objects.count(), 9)

    def test_delete_lamaran_pasien_not_found(self):
        self.assertEqual(LamaranPasien.objects.count(), 10)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.pasien_detail, kwargs={"pk": 69})
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(LamaranPasien.objects.count(), 10)
        

class LamaranPasienCompoundApiTest(KlinikTestSetUp):
    def test_post_lamaran_pasien_compound(self):
        self.assertEqual(LamaranPasien.objects.count(), 10)
        self.assertEqual(JadwalPasien.objects.count(), 10)

        data = {"nik": "13371337", "fields": self.json_test, "email": "emails@email.com", "date": datetime.date(2000, 4, 20),
         "jadwal_tenaga_medis_pk": self.jadwal_tenaga_medis.pk}

        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.post(self.pasien_compound, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(LamaranPasien.objects.count(), 11)
        self.assertEqual(JadwalPasien.objects.count(), 11)

    def test_post_lamaran_pasien_compound_fail(self):
        self.assertEqual(LamaranPasien.objects.count(), 10)
        data = {"nama": "astaga"}
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.post(self.pasien_compound, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(LamaranPasien.objects.count(), 10)


class FormAPITest(APITestCase):
    def aws_credentials(self):
        """Mocked AWS Credentials for moto."""
        os.environ["AWS_ACCESS_KEY_ID"] = "testing"
        os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
        os.environ["AWS_SECURITY_TOKEN"] = "testing"
        os.environ["AWS_SESSION_TOKEN"] = "testing"

    def setUp(self) -> None:
        self.email = "test@example.com"
        self.account = Account.objects.create_user(
            email=self.email,
            full_name="John Doe",
            password=os.getenv("SECRET_KEY"),
        )

        self.owner = OwnerProfile(account=self.account)
        self.owner.save()

        sample_file = b"this is a file example"
        mock_file = SimpleUploadedFile("sip_example.pdf", sample_file)
        self.klinik = Klinik(name="klinik", owner=self.owner, sik=mock_file)
        self.klinik.save()
        self.cabang = Cabang(location=secrets.token_hex(), klinik=self.klinik)
        self.cabang.save()

        for i in range(3):
            self.dform = DynamicForm(  # using default fields
                cabang=self.cabang,
                formtype=f"example{i}",
            )
            self.dform.save()

        for formtype in DynamicForm.formtypes:
            DynamicForm.objects.get(formtype=formtype).delete()

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

        self.urls_dform = "klinik:dform-list"
        self.urls_dform_detail = "klinik:dform-detail"
        self.urls_dform_public = "klinik:dform-public"

        return super().setUp()

    def test_get_all_form_schema_from_cabang(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.urls_dform, kwargs={"cabang_pk": self.cabang.id})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 3)

    def test_get_all_form_schema_from_cabang_but_cabang_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.urls_dform, kwargs={"cabang_pk": 99999})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_all_form_schema_from_cabang_but_unauthorized(self):
        uri = reverse(self.urls_dform, kwargs={"cabang_pk": self.cabang.id})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_form_schema_from_cabang_by_id(self):
        schema_list = list(DynamicForm.objects.all())
        schema = secrets.choice(schema_list)
        uri = reverse(
            self.urls_dform_public,
            kwargs={"pk": schema.pk},
        )
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], schema.id)
        self.assertEqual(resp.data["cabang_id"], schema.cabang_id)
        self.assertEqual(resp.data["formtype"], schema.formtype)
        self.assertEqual(resp.data["fields"], schema.fields)

    def test_get_form_schema_from_cabang_by_id_but_id_not_found(self):
        uri = reverse(self.urls_dform_public, kwargs={"pk": 9999})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_form_schema_to_cabang(self):
        self.assertEqual(len(DynamicForm.objects.all()), 3)
        data = {
            "cabang": 1,
            "formtype": "test",
            "fields": [{"example": "example"}],
        }
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.urls_dform, kwargs={"cabang_pk": self.cabang.id})
        resp = self.client.post(uri, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(DynamicForm.objects.count(), 4)

    def test_post_form_schema_to_cabang_but_empty_payload(self):
        self.assertEqual(len(DynamicForm.objects.all()), 3)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.urls_dform, kwargs={"cabang_pk": self.cabang.id})
        resp = self.client.post(uri, data={})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(DynamicForm.objects.count(), 3)

    def test_post_form_schema_to_cabang_but_payload_malformed(self):
        self.assertEqual(len(DynamicForm.objects.all()), 3)
        data = {
            "pppp": 1,
            "asas": "test",
            "zzzz": [{"example": "example"}],
        }
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.urls_dform, kwargs={"cabang_pk": self.cabang.id})
        resp = self.client.post(uri, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(DynamicForm.objects.count(), 3)

    def test_post_form_schema_to_cabang_but_cabang_not_found(self):
        self.assertEqual(len(DynamicForm.objects.all()), 3)
        data = {
            "cabang": 99999,
            "formtype": "test",
            "fields": [{"example": "example"}],
        }
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.urls_dform, kwargs={"cabang_pk": self.cabang.id})
        resp = self.client.post(uri, data=data)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(DynamicForm.objects.count(), 3)

    def test_post_form_schema_to_cabang_but_unauthorized(self):
        self.assertEqual(len(DynamicForm.objects.all()), 3)
        data = {
            "cabang": 1,
            "formtype": "test",
            "fields": [{"example": "example"}],
        }
        uri = reverse(self.urls_dform, kwargs={"cabang_pk": self.cabang.id})
        resp = self.client.post(uri, data=data)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(DynamicForm.objects.count(), 3)

    def test_update_form_schema_to_cabang(self):
        schema_list = list(DynamicForm.objects.all())
        schema = secrets.choice(schema_list)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(
            self.urls_dform_detail,
            kwargs={"cabang_pk": self.cabang.id, "pk": schema.pk},
        )
        resp = self.client.patch(uri, data={"formtype": "edited"})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], schema.id)
        self.assertEqual(resp.data["cabang_id"], schema.cabang_id)
        self.assertEqual(resp.data["formtype"], "edited")
        self.assertEqual(resp.data["fields"], schema.fields)

    def test_update_form_schema_to_cabang_but_empty_payload(self):
        schema_list = list(DynamicForm.objects.all())
        schema = secrets.choice(schema_list)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(
            self.urls_dform_detail,
            kwargs={"cabang_pk": self.cabang.id, "pk": schema.pk},
        )
        resp = self.client.patch(uri, data={})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], schema.id)
        self.assertEqual(resp.data["cabang_id"], schema.cabang_id)
        self.assertEqual(resp.data["formtype"], schema.formtype)
        self.assertEqual(resp.data["fields"], schema.fields)

    def test_update_form_schema_to_cabang_but_payload_malformed(self):
        schema_list = list(DynamicForm.objects.all())
        schema = secrets.choice(schema_list)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(
            self.urls_dform_detail,
            kwargs={"cabang_pk": self.cabang.id, "pk": schema.pk},
        )
        resp = self.client.patch(uri, data={"zzzzz": "malformed"})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_update_form_schema_to_cabang_but_cabang_not_found(self):
        schema_list = list(DynamicForm.objects.all())
        schema = secrets.choice(schema_list)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(
            self.urls_dform_detail,
            kwargs={"cabang_pk": 99999, "pk": schema.pk},
        )
        resp = self.client.patch(uri, data={"zzzzz": "malformed"})
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_form_schema_to_cabang_but_unauthorized(self):
        schema_list = list(DynamicForm.objects.all())
        schema = secrets.choice(schema_list)
        uri = reverse(
            self.urls_dform_detail,
            kwargs={"cabang_pk": self.cabang.id, "pk": schema.pk},
        )
        resp = self.client.patch(uri, data={})
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_form_schema_by_id(self):
        self.assertEqual(len(DynamicForm.objects.all()), 3)
        schema_list = list(DynamicForm.objects.all())
        schema = secrets.choice(schema_list)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(
            self.urls_dform_detail,
            kwargs={"cabang_pk": self.cabang.id, "pk": schema.pk},
        )
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(DynamicForm.objects.count(), 2)

    def test_delete_form_schema_by_id_but_id_not_found(self):
        self.assertEqual(len(DynamicForm.objects.all()), 3)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(
            self.urls_dform_detail, kwargs={"cabang_pk": self.cabang.id, "pk": 99999}
        )
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(DynamicForm.objects.count(), 3)

    def test_delete_form_schema_by_id_but_unauthorized(self):
        self.assertEqual(len(DynamicForm.objects.all()), 3)
        schema_list = list(DynamicForm.objects.all())
        schema = secrets.choice(schema_list)
        uri = reverse(
            self.urls_dform_detail,
            kwargs={"cabang_pk": self.cabang.id, "pk": schema.pk},
        )
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(DynamicForm.objects.count(), 3)


class SignalsTest(TestCase):
    def setUp(self):
        self.account = Account.objects.create_user(
            email="email@email.com", full_name="full_name"
        )
        self.account.save()
        self.owner = OwnerProfile(account=self.account)
        self.owner.save()
        self.klinik = Klinik(
            owner=self.owner,
            name="klinik",
            sik=SimpleUploadedFile("test.txt", b"content"),
        )
        self.klinik.save()

    def test_dynamicform_does_not_exist(self):
        self.assertEquals(
            DynamicForm.objects.filter(cabang__klinik=self.klinik).count(), 0
        )

    def test_if_all_dynamicforms_are_initiated(self):
        cabang = Cabang(klinik=self.klinik, location="location")
        cabang.save()
        self.assertEquals(
            DynamicForm.objects.filter(cabang__klinik=self.klinik).count(),
            len(DynamicForm.formtypes),
        )


class ConfirmationEmailTest(TestCase):
    def setUp(self):
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

        # jadwal tenaga medis
        self.jadwal_tenaga_medis = JadwalTenagaMedis.objects.create(
            tenaga_medis=self.tenaga_medis_profile,
            start_time=datetime.time(8, 0, 0),
            end_time=datetime.time(10, 0, 0),
            quota=5,
            day="mon",
        )

        # lamaran pasien
        self.lamaran_pasien = LamaranPasien.objects.create(
            nik="123123123",
            email="user@email.com",
            fields=[
                {
                    "nama": "Abdullah"
                }
            ]
        )

        # date
        self.date = "2022-4-25"
    
    def test_send_confirmation_email(self):
        send_confirmation_email(
            lamaran_pasien=self.lamaran_pasien, 
            jadwal_tenaga_medis=self.jadwal_tenaga_medis, 
            date=self.date
        )
