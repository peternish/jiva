# Django imports
from django.test import TestCase
from django.urls import reverse

# Rest imports
from rest_framework.response import Response
from rest_framework.test import APIRequestFactory
from rest_framework import status

# other imports
from . import views
from .models import Account
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


class IntegrationTest(TestCase):
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

        url = reverse("account:login")
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
            reverse("account:login"),
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
