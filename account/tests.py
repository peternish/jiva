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
    self.user = Account.objects.create(
      email="test@email.com", 
      password="password", 
      full_name="Budi Budiman"
    )

  def test_register_success(self):
    payload = {
      "email": "email@email.com", 
      "password": "password",
      "full_name": "This is a full name"
    }
    request = self.factory.post("/account/register", data=payload, format="json")
    response = views.register(request)
    test_response = Response(payload)
    self.assertEqual(response.data["email"], test_response.data["email"])
    self.assertEqual(response.data["full_name"], test_response.data["full_name"])
    self.assertEqual(response.status_code, 201)
  
  def test_register_missing_field(self):
    payload = {
      "email": "email@email.com", 
      "password": "password"
    }
    request = self.factory.post("/account/register", data=payload)
    response = views.register(request)
    self.assertEqual(response.status_code, 400)
  
class ModelTest(TestCase):
  def test_create_account(self):
    account = Account.objects.create_user(
      email="email@email.com",
      full_name="budi budiman",
      password="password"
    )
    account.save()
    self.assertEquals(Account.objects.filter(email="email@email.com").count(), 1)
    self.assertEquals(str(account), "email@email.com")
  
  def test_create_superuser(self):
    account = Account.objects.create_superuser(
      email="email@email.com",
      full_name="budi budiman",
      password="password"
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
    data = {"email": "test@email.com", "password": "123", "full_name": "Budi Budiman"}
    response = self.client.post(url, data, format="json")
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Account.objects.count(), 1)
    self.assertEqual(Account.objects.get().email, "test@email.com")
  
  def test_login_200(self):
    """
    Ensure user is logged in.
    """
    Account.objects.create(
      email="test@email.com", 
      password="password", 
      full_name="Budi Budiman"
    )

    url = reverse("account:login")
    data = {"username": "test@email.com", "password": "password"}
    response = self.client.post(url, data, format="json")
    self.assertEqual(response.status_code, status.HTTP_200_OK)
