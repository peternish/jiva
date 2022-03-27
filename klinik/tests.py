from klinik.models import Cabang, Klinik, OwnerProfile, DynamicForm
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from account.models import Account
from django.core.files.uploadedfile import SimpleUploadedFile
import secrets
import os


class KlinikTestSetUp(APITestCase):
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
        test_file2 = SimpleUploadedFile(
            "not_the_best_file_eva.txt", self.file_content)
        self.klinik2 = Klinik(
            name="klinik2", owner=self.owner2, sik=test_file2)
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
        self.auth = "Bearer " + self.token

        resp = self.client.post(
            url,
            {"email": self.email3, "password": os.getenv("SECRET_KEY")},
            format="json",
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in resp.data)
        self.assertTrue("refresh" in resp.data)
        self.token3 = resp.data["access"]
        self.auth3 = "Bearer " + self.token3

        self.alt_location = "alam baka"


class KlinikAPITest(KlinikTestSetUp):
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
            self.url_klinik_list, data={
                "name": "apeture", "sik": self.test_file3}
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_patch_klinik_fail(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth3)
        resp = self.client.patch(self.url_klinik_list,
                                 data={"name": "klinik3"})
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
    def test_get_cabang_list_from_klinik(self):
        self.assertEqual(Cabang.objects.count(), 20)
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.get(self.url_list, data={"klinik": self.klinik.id})

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 10)
        self.assertNotEqual(len(resp.data), 20)

    def test_get_cabang_list_from_klinik_without_auth_fails(self):
        resp = self.client.get(self.url_list)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_cabang_list(self):
        self.assertEqual(Cabang.objects.count(), 20)
        data = {"location": self.alt_location, "klinik": self.klinik.id}
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cabang.objects.count(), 21)

    def test_post_cabang_fail(self):
        self.assertEqual(Cabang.objects.count(), 20)
        data = {}
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.post(self.url_list, data=data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Cabang.objects.count(), 20)

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
        self.assertEqual(Cabang.objects.count(), 20)
        cabang_list = list(Cabang.objects.all())
        cabang = secrets.choice(cabang_list)
        uri = reverse(self.url_detail, kwargs={"pk": cabang.id})
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(Cabang.objects.count(), 19)

    def test_delete_cabang_detail_not_found(self):
        self.assertEqual(Cabang.objects.count(), 20)
        uri = reverse(self.url_detail, kwargs={"pk": 9999})
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        resp = self.client.delete(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Cabang.objects.count(), 20)


class FormAPITest(APITestCase):
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
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.urls_dform_detail, kwargs={
                      "cabang_pk": self.cabang.id, "pk": schema.pk})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], schema.id)
        self.assertEqual(resp.data["cabang_id"], schema.cabang_id)
        self.assertEqual(resp.data["formtype"], schema.formtype)
        self.assertEqual(resp.data["fields"], schema.fields)

    def test_get_form_schema_from_cabang_by_id_but_id_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.auth)
        uri = reverse(self.urls_dform_detail, kwargs={
                      "cabang_pk": self.cabang.id, "pk": 9999})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_form_schema_from_cabang_by_id_but_unauthorized(self):
        schema_list = list(DynamicForm.objects.all())
        schema = secrets.choice(schema_list)
        uri = reverse(self.urls_dform_detail, kwargs={
                      "cabang_pk": self.cabang.id, "pk": schema.pk})
        resp = self.client.get(uri)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_form_schema_to_cabang(self):
        pass

    def test_post_form_schema_to_cabang_but_not_json_serializeable(self):
        pass

    def test_post_form_schema_to_cabang_but_empty_payload(self):
        pass

    def test_post_form_schema_to_cabang_but_payload_malformed(self):
        pass

    def test_post_form_schema_to_cabang_but_cabang_not_found(self):
        pass

    def test_post_form_schema_to_cabang_but_unauthorized(self):
        pass

    def test_update_form_schema_to_cabang(self):
        pass

    def test_update_form_schema_to_cabang_but_not_json_serializeable(self):
        pass

    def test_update_form_schema_to_cabang_but_empty_payload(self):
        pass

    def test_update_form_schema_to_cabang_but_payload_malformed(self):
        pass

    def test_update_form_schema_to_cabang_but_cabang_not_found(self):
        pass

    def test_update_form_schema_to_cabang_but_unauthorized(self):
        pass

    def test_update_form_schema_to_cabang_but_unauthorized(self):
        pass

    def test_delete_form_schema_by_id(self):
        pass

    def test_delete_form_schema_by_id_but_id_not_found(self):
        pass

    def test_delete_form_schema_by_id_but_unauthorized(self):
        pass
