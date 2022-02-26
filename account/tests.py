# Django imports
from django.test import TestCase
from django.urls import reverse

# Rest imports
from rest_framework.response import Response
from rest_framework.test import APIRequestFactory
from rest_framework import status
from rest_framework.test import APITestCase

# other imports
from . import views
from .models import Account


class ViewTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = {}
        self.user["email"] = "test@email.com"
        self.user["password"] = "fe767870-bba8-4d6d-8b5a-61ed9036ee48"
        self.user["full_name"] = "Budi Budiman"

    def test_register_success(self):
        payload = {
            "email": self.user["email"],
            "password": self.user["password"],
            "full_name": self.user["full_name"],
        }
        request = self.factory.post("/account/register", data=payload, format="json")
        response = views.register(request)
        test_response = Response(payload)
        self.assertEqual(response.data["email"], test_response.data["email"])
        self.assertEqual(response.data["full_name"], test_response.data["full_name"])
        self.assertEqual(response.status_code, 201)

    def test_register_missing_field(self):
        payload = {"email": self.user["email"], "password": self.user["password"]}
        request = self.factory.post("/account/register", data=payload)
        response = views.register(request)
        self.assertEqual(response.status_code, 400)


class ModelTest(TestCase):
    def setUp(self):
        self.user = {}
        self.user["email"] = "test@email.com"
        self.user["password"] = "fe767870-bba8-4d6d-8b5a-61ed9036ee48"
        self.user["full_name"] = "Budi Budiman"

    def test_create_account(self):
        account = Account.objects.create_user(
            email=self.user["email"], full_name=self.user["full_name"], password=self.user["password"]
        )
        account.save()
        self.assertEquals(Account.objects.filter(email=self.user["email"]).count(), 1)
        self.assertEquals(str(account), self.user["email"])

    def test_create_superuser(self):
        account = Account.objects.create_superuser(
            email=self.user["email"], full_name=self.user["full_name"], password=self.user["password"]
        )
        account.save()
        self.assertTrue(account.is_superuser, True)
        self.assertTrue(account.is_staff, True)
        self.assertTrue(account.is_admin, True)


class IntegrationTest(TestCase):
    def setUp(self):
        self.user = {}
        self.user["email"] = "test@email.com"
        self.user["password"] = "fe767870-bba8-4d6d-8b5a-61ed9036ee48"
        self.user["full_name"] = "Budi Budiman"

    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse("account:register")
        data = {
            "email": self.user["email"],
            "password": self.user["password"],
            "full_name": self.user["full_name"],
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Account.objects.count(), 1)
        self.assertEqual(Account.objects.get().email, self.user["email"])

    def test_login_200(self):
        """
        Ensure user is logged in.
        """
        Account.objects.create_user(
            email=self.user["email"], password=self.user["password"], full_name=self.user["full_name"]
        )

        url = reverse("account:login")
        data = {"email": self.user["email"], "password": self.user["password"]}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_refresh_200(self):
        """
        Ensure refresh token works
        """
        Account.objects.create_user(
            email=self.user["email"], password=self.user["password"], full_name=self.user["full_name"]
        )

        login_response = self.client.post(
            reverse("account:login"),
            data={"email": self.user["email"], "password": self.user["password"]},
            format="json",
        )

        refresh_response = self.client.post(
            reverse("account:refresh"),
            data={"refresh": login_response.data["refresh"]},
            format="json",
        )

        self.assertEquals(refresh_response.status_code, 200)
        self.assertTrue("access" in refresh_response.data)
