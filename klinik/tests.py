import email
from urllib import request, response
from django.test import TestCase, Client
from model_bakery import baker
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse

from .models import Account, Cabang, Klinik, Profile, OwnerProfile

from .views import *

from rest_framework.response import Response
from rest_framework.test import APITestCase
from rest_framework import status

from psycopg2 import IntegrityError


class ProfileModelTest(TestCase):
    def setUp(self) -> None:
        self.profile = baker.make("klinik.Profile")
        return super().setUp()

    def test_profile_model_instace_of_Profile_class(self):
        self.assertIsInstance(self.profile, Profile)

    def test_profile_model_has_role(self):
        self.assertEqual(self.profile.role, "tenaga_medis")

    def test_profile_model_has_Account(self):
        self.assertIsNotNone(self.profile.account.pk)


class OwnerProfileModelTest(TestCase):
    def test_ownerprofile_is_subclass_of_profile(self):
        self.assertTrue(issubclass(OwnerProfile, Profile))

    def test_ownerprofile_has_role_owner(self):
        self.owner_profile = baker.make("klinik.OwnerProfile")
        self.assertEqual(self.owner_profile.role, "owner")


class KlinikModelTest(TestCase):
    def setUp(self) -> None:
        test_file = SimpleUploadedFile("best_file_eva.txt", b"these are the file contents!")
        self.klinik = baker.make("klinik.Klinik", name="Lalita", sik=test_file, _create_files=True)
        return super().setUp()

    def test_created_klinik_instace_of_Klinik_class(self):
        self.assertIsInstance(self.klinik, Klinik)

    def test_created_klinik_has_owner(self):
        self.assertIsNotNone(self.klinik.owner.pk)

    def test_created_klinik_has_name(self):
        self.assertEqual(self.klinik.name, "Lalita")


class CabangModelTest(TestCase):
    def setUp(self) -> None:
        self.cabang = baker.make("klinik.Cabang", location="alam sutra")
        return super().setUp()

    def test_created_cabang_instace_of_Cabang_class(self):
        self.assertIsInstance(self.cabang, Cabang)

    def test_created_cabang_belongs_to_klinik(self):
        self.assertIsNotNone(self.cabang.klinik.pk)

    def test_created_cabang_has_location(self):
        self.assertEqual(self.cabang.location, "alam sutra")

class KlinikEndPointTest(APITestCase):
    def setUp(self) -> None:
        self.credentials = {
            "email": "okok@gmail.com",
            "password": "123456qwerty",
        }
        akun = Account.objects.create(**self.credentials)
        self.ownerCredentials = {
            "role": "owner",
            "account": akun,
        }
        owner_profile = OwnerProfile.objects.create(**self.ownerCredentials)
        print(owner_profile)
        # self.api = APIRequestFactory()
        # self.TEST_KLINIK_PK = 420
        # self.TEST_OWNER_PK = 70

        # test_file = SimpleUploadedFile("test_end_point.txt", b"these are the file contents!")
        # self.TEST_FILE_SIK = test_file

        return super().setUp()
        
    def test_put_klinik(self):
        url = reverse('klinik:klinik_detail:1')
        data = {"id": 2, "owner_id": 1, "name": "Lalita"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(Klinik.objects.count(), 2)

    def test_get_klinik(self):
        test_file = SimpleUploadedFile("best_file_eva.txt", b"these are the file contents!")
        #print(OwnerProfile.objects.get(pk=1))
        self.credentials = {
            'name': "Lalita",
            'owner_id': 1,
            'sik': test_file
        }
        klinik = Klinik.objects.create(**self.credentials)
        url = reverse('klinik:1')
        response = self.client.get(url, format="json")
        print(Response)
        #self.assertEqual(re)


    

    # def test_klinik_to_owner_relationship(self):
    #     #payload = {"owner": self.TEST_OWNER_PK}
    #     #request = self.api.get("/klinik/all", data=payload, format="json")
    #     #response = views.KlinikAPI.get_object()
    #     #rest_response = Response(request)
    #     #self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     #klinik = response.data["klinik"]
    #     #self.assertEqual(klinik, rest_response.data["klinik"])
    #     #self.assertIsInstance(klinik, list)
    #     pass

    # def test_fetch_klinik_from_id(self):
    #     payload = {"owner": self.TEST_OWNER_PK, "klinik": self.TEST_KLINIK_PK}
    #     request = self.api.get("/klinik/fetch", data=payload, format="json")
    #     response = views.KlinikAPI.get_object(request)
    #     rest_response = Response(request)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     klinik = response.data["klinik"]
    #     self.assertEqual(klinik, rest_response.data["klinik"])
    #     self.assertIsInstance(klinik, Klinik)

    # def test_put_klinik_from_owner(self):
    #     payload = {"owner": self.TEST_OWNER_PK, "klinik": self.TEST_KLINIK_PK}
    #     with patch.object(Klinik, "create_klinik", autospec=True) as mock_do:
    #         request = self.api.post("/klinik/register", data=payload, format="json")
    #         response = views.KlinikAPI.put(request)
    #         self
