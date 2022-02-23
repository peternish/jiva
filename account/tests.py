# Django imports
from django.test import TestCase
from django.test.client import RequestFactory

# Rest imports
from rest_framework.response import Response

# other imports
from . import views
from . import models

class ViewTest(TestCase):
  def setUp(self):
    self.factory = RequestFactory()

  def test_register_success(self):
    payload = {
      "email": "email@email.com", 
      "password": "password",
      "full_name": "This is a full name"
    }
    request = self.factory.post("/account/register", data=payload)
    response = views.register(request)
    self.assertEqual(response.data["email"], Response(payload).data["email"])
    self.assertEqual(response.data["full_name"], Response(payload).data["full_name"])
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
    account = models.Account.objects.create_user(
      email="email@email.com",
      full_name="budi budiman",
      password="password"
    )
    account.save()
    self.assertEquals(Account.objects.filter(email="email@email.com".count()), 1)
    self.assertEquals(str(account), "email@email.com")
