# Django imports
from django.test import TestCase
from django.http import HttpRequest

# Rest imports
from rest_framework.response import Response

# other imports
from . import views

class UnitTest(TestCase):
  def test_register_success(self):
    request = HttpRequest()
    payload = {
      "email": "email@email.com", 
      "password": "password",
      "full_name": "This is a full name"
    }
    request.POST = payload
    request.method = "POST"
    response = views.register(request)
    self.assertEqual(response.data["email"], Response(payload).data["email"])
    self.assertEqual(response.data["full_name"], Response(payload).data["full_name"])
    self.assertEqual(response.status_code, 200)
  
  def test_register_missing_field(self):
    request = HttpRequest()
    payload = {
      "email": "email@email.com", 
      "password": "password"
    }
    request.POST = payload
    request.method = "POST"
    response = views.register(request)
    self.assertEqual(response.status_code, 400)
