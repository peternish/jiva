# Django imports
from django.test import TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile

# Rest imports
from rest_framework.response import Response
from rest_framework.test import APIRequestFactory
from rest_framework import status
from rest_framework.test import APITestCase

# other imports
from . import views
from .models import Account
from klinik.models import Cabang, Klinik, OwnerProfile, StafProfile, TenagaMedisProfile
import os


TEST_USER_EMAIL = "test@email.com"
TEST_USER_PASSWORD = os.getenv("SECRET_KEY")
TEST_USER_FULL_NAME = "Budi Budiman"


class ViewTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_register_success(self):
        payload = {
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD,
            "full_name": TEST_USER_FULL_NAME,
        }
        request = self.factory.post("/account/register", data=payload, format="json")
        response = views.register(request)
        test_response = Response(payload)
        self.assertEqual(response.data["email"], test_response.data["email"])
        self.assertEqual(response.data["full_name"], test_response.data["full_name"])
        self.assertEquals(
            OwnerProfile.objects.filter(account__email=TEST_USER_EMAIL).count(), 1
        )
        self.assertEqual(response.status_code, 201)

    def test_register_missing_field(self):
        payload = {"email": TEST_USER_EMAIL, "password": TEST_USER_PASSWORD}
        request = self.factory.post("/account/register", data=payload)
        response = views.register(request)
        self.assertEqual(response.status_code, 400)


class ModelTest(TestCase):
    def test_create_account(self):
        account = Account.objects.create_user(
            email=TEST_USER_EMAIL,
            full_name=TEST_USER_FULL_NAME,
            password=TEST_USER_PASSWORD,
        )
        account.save()
        self.assertEquals(Account.objects.filter(email=TEST_USER_EMAIL).count(), 1)
        self.assertEquals(str(account), TEST_USER_EMAIL)

    def test_create_superuser(self):
        account = Account.objects.create_superuser(
            email=TEST_USER_EMAIL,
            full_name=TEST_USER_FULL_NAME,
            password=TEST_USER_PASSWORD,
        )
        account.save()
        self.assertTrue(account.is_superuser, True)
        self.assertTrue(account.is_staff, True)
        self.assertTrue(account.is_admin, True)
        self.assertTrue(account.has_perm("account.can_add"))
        self.assertTrue(account.has_module_perms("account"))


class IntegrationTest(APITestCase):
    def setUp(self) -> None:
        self.url_login = "account:login"

    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse("account:register")
        data = {
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD,
            "full_name": TEST_USER_FULL_NAME,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Account.objects.count(), 1)
        self.assertEqual(Account.objects.get().email, TEST_USER_EMAIL)

    def test_login_200(self):
        """
        Ensure user is logged in.
        """
        Account.objects.create_user(
            email=TEST_USER_EMAIL,
            password=TEST_USER_PASSWORD,
            full_name=TEST_USER_FULL_NAME,
        )

        url = reverse(self.url_login)
        data = {"email": TEST_USER_EMAIL, "password": TEST_USER_PASSWORD}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_refresh_200(self):
        """
        Ensure refresh token works
        """
        Account.objects.create_user(
            email=TEST_USER_EMAIL,
            password=TEST_USER_PASSWORD,
            full_name=TEST_USER_FULL_NAME,
        )

        login_response = self.client.post(
            reverse(self.url_login),
            data={"email": TEST_USER_EMAIL, "password": TEST_USER_PASSWORD},
            format="json",
        )

        refresh_response = self.client.post(
            reverse("account:refresh"),
            data={"refresh": login_response.data["refresh"]},
            format="json",
        )

        self.assertEquals(refresh_response.status_code, 200)
        self.assertTrue("access" in refresh_response.data)

    def test_profile_200(self):
        """
        Ensure get profile
        """
        self.client.post(
            reverse("account:register"),
            {
                "email": TEST_USER_EMAIL,
                "password": TEST_USER_PASSWORD,
                "full_name": TEST_USER_FULL_NAME,
            },
            format="json",
        )

        url = reverse(self.url_login)
        resp1 = self.client.post(
            url,
            {"email": TEST_USER_EMAIL, "password": TEST_USER_PASSWORD},
            format="json",
        )

        self.owner_token = resp1.data["access"]
        self.owner_auth = "Bearer " + self.owner_token

        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        resp2 = self.client.get(reverse("account:profile"))
        self.assertEquals(TEST_USER_EMAIL, resp2.data["email"])


class StafTestSetup(APITestCase):
    def setUp(self) -> None:
        # test owener account
        self.owner_email = TEST_USER_EMAIL
        self.password = TEST_USER_PASSWORD
        self.owner_full_name = TEST_USER_FULL_NAME
        self.owner_account = Account.objects.create_user(
            email=self.owner_email,
            full_name=self.owner_full_name,
            password=self.password,
        )
        self.owner_profile = OwnerProfile.objects.create(account=self.owner_account)

        # klinik
        test_file = SimpleUploadedFile("testfile.txt", b"test file")
        self.klinik = Klinik.objects.create(
            name="kliniktest", owner=self.owner_profile, sik=test_file
        )

        # cabang
        self.cabang_location = "testcabang"
        self.cabang = Cabang.objects.create(
            klinik=self.klinik, location=self.cabang_location
        )
        self.cabang_id = self.cabang.id

        # urls
        self.url_login = "account:login"
        self.url_detail = "account:staf-detail"
        self.url_staf_list = "account:staf-list"

        # test staf account
        for i in range(1, 4):
            staf_account = Account.objects.create_user(
                email=f"teststaf{i}@mail.com",
                full_name=f"Test Staf {i}",
                password=self.password,
            )
            StafProfile.objects.create(account=staf_account, cabang=self.cabang)
        self.full_name_update = "Test Staf Updated"

        url = reverse(self.url_login)
        resp1 = self.client.post(
            url, {"email": self.owner_email, "password": self.password}, format="json"
        )

        self.assertEqual(resp1.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in resp1.data)
        self.assertTrue("refresh" in resp1.data)

        self.owner_token = resp1.data["access"]
        self.owner_auth = "Bearer " + self.owner_token


class StafAPITest(StafTestSetup):
    def test_post_staf(self):
        account_count_before = Account.objects.count()
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        data = {
            "email": "emailunik1@gmail.com",
            "password": TEST_USER_PASSWORD,
            "full_name": TEST_USER_FULL_NAME,
        }
        url = reverse(self.url_staf_list, kwargs={"cabang_id": self.cabang_id})
        resp = self.client.post(url, data=data)
        account_count_after = Account.objects.count()
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(account_count_after, account_count_before + 1)

    def test_post_staf_fail_cabang_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        data = {
            "email": "emailunik@gmail.com",
            "password": TEST_USER_PASSWORD,
            "full_name": TEST_USER_FULL_NAME,
        }
        url = reverse(self.url_staf_list, kwargs={"cabang_id": 9999})
        resp = self.client.post(url, data=data)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_staf_fail_no_auth(self):
        data = {
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD,
            "full_name": TEST_USER_FULL_NAME,
        }
        url = reverse(self.url_staf_list, kwargs={"cabang_id": self.cabang_id})
        resp = self.client.post(url, data=data)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_staf_list(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_staf_list, kwargs={"cabang_id": self.cabang_id})
        resp = self.client.get(url)
        self.assertTrue(len(resp.data) > 0)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_get_staf_detail(self):
        account_id = StafProfile.objects.last().account.id
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": account_id})
        resp = self.client.get(url)

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn("id", resp.data["account"])
        self.assertIn("email", resp.data["account"])
        self.assertIn("full_name", resp.data["account"])

    def test_get_staf_detail_fail_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": 9999})
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_patch_staf(self):
        account_id = StafProfile.objects.last().account.id
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": account_id})
        email_update = "teststafupdated@test.com"
        data = {"email": email_update, "full_name": self.full_name_update}
        resp = self.client.patch(url, data)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["email"], email_update)
        self.assertEqual(resp.data["full_name"], self.full_name_update)

    def test_patch_staf_fail_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": 9999})
        email_update = "teststafupdated@test.com"
        data = {"email": email_update, "full_name": self.full_name_update}
        resp = self.client.patch(url, data)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_staf(self):
        count_before = StafProfile.objects.count()
        account_id = StafProfile.objects.first().account.id
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": account_id})
        resp = self.client.delete(url)
        count_after = StafProfile.objects.count()
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(count_after, count_before - 1)

    def test_delete_staf_fail_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": 9999})
        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)


class TenagaMedisTestSetup(APITestCase):
    def setUp(self) -> None:
        # test owener account
        self.owner_email = TEST_USER_EMAIL
        self.password = TEST_USER_PASSWORD
        self.owner_full_name = TEST_USER_FULL_NAME
        self.owner_account = Account.objects.create_user(
            email=self.owner_email,
            full_name=self.owner_full_name,
            password=self.password,
        )
        self.owner_profile = OwnerProfile.objects.create(account=self.owner_account)

        # klinik
        test_file = SimpleUploadedFile("best_file_eva.txt", b"test file")
        self.klinik = Klinik.objects.create(
            name="kliniktest", owner=self.owner_profile, sik=test_file
        )

        # cabang
        self.cabang_location = "testcabang"
        self.cabang = Cabang.objects.create(
            klinik=self.klinik, location=self.cabang_location
        )
        self.cabang_id = self.cabang.id

        # urls
        self.url_login = "account:login"
        self.url_detail = "account:tenaga-medis-detail"
        self.url_list = "account:tenaga-medis-list"

        self.file_content = b"sip file contents"
        self.sip = "test"
        # test tenaga medis account
        for i in range(1, 4):
            staf_account = Account.objects.create_user(
                email=f"testtenagamedis{i}@mail.com",
                full_name=f"Test TenagaMedis {i}",
                password=self.password,
            )
            TenagaMedisProfile.objects.create(
                account=staf_account, cabang=self.cabang, sip=self.sip
            )
        self.full_name_update = "Test Staf Updated"

        url = reverse(self.url_login)
        resp1 = self.client.post(
            url, {"email": self.owner_email, "password": self.password}, format="json"
        )

        self.assertEqual(resp1.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in resp1.data)
        self.assertTrue("refresh" in resp1.data)

        self.owner_token = resp1.data["access"]
        self.owner_auth = "Bearer " + self.owner_token


class TenagaMedisAPITest(TenagaMedisTestSetup):
    def test_post_tenaga_medis_fail_no_auth(self):
        data = {
            "account.email": "testtenagamedis@testmail.com",
            "account.password": "password",
            "account.full_name": "Tenaga Medis Test",
            "sip": self.sip,
        }
        url = reverse(self.url_list, kwargs={"cabang_id": self.cabang_id})
        resp = self.client.post(url, data=data)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_tenaga_medis_list(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_list, kwargs={"cabang_id": self.cabang_id})
        resp = self.client.get(url)
        self.assertTrue(len(resp.data) > 0)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_get_tenaga_medis_detail(self):
        account_id = TenagaMedisProfile.objects.first().account.id
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": account_id})
        resp = self.client.get(url)

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn("id", resp.data["account"])
        self.assertIn("email", resp.data["account"])
        self.assertIn("full_name", resp.data["account"])

    def test_get_tenaga_medis_detail_fail_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": 9999})
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_patch_tenaga_medis(self, format="json"):
        account_id = TenagaMedisProfile.objects.first().account.id
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": account_id})
        email_update = "testtenaga_medisupdated@test.com"
        data = {"account.email": email_update, "account.full_name": self.full_name_update}
        resp = self.client.patch(url, data)
        account_data = resp.data["account"]
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(account_data["email"], email_update)
        self.assertEqual(account_data["full_name"], self.full_name_update)

    def test_patch_tenaga_medis_fail_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": 9999})
        email_update = "testtenaga_medisupdated@test.com"
        data = {"account.email": email_update, "account.full_name": self.full_name_update}
        resp = self.client.patch(url, data)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_tenaga_medis(self):
        count_before = TenagaMedisProfile.objects.count()
        account_id = TenagaMedisProfile.objects.first().account.id
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": account_id})
        resp = self.client.delete(url)
        count_after = TenagaMedisProfile.objects.count()
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(count_after, count_before - 1)

    def test_delete_tenaga_medis_fail_not_found(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.owner_auth)
        url = reverse(self.url_detail, kwargs={"pk": 9999})
        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
